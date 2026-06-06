-- BrushPast FINAL: schema + RLS (run once)
-- Supabase Dashboard -> SQL Editor -> New query -> paste -> Run
-- Local terminal only if using Supabase CLI: supabase link && supabase db push
-- WARNING: drops legacy template tables if present

-- =============================================================================
-- Cleanup legacy template
-- =============================================================================
DROP TABLE IF EXISTS stripe_webhook_events CASCADE;
DROP TABLE IF EXISTS order_status_history CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS product_categories CASCADE;
DROP TABLE IF EXISTS product_organisations CASCADE;
DROP TABLE IF EXISTS product_stories CASCADE;
DROP TABLE IF EXISTS product_creators CASCADE;
DROP TABLE IF EXISTS product_variants CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS stories CASCADE;
DROP TABLE IF EXISTS organisations CASCADE;
DROP TABLE IF EXISTS creators CASCADE;
DROP TABLE IF EXISTS customer_messages CASCADE;
DROP TABLE IF EXISTS collections CASCADE;

DROP TYPE IF EXISTS content_status CASCADE;
DROP TYPE IF EXISTS inventory_type CASCADE;
DROP TYPE IF EXISTS payment_method CASCADE;
DROP TYPE IF EXISTS payment_status CASCADE;
DROP TYPE IF EXISTS order_status CASCADE;

DROP FUNCTION IF EXISTS trg_orders_generate_order_number CASCADE;
DROP FUNCTION IF EXISTS trg_orders_payment_paid_inventory CASCADE;
DROP FUNCTION IF EXISTS trg_orders_status_history CASCADE;
DROP FUNCTION IF EXISTS trg_set_updated_at CASCADE;
DROP FUNCTION IF EXISTS generate_order_number CASCADE;
DROP FUNCTION IF EXISTS decrement_inventory_for_order CASCADE;

DROP SEQUENCE IF EXISTS order_number_seq;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- Enums
-- =============================================================================
CREATE TYPE content_status AS ENUM ('draft', 'active', 'hidden', 'archived');
CREATE TYPE inventory_type AS ENUM ('single', 'limited', 'unlimited');
CREATE TYPE payment_method AS ENUM ('card', 'cash_on_delivery');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE order_status AS ENUM (
  'pending',
  'confirmed',
  'packed',
  'shipped',
  'delivered',
  'cancelled',
  'refunded'
);

