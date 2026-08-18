-- BrushPast shop boxes (Types A–D)
-- Incremental: run on existing databases that already applied final_db.sql.
-- Cart remains client-side (localStorage); nothing here persists bag contents.
-- Gift message is a dedicated column so checkout "order notes" can stay separate.

CREATE TYPE box_type AS ENUM ('a', 'b', 'c', 'd');
CREATE TYPE box_pair_combo AS ENUM ('print_tshirt', 'print_coffee', 'tshirt_coffee');

-- Hardcoded Type B pair prices. price_gbp is NULL until PM supplies GBP amounts.
CREATE TABLE box_pair_prices (
  combo_id box_pair_combo PRIMARY KEY,
  price_gbp NUMERIC(10, 2) CHECK (price_gbp IS NULL OR price_gbp >= 0),
  label TEXT NOT NULL,
  category_keys TEXT[] NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO box_pair_prices (combo_id, price_gbp, label, category_keys) VALUES
  ('print_tshirt', NULL, 'Print + T-shirt', ARRAY['print', 'tshirt']),
  ('print_coffee', NULL, 'Print + Coffee', ARRAY['print', 'coffee']),
  ('tshirt_coffee', NULL, 'T-shirt + Coffee', ARRAY['tshirt', 'coffee']);

CREATE TRIGGER box_pair_prices_updated_at
  BEFORE UPDATE ON box_pair_prices
  FOR EACH ROW
  EXECUTE FUNCTION trg_set_updated_at();

ALTER TABLE box_pair_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY box_pair_prices_public_read ON box_pair_prices
  FOR SELECT TO anon, authenticated
  USING (true);

ALTER TABLE orders
  ADD COLUMN box_type box_type,
  ADD COLUMN box_combo_id box_pair_combo,
  ADD COLUMN gift_message TEXT;

COMMENT ON COLUMN orders.box_type IS 'Box type for this order when the bag contains a Brush Past Box (a/b/c/d).';
COMMENT ON COLUMN orders.box_combo_id IS 'Type B pair key (print_tshirt / print_coffee / tshirt_coffee).';
COMMENT ON COLUMN orders.gift_message IS 'Required gift message from the box builder. Separate from customer_note (optional checkout comments).';
COMMENT ON COLUMN orders.customer_note IS 'Optional checkout comments. Gift messages live in gift_message.';

ALTER TABLE order_items
  ADD COLUMN box_category_key TEXT,
  ADD COLUMN source_box_type box_type;

COMMENT ON COLUMN order_items.box_category_key IS 'coffee | tshirt | print — which box carousel section this SKU came from.';
COMMENT ON COLUMN order_items.source_box_type IS 'Box type that contained this SKU at checkout (for inventory flatten).';

CREATE INDEX idx_orders_box_type ON orders (box_type) WHERE box_type IS NOT NULL;
