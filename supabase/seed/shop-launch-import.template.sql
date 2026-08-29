-- =============================================================================
-- BrushPast — Shop launch data import (TEMPLATE)
-- =============================================================================
-- Fill in product rows when Jeremy confirms designs, SKUs and stock.
-- Image paths are placeholders until photography is ready — use NULL or
-- /shop/placeholders/... paths and replace later without changing slugs/SKUs.
--
-- Run order:
--   1. Fixed box prices (section A) — safe to run now
--   2. Categories check (section B)
--   3. Products + variants (section C) — after spreadsheet is complete
--   4. product_categories links (section D)
--
-- Category UUIDs (from final_db.sql seed):
--   wear-the-story  → 44444444-4444-4444-8444-444444444401
--   drink-the-story → 44444444-4444-4444-8444-444444444402
--   frame-the-story → 44444444-4444-4444-8444-444444444403
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- A) Fixed gift-box prices (Curated Pairings + Next Chapter)
-- -----------------------------------------------------------------------------

UPDATE box_pair_prices SET price_gbp = 58.00, updated_at = NOW()
  WHERE combo_id = 'print_tshirt';   -- T-shirt + Print £58

UPDATE box_pair_prices SET price_gbp = 40.00, updated_at = NOW()
  WHERE combo_id = 'print_coffee';   -- Coffee + Print £40

UPDATE box_pair_prices SET price_gbp = 47.00, updated_at = NOW()
  WHERE combo_id = 'tshirt_coffee';  -- Coffee + T-shirt £47

-- Next Chapter (type a) fixed price — apply migration 20260828120000_box_fixed_prices.sql
-- INSERT INTO box_fixed_prices (box_type, price_gbp, label) VALUES
--   ('a', 70.00, 'Next Chapter')
-- ON CONFLICT (box_type) DO UPDATE SET price_gbp = EXCLUDED.price_gbp;

-- Single Collection fixed prices (app-enforced via BOX_CATEGORY_ROWS):
--   coffee  → £15
--   t-shirt → £35
--   print   → £28
-- Build Your Own discounts (app):
--   2 items → retail − 7%
--   3 items → retail − 10%
--   1 item after cart edit → full single category price

-- -----------------------------------------------------------------------------
-- B) Verify shop categories exist
-- -----------------------------------------------------------------------------

-- SELECT id, slug, name FROM categories
-- WHERE slug IN ('wear-the-story', 'drink-the-story', 'frame-the-story');

-- -----------------------------------------------------------------------------
-- C) Products — TEMPLATE ROWS (duplicate block per design)
-- -----------------------------------------------------------------------------
-- Expected launch catalog:
--   Coffee:     TBD SKUs (confirm with client)
--   T-shirts:   16 designs × 4 sizes (S/M/L/XL) — stock per variant
--   Prints:     8 designs × 1 size (A5 at launch, confirm)
--
-- Replace:
--   {UUID}           → stable uuid per product
--   {slug}           → url slug
--   {title}          → display name
--   {design_code}    → e.g. BP-TEE-01
--   {image}          → /products/{slug}.jpg when ready
--   {story_id}       → optional link to stories.id
--   {stock_s/m/l/xl} → per-size quantities

/*
-- Example: one t-shirt design with four size variants @ £35
INSERT INTO products (
  id, title, slug, short_description, full_description, main_image_url,
  price_gbp, story_number, product_type, medium, qr_story_url,
  profit_share_note, impact_note,
  inventory_type, inventory_quantity, weight, dimensions, status, sort_order
) VALUES (
  '{UUID}',
  '{title}',
  '{slug}',
  'Artist-designed t-shirt from the Brush Past archive.',
  'Unisex organic cotton. 65% of profits reinvested with creators and partners.',
  NULL,  -- image later: '/products/{slug}.jpg'
  35.00,
  '{design_code}',
  't-shirt',
  'screen print',
  NULL,
  '65% to creators and partners',
  'Funds workshops and mentoring',
  'limited',
  NULL,  -- stock tracked on variants
  '180g',
  'S–XL',
  'active',
  50
);

INSERT INTO product_variants (id, product_id, variant_name, inventory_type, inventory_quantity, sku, price_override, status, sort_order) VALUES
  (gen_random_uuid(), '{UUID}', 'Size S', 'limited', {stock_s}, '{design_code}-S', NULL, 'active', 10),
  (gen_random_uuid(), '{UUID}', 'Size M', 'limited', {stock_m}, '{design_code}-M', NULL, 'active', 20),
  (gen_random_uuid(), '{UUID}', 'Size L', 'limited', {stock_l}, '{design_code}-L', NULL, 'active', 30),
  (gen_random_uuid(), '{UUID}', 'Size XL', 'limited', {stock_xl}, '{design_code}-XL', NULL, 'active', 40);

INSERT INTO product_categories (product_id, category_id) VALUES
  ('{UUID}', '44444444-4444-4444-8444-444444444401');

-- Example: one print design @ £28 (single variant — fixed A5)
INSERT INTO products (...) VALUES (... price_gbp 28.00, product_type 'print' ...);
INSERT INTO product_variants (...) VALUES (... variant_name 'A5', sku '{design_code}-A5' ...);
INSERT INTO product_categories (product_id, category_id) VALUES
  ('{UUID}', '44444444-4444-4444-8444-444444444403');

-- Example: coffee edition @ £15
INSERT INTO products (...) VALUES (... price_gbp 15.00, product_type 'coffee-edition' ...);
INSERT INTO product_categories (product_id, category_id) VALUES
  ('{UUID}', '44444444-4444-4444-8444-444444444402');
*/

-- -----------------------------------------------------------------------------
-- D) Deprecate old demo products (optional — run after new catalog is live)
-- -----------------------------------------------------------------------------

-- UPDATE products SET status = 'archived'
-- WHERE slug IN (
--   'bobby-workshop-tee',
--   'errol-peckham-morning',
--   'brushpast-coffee-edition',
--   'gift-the-story-box',
--   'story-card-bobby'
-- );

COMMIT;
