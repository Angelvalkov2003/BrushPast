-- Fixed-price box types (Next Chapter / type a at launch).
-- Pair prices remain in box_pair_prices; Build Your Own uses app-side discounts.

CREATE TABLE IF NOT EXISTS box_fixed_prices (
  box_type box_type PRIMARY KEY,
  price_gbp NUMERIC(10, 2) NOT NULL CHECK (price_gbp >= 0),
  label TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO box_fixed_prices (box_type, price_gbp, label) VALUES
  ('a', 70.00, 'Next Chapter')
ON CONFLICT (box_type) DO UPDATE
  SET price_gbp = EXCLUDED.price_gbp,
      label = EXCLUDED.label,
      updated_at = NOW();

CREATE TRIGGER box_fixed_prices_updated_at
  BEFORE UPDATE ON box_fixed_prices
  FOR EACH ROW
  EXECUTE FUNCTION trg_set_updated_at();

ALTER TABLE box_fixed_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY box_fixed_prices_public_read ON box_fixed_prices
  FOR SELECT TO anon, authenticated
  USING (true);

COMMENT ON TABLE box_fixed_prices IS 'Fixed GBP price for box types that do not use SKU sum (Next Chapter = type a).';