-- =============================================================================
-- Shared: updated_at
-- =============================================================================
CREATE OR REPLACE FUNCTION trg_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- =============================================================================
-- Creators
-- =============================================================================
CREATE TABLE creators (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  image_url TEXT,
  short_description TEXT,
  profile_url TEXT,
  is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
  status content_status NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_creators_status ON creators (status);
CREATE INDEX idx_creators_sort_order ON creators (sort_order DESC);

-- =============================================================================
-- Organisations
-- =============================================================================
CREATE TABLE organisations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  image_url TEXT,
  short_description TEXT,
  slug TEXT UNIQUE,
  external_url TEXT,
  status content_status NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_organisations_slug ON organisations (slug) WHERE slug IS NOT NULL;
CREATE INDEX idx_organisations_status ON organisations (status);
CREATE INDEX idx_organisations_sort_order ON organisations (sort_order DESC);

-- =============================================================================
-- Stories
-- =============================================================================
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  slug TEXT UNIQUE,
  image_url TEXT,
  short_description TEXT,
  page_url TEXT,
  tags TEXT[] DEFAULT '{}',
  creator_id UUID REFERENCES creators (id) ON DELETE SET NULL,
  organisation_id UUID REFERENCES organisations (id) ON DELETE SET NULL,
  status content_status NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_stories_slug ON stories (slug);
CREATE INDEX idx_stories_status ON stories (status);
CREATE INDEX idx_stories_sort_order ON stories (sort_order DESC);
CREATE INDEX idx_stories_creator_id ON stories (creator_id);
CREATE INDEX idx_stories_organisation_id ON stories (organisation_id);

-- =============================================================================
-- Categories
-- =============================================================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  slug TEXT UNIQUE,
  image_url TEXT,
  short_description TEXT,
  shop_cta TEXT,
  status content_status NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories (slug);
CREATE INDEX idx_categories_status ON categories (status);
CREATE INDEX idx_categories_sort_order ON categories (sort_order DESC);

-- =============================================================================
-- Products
-- =============================================================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  slug TEXT UNIQUE,
  short_description TEXT,
  full_description TEXT,
  main_image_url TEXT,
  price_gbp NUMERIC(10, 2) CHECK (price_gbp IS NULL OR price_gbp >= 0),
  story_number TEXT,
  product_type TEXT,
  medium TEXT,
  qr_story_url TEXT,
  edition_number TEXT,
  total_edition_size TEXT,
  profit_share_note TEXT,
  impact_note TEXT,
  inventory_type inventory_type NOT NULL DEFAULT 'unlimited',
  inventory_quantity INTEGER CHECK (inventory_quantity IS NULL OR inventory_quantity >= 0),
  weight TEXT,
  dimensions TEXT,
  status content_status NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products (slug);
CREATE INDEX idx_products_status ON products (status);
CREATE INDEX idx_products_sort_order ON products (sort_order DESC);

-- =============================================================================
-- Product images (gallery)
-- =============================================================================
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_images_product_id ON product_images (product_id);
CREATE INDEX idx_product_images_sort_order ON product_images (product_id, sort_order DESC);

-- =============================================================================
-- Product variants
-- =============================================================================
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  variant_name TEXT,
  inventory_type inventory_type NOT NULL DEFAULT 'unlimited',
  inventory_quantity INTEGER CHECK (inventory_quantity IS NULL OR inventory_quantity >= 0),
  sku TEXT UNIQUE,
  price_override NUMERIC(10, 2) CHECK (price_override IS NULL OR price_override >= 0),
  status content_status NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_variants_product_id ON product_variants (product_id);
CREATE INDEX idx_product_variants_sku ON product_variants (sku);
CREATE INDEX idx_product_variants_status ON product_variants (status);
CREATE INDEX idx_product_variants_sort_order ON product_variants (product_id, sort_order DESC);

-- =============================================================================
-- Relations (M:N)
-- =============================================================================
CREATE TABLE product_creators (
  product_id UUID NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES creators (id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, creator_id)
);

CREATE TABLE product_stories (
  product_id UUID NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  story_id UUID NOT NULL REFERENCES stories (id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, story_id)
);

CREATE TABLE product_organisations (
  product_id UUID NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  organisation_id UUID NOT NULL REFERENCES organisations (id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, organisation_id)
);

CREATE TABLE product_categories (
  product_id UUID NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories (id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

CREATE INDEX idx_product_creators_creator ON product_creators (creator_id);
CREATE INDEX idx_product_stories_story ON product_stories (story_id);
CREATE INDEX idx_product_organisations_org ON product_organisations (organisation_id);
CREATE INDEX idx_product_categories_category ON product_categories (category_id);

-- =============================================================================
-- Orders (guest checkout) + Stripe idempotency
-- =============================================================================
CREATE SEQUENCE order_number_seq START 1;

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN 'BP-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 6, '0');
END;
$$;

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- Human-readable reference (receipts, support, admin)
  order_number TEXT NOT NULL UNIQUE DEFAULT generate_order_number(),
  -- Stripe: one DB order per Checkout Session / PaymentIntent (no duplicates)
  stripe_checkout_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  address_line_1 TEXT,
  address_line_2 TEXT,
  city TEXT,
  county TEXT,
  postcode TEXT,
  country TEXT DEFAULT 'GB',
  courier_name TEXT,
  shipping_method_name TEXT,
  shipping_price NUMERIC(10, 2) CHECK (shipping_price IS NULL OR shipping_price >= 0),
  payment_method payment_method,
  payment_status payment_status NOT NULL DEFAULT 'pending',
  order_status order_status NOT NULL DEFAULT 'pending',
  subtotal NUMERIC(10, 2) CHECK (subtotal IS NULL OR subtotal >= 0),
  shipping_total NUMERIC(10, 2) CHECK (shipping_total IS NULL OR shipping_total >= 0),
  grand_total NUMERIC(10, 2) CHECK (grand_total IS NULL OR grand_total >= 0),
  customer_note TEXT,
  admin_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_order_number ON orders (order_number);
CREATE INDEX idx_orders_email ON orders (email);
CREATE INDEX idx_orders_payment_status ON orders (payment_status);
CREATE INDEX idx_orders_order_status ON orders (order_status);
CREATE INDEX idx_orders_created_at ON orders (created_at DESC);
CREATE UNIQUE INDEX idx_orders_stripe_session ON orders (stripe_checkout_session_id)
  WHERE stripe_checkout_session_id IS NOT NULL;
CREATE UNIQUE INDEX idx_orders_stripe_pi ON orders (stripe_payment_intent_id)
  WHERE stripe_payment_intent_id IS NOT NULL;

-- Webhook idempotency: same Stripe event never processed twice
CREATE TABLE stripe_webhook_events (
  stripe_event_id TEXT PRIMARY KEY,
  event_type TEXT,
  order_id UUID REFERENCES orders (id) ON DELETE SET NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_stripe_webhook_events_order ON stripe_webhook_events (order_id);

-- =============================================================================
-- Order items (snapshots)
-- =============================================================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  product_id UUID REFERENCES products (id) ON DELETE SET NULL,
  variant_id UUID REFERENCES product_variants (id) ON DELETE SET NULL,
  product_title TEXT,
  sku TEXT,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) CHECK (unit_price IS NULL OR unit_price >= 0),
  line_total NUMERIC(10, 2) CHECK (line_total IS NULL OR line_total >= 0),
  edition_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON order_items (order_id);
CREATE INDEX idx_order_items_product_id ON order_items (product_id);
CREATE INDEX idx_order_items_variant_id ON order_items (variant_id);

-- =============================================================================
-- Order status history
-- =============================================================================
CREATE TABLE order_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  previous_status order_status,
  new_status order_status NOT NULL,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  changed_by TEXT
);

CREATE INDEX idx_order_status_history_order ON order_status_history (order_id, changed_at DESC);

-- =============================================================================
-- Customer messages (forms)
-- =============================================================================
CREATE TABLE customer_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_info TEXT,
  source_form TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_customer_messages_created_at ON customer_messages (created_at DESC);
CREATE INDEX idx_customer_messages_source ON customer_messages (source_form);

-- =============================================================================
-- Inventory on payment_status -> paid
-- =============================================================================
CREATE OR REPLACE FUNCTION decrement_inventory_for_order(p_order_id UUID)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  r RECORD;
  v_type inventory_type;
  v_qty INTEGER;
BEGIN
  FOR r IN
    SELECT oi.variant_id, oi.product_id, oi.quantity
    FROM order_items oi
    WHERE oi.order_id = p_order_id
  LOOP
    IF r.variant_id IS NOT NULL THEN
      SELECT pv.inventory_type, pv.inventory_quantity
      INTO v_type, v_qty
      FROM product_variants pv
      WHERE pv.id = r.variant_id
      FOR UPDATE;

      IF v_type IN ('single', 'limited') THEN
        IF v_qty IS NULL OR v_qty < r.quantity THEN
          RAISE EXCEPTION 'Insufficient variant inventory for order %', p_order_id;
        END IF;
        UPDATE product_variants
        SET inventory_quantity = inventory_quantity - r.quantity
        WHERE id = r.variant_id;
      END IF;
    ELSIF r.product_id IS NOT NULL THEN
      SELECT p.inventory_type, p.inventory_quantity
      INTO v_type, v_qty
      FROM products p
      WHERE p.id = r.product_id
      FOR UPDATE;

      IF v_type IN ('single', 'limited') THEN
        IF v_qty IS NULL OR v_qty < r.quantity THEN
          RAISE EXCEPTION 'Insufficient product inventory for order %', p_order_id;
        END IF;
        UPDATE products
        SET inventory_quantity = inventory_quantity - r.quantity
        WHERE id = r.product_id;
      END IF;
    END IF;
  END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION trg_orders_payment_paid_inventory()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.payment_status = 'paid' AND (OLD.payment_status IS DISTINCT FROM 'paid') THEN
    PERFORM decrement_inventory_for_order(NEW.id);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER orders_payment_paid_inventory
  AFTER UPDATE OF payment_status ON orders
  FOR EACH ROW
  EXECUTE FUNCTION trg_orders_payment_paid_inventory();

-- =============================================================================
-- Order status history on order_status change
-- =============================================================================
CREATE OR REPLACE FUNCTION trg_orders_status_history()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.order_status IS DISTINCT FROM OLD.order_status THEN
    INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by)
    VALUES (OLD.id, OLD.order_status, NEW.order_status, NULL);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER orders_status_history
  AFTER UPDATE OF order_status ON orders
  FOR EACH ROW
  EXECUTE FUNCTION trg_orders_status_history();

-- Initial history row on insert
CREATE OR REPLACE FUNCTION trg_orders_initial_status_history()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by)
  VALUES (NEW.id, NULL, NEW.order_status, 'system');
  RETURN NEW;
