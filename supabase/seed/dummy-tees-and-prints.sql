-- =============================================================================
-- Dummy products: 3 t-shirts + 3 prints (no images)
-- Paste ONLY this file into Supabase SQL Editor and Run
-- Safe to re-run: skips existing slug / sku
-- =============================================================================

DO $$
DECLARE
  wear_id UUID;
  frame_id UUID;

  tee1 UUID := gen_random_uuid();
  tee2 UUID := gen_random_uuid();
  tee3 UUID := gen_random_uuid();
  print1 UUID := gen_random_uuid();
  print2 UUID := gen_random_uuid();
  print3 UUID := gen_random_uuid();
BEGIN
  SELECT id INTO wear_id FROM categories WHERE slug = 'wear-the-story' LIMIT 1;
  SELECT id INTO frame_id FROM categories WHERE slug = 'frame-the-story' LIMIT 1;

  IF wear_id IS NULL OR frame_id IS NULL THEN
    RAISE EXCEPTION 'Missing categories wear-the-story / frame-the-story';
  END IF;

  -- T-SHIRTS
  INSERT INTO products (
    id, title, slug, short_description, full_description, main_image_url,
    price_gbp, story_number, product_type, medium, qr_story_url,
    profit_share_note, impact_note,
    inventory_type, inventory_quantity, weight, dimensions, status, sort_order
  )
  SELECT * FROM (VALUES
    (
      tee1,
      'Dummy Tee — Night Bus Sketch',
      'dummy-tee-night-bus-sketch',
      'Soft cotton tee with a late-night line drawing from the archive.',
      'Unisex fit. Dummy product for testing the shop builder — no photo yet. 65% of profits reinvested with creators and partners.',
      NULL::text,
      28.00::numeric,
      'BP-DUM-T01',
      't-shirt',
      'organic cotton screen print',
      NULL::text,
      '65% to creators and partners',
      'Funds creative workshops',
      'limited'::inventory_type,
      36,
      '180g',
      'S–XL',
      'active'::content_status,
      28
    ),
    (
      tee2,
      'Dummy Tee — Roundabout Words',
      'dummy-tee-roundabout-words',
      'Bold type design inspired by a chance conversation.',
      'Dummy apparel SKU for box journeys and size picking. No image attached. Packaged as part of a Brush Past gift box.',
      NULL,
      30.00,
      'BP-DUM-T02',
      't-shirt',
      'organic cotton screen print',
      NULL,
      '65% to creators and partners',
      'Supports mentoring sessions',
      'limited'::inventory_type,
      40,
      '180g',
      'S–XL',
      'active'::content_status,
      27
    ),
    (
      tee3,
      'Dummy Tee — Pollen Mark',
      'dummy-tee-pollen-mark',
      'Playful mark-making from a community workshop session.',
      'Test t-shirt with random archive-style copy. Use in Single / Pairings / Build Your Own without needing photos.',
      NULL,
      26.00,
      'BP-DUM-T03',
      't-shirt',
      'organic cotton screen print',
      NULL,
      '65% reinvestment model',
      'Funds T-Shirt Design workshops',
      'limited'::inventory_type,
      32,
      '180g',
      'S–XL',
      'active'::content_status,
      26
    )
  ) AS v(
    id, title, slug, short_description, full_description, main_image_url,
    price_gbp, story_number, product_type, medium, qr_story_url,
    profit_share_note, impact_note,
    inventory_type, inventory_quantity, weight, dimensions, status, sort_order
  )
  WHERE NOT EXISTS (SELECT 1 FROM products p WHERE p.slug = v.slug);

  INSERT INTO product_variants (product_id, variant_name, inventory_type, inventory_quantity, sku, status, sort_order)
  SELECT p.id, x.variant_name, 'limited'::inventory_type, x.qty, x.sku, 'active'::content_status, x.sort_order
  FROM products p
  CROSS JOIN (VALUES
    ('Size S', 10, 30),
    ('Size M', 14, 40),
    ('Size L', 12, 50)
  ) AS s(variant_name, qty, sort_order)
  CROSS JOIN LATERAL (
    SELECT
      s.variant_name,
      s.qty,
      s.sort_order,
      CASE p.slug
        WHEN 'dummy-tee-night-bus-sketch' THEN 'BP-DUM-T01-' || REPLACE(s.variant_name, 'Size ', '')
        WHEN 'dummy-tee-roundabout-words' THEN 'BP-DUM-T02-' || REPLACE(s.variant_name, 'Size ', '')
        WHEN 'dummy-tee-pollen-mark' THEN 'BP-DUM-T03-' || REPLACE(s.variant_name, 'Size ', '')
      END AS sku
  ) x
  WHERE p.slug IN (
    'dummy-tee-night-bus-sketch',
    'dummy-tee-roundabout-words',
    'dummy-tee-pollen-mark'
  )
  AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.sku = x.sku);

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, wear_id
  FROM products p
  WHERE p.slug IN (
    'dummy-tee-night-bus-sketch',
    'dummy-tee-roundabout-words',
    'dummy-tee-pollen-mark'
  )
  ON CONFLICT DO NOTHING;

  -- PRINTS
  INSERT INTO products (
    id, title, slug, short_description, full_description, main_image_url,
    price_gbp, story_number, product_type, medium, qr_story_url,
    edition_number, total_edition_size, profit_share_note, impact_note,
    inventory_type, inventory_quantity, weight, dimensions, status, sort_order
  )
  SELECT * FROM (VALUES
    (
      print1,
      'Dummy Print — Window Light',
      'dummy-print-window-light',
      'Quiet still study about waiting rooms and morning light.',
      'A3 archival dummy print for shop testing. No photograph uploaded yet. Edition copy is fictional for staging.',
      NULL::text,
      42.00::numeric,
      'BP-DUM-P01',
      'print',
      'giclée on paper',
      NULL::text,
      '3',
      '25',
      'Creator paid fairly on every sale',
      'Supports Photography workshops',
      'limited'::inventory_type,
      18,
      '320g',
      'A3',
      'active'::content_status,
      25
    ),
    (
      print2,
      'Dummy Print — Kitchen Table Map',
      'dummy-print-kitchen-table-map',
      'Hand-drawn map of places that held a second chance.',
      'Dummy Frame it product — random archive voice, no image. Useful for pairings with coffee or tees.',
      NULL,
      38.00,
      'BP-DUM-P02',
      'print',
      'giclée on paper',
      NULL,
      '7',
      '30',
      '65% to creators and partners',
      'Funds printmaking sessions',
      'limited'::inventory_type,
      22,
      '300g',
      'A3',
      'active'::content_status,
      24
    ),
    (
      print3,
      'Dummy Print — Soft Rebellion',
      'dummy-print-soft-rebellion',
      'Colour fields and scratched type from a recovery sketchbook.',
      'Staging print with placeholder story energy. Attach a photo later in Admin → Products.',
      NULL,
      48.00,
      'BP-DUM-P03',
      'print',
      'giclée on paper',
      NULL,
      '1',
      '20',
      'Creator paid fairly on every sale',
      'Supports community exhibitions',
      'limited'::inventory_type,
      15,
      '340g',
      'A3',
      'active'::content_status,
      23
    )
  ) AS v(
    id, title, slug, short_description, full_description, main_image_url,
    price_gbp, story_number, product_type, medium, qr_story_url,
    edition_number, total_edition_size, profit_share_note, impact_note,
    inventory_type, inventory_quantity, weight, dimensions, status, sort_order
  )
  WHERE NOT EXISTS (SELECT 1 FROM products p WHERE p.slug = v.slug);

  INSERT INTO product_variants (product_id, variant_name, inventory_type, inventory_quantity, sku, status, sort_order)
  SELECT
    p.id,
    'A3 print',
    'limited'::inventory_type,
    COALESCE(p.inventory_quantity, 15),
    CASE p.slug
      WHEN 'dummy-print-window-light' THEN 'BP-DUM-P01-A3'
      WHEN 'dummy-print-kitchen-table-map' THEN 'BP-DUM-P02-A3'
      WHEN 'dummy-print-soft-rebellion' THEN 'BP-DUM-P03-A3'
    END,
    'active'::content_status,
    40
  FROM products p
  WHERE p.slug IN (
    'dummy-print-window-light',
    'dummy-print-kitchen-table-map',
    'dummy-print-soft-rebellion'
  )
  AND NOT EXISTS (
    SELECT 1 FROM product_variants pv
    WHERE pv.sku = CASE p.slug
      WHEN 'dummy-print-window-light' THEN 'BP-DUM-P01-A3'
      WHEN 'dummy-print-kitchen-table-map' THEN 'BP-DUM-P02-A3'
      WHEN 'dummy-print-soft-rebellion' THEN 'BP-DUM-P03-A3'
    END
  );

  INSERT INTO product_categories (product_id, category_id)
  SELECT p.id, frame_id
  FROM products p
  WHERE p.slug IN (
    'dummy-print-window-light',
    'dummy-print-kitchen-table-map',
    'dummy-print-soft-rebellion'
  )
  ON CONFLICT DO NOTHING;
END $$;

SELECT title, slug, product_type, price_gbp, main_image_url, status
FROM products
WHERE slug LIKE 'dummy-%'
ORDER BY product_type, title;
