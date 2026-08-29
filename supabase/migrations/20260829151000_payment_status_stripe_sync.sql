-- Step 2: migrate legacy paid → stripe_confirmed; update inventory + webhook helpers.

UPDATE orders
SET payment_status = 'stripe_confirmed'
WHERE payment_status = 'paid';

CREATE OR REPLACE FUNCTION trg_orders_payment_paid_inventory()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.payment_status IN ('paid', 'stripe_confirmed', 'received')
     AND (OLD.payment_status IS DISTINCT FROM NEW.payment_status)
     AND (
       OLD.payment_status IS NULL
       OR OLD.payment_status NOT IN ('paid', 'stripe_confirmed', 'received')
     )
     AND NEW.inventory_decremented_at IS NULL
  THEN
    PERFORM decrement_inventory_for_order(NEW.id);
    UPDATE orders SET inventory_decremented_at = NOW() WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION complete_order_from_stripe(
  p_stripe_checkout_session_id TEXT,
  p_stripe_payment_intent_id TEXT DEFAULT NULL,
  p_stripe_event_id TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  v_order_id UUID;
BEGIN
  IF p_stripe_event_id IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM stripe_webhook_events WHERE stripe_event_id = p_stripe_event_id) THEN
      SELECT order_id INTO v_order_id FROM stripe_webhook_events WHERE stripe_event_id = p_stripe_event_id;
      RETURN v_order_id;
    END IF;
  END IF;

  SELECT id INTO v_order_id
  FROM orders
  WHERE stripe_checkout_session_id = p_stripe_checkout_session_id;

  IF v_order_id IS NULL THEN
    RAISE EXCEPTION 'Order not found for session %', p_stripe_checkout_session_id;
  END IF;

  UPDATE orders
  SET
    payment_status = 'stripe_confirmed',
    order_status = CASE WHEN order_status = 'pending' THEN 'confirmed' ELSE order_status END,
    stripe_payment_intent_id = COALESCE(p_stripe_payment_intent_id, stripe_payment_intent_id),
    updated_at = NOW()
  WHERE id = v_order_id
    AND payment_status IN ('pending', 'failed', 'paid');

  IF p_stripe_event_id IS NOT NULL THEN
    INSERT INTO stripe_webhook_events (stripe_event_id, event_type, order_id)
    VALUES (p_stripe_event_id, 'checkout.session.completed', v_order_id)
    ON CONFLICT (stripe_event_id) DO NOTHING;
  END IF;

  RETURN v_order_id;
END;
$$;

COMMENT ON TYPE payment_status IS
  'pending | stripe_confirmed (Stripe) | received (manual bank) | failed | cancelled | refunded | paid (legacy)';