END;
$$;

CREATE TRIGGER orders_initial_status_history
  AFTER INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION trg_orders_initial_status_history();

-- =============================================================================
-- updated_at triggers
-- =============================================================================
CREATE TRIGGER creators_updated_at BEFORE UPDATE ON creators
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();
CREATE TRIGGER organisations_updated_at BEFORE UPDATE ON organisations
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();
CREATE TRIGGER stories_updated_at BEFORE UPDATE ON stories
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();
CREATE TRIGGER categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();
CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();
CREATE TRIGGER product_variants_updated_at BEFORE UPDATE ON product_variants
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

-- =============================================================================
-- Helper: upsert paid order from Stripe (call from webhook with service role)
-- =============================================================================
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
    payment_status = 'paid',
    order_status = CASE WHEN order_status = 'pending' THEN 'confirmed' ELSE order_status END,
    stripe_payment_intent_id = COALESCE(p_stripe_payment_intent_id, stripe_payment_intent_id),
    updated_at = NOW()
  WHERE id = v_order_id
    AND payment_status IS DISTINCT FROM 'paid';

  IF p_stripe_event_id IS NOT NULL THEN
    INSERT INTO stripe_webhook_events (stripe_event_id, event_type, order_id)
    VALUES (p_stripe_event_id, 'checkout.session.completed', v_order_id)
    ON CONFLICT (stripe_event_id) DO NOTHING;
  END IF;

  RETURN v_order_id;
END;
$$;

COMMENT ON TABLE orders IS 'Guest checkout. order_number = BP-YYYYMMDD-######. stripe_checkout_session_id UNIQUE prevents duplicate card orders.';
COMMENT ON COLUMN orders.stripe_checkout_session_id IS 'Set before redirect to Stripe; webhook matches this once.';
COMMENT ON TABLE stripe_webhook_events IS 'Idempotent Stripe webhook processing by event id.';
COMMENT ON FUNCTION complete_order_from_stripe IS 'Webhook: mark paid once; safe on Stripe retries.';

-- =============================================================================
-- RLS (public catalog read; contact form insert; orders admin/service only)
-- =============================================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_webhook_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY categories_public_read ON categories
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY products_public_read ON products
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY product_images_public_read ON product_images
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_images.product_id AND p.status = 'active'
    )
  );

CREATE POLICY product_categories_public_read ON product_categories
  FOR SELECT TO anon, authenticated
  USING (true);

ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY product_variants_public_read ON product_variants
  FOR SELECT TO anon, authenticated
  USING (
    status = 'active'
    AND EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_variants.product_id AND p.status = 'active'
    )
  );

CREATE POLICY customer_messages_anon_insert ON customer_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY creators_public_read ON creators
  FOR SELECT TO anon, authenticated
  USING (status = 'active' AND is_anonymous = FALSE);

CREATE POLICY organisations_public_read ON organisations
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY stories_public_read ON stories
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

-- orders / order_items: no anon policies (service role + admin only)
