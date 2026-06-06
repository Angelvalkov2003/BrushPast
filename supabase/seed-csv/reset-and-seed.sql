-- =============================================================================
-- BrushPast: reset catalog + insert new seed data
-- Run in Supabase Dashboard → SQL Editor (as postgres / service role)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- STEP 1 — Clear catalog content (keeps orders + customer_messages)
-- -----------------------------------------------------------------------------
UPDATE order_items
SET product_id = NULL, variant_id = NULL
WHERE product_id IS NOT NULL OR variant_id IS NOT NULL;

TRUNCATE TABLE
  product_categories,
  product_organisations,
  product_stories,
  product_creators,
  product_variants,
  product_images,
  products,
  stories,
  categories,
  creators,
  organisations
RESTART IDENTITY CASCADE;

-- Optional: wipe test orders too (uncomment if you want a fully empty DB)
-- TRUNCATE TABLE stripe_webhook_events, order_status_history, order_items, orders RESTART IDENTITY CASCADE;
-- TRUNCATE TABLE customer_messages RESTART IDENTITY CASCADE;

-- -----------------------------------------------------------------------------
-- STEP 2 — Insert new seed data (client brief)
-- -----------------------------------------------------------------------------

-- Creators
INSERT INTO creators (id, name, image_url, short_description, profile_url, is_anonymous, status, sort_order) VALUES
('11111111-1111-4111-8111-111111111101', 'Bobby', '(03-bobby/hero.jpg)', 'Grew up on an estate where silence was safer than hope. Art became the one place he could tell the truth without apologising — bold colour over pain, humour over shame.', NULL, FALSE, 'active', 50),
('11111111-1111-4111-8111-111111111102', 'Errol', '(04-errol/hero.jpg)', 'Raised on a South London estate; crack and custody took his twenties. A disposable camera in a hostel hallway was the first time he saw himself as human.', NULL, FALSE, 'active', 45),
('11111111-1111-4111-8111-111111111103', 'Leon', '(03-bobby/supporting-leon.jpg)', 'Spent years between hostels and hospital beds. Drawing in biro on bus tickets kept him tethered to something gentle when everything else felt temporary.', NULL, FALSE, 'active', 40),
('11111111-1111-4111-8111-111111111104', 'Ed', '(03-bobby/supporting-ed.jpg)', 'There were days daylight felt like a burden. Painting in a small room after prison gave him something real to hold onto — one canvas, one honest line at a time.', NULL, FALSE, 'active', 35),
('11111111-1111-4111-8111-111111111105', 'Jamie', '(02-stories/featured-jamie.jpg)', 'Homeless at sixteen, addicted by eighteen. Zines and photography became proof he existed beyond the statistics people used to describe him.', NULL, FALSE, 'active', 30),
('11111111-1111-4111-8111-111111111106', 'Christian', '(02-stories/featured-christian.jpg)', 'Anonymous in public, loud on the page. Christian shares work under a pseudonym so the story can travel without the cost of exposure.', NULL, TRUE, 'active', 25);

-- Organisations
INSERT INTO organisations (id, name, image_url, short_description, slug, external_url, status, sort_order) VALUES
('22222222-2222-4222-8222-222222222201', 'London Coffee Factory', '(org-london-coffee-factory.jpg)', 'Creative hub and café space in Peckham where BrushPast workshops and conversations happen.', 'london-coffee-factory', 'https://www.londoncoffeefactory.co.uk', 'active', 50),
('22222222-2222-4222-8222-222222222202', 'Groundswell', '(org-groundswell.jpg)', 'Homelessness charity partner for storytelling and health advocacy programmes.', 'groundswell', 'https://www.groundswell.org.uk', 'active', 45),
('22222222-2222-4222-8222-222222222203', 'Koestler Arts', '(org-koestler-arts.jpg)', 'National charity supporting arts by people in the criminal justice system.', 'koestler-arts', 'https://www.koestlerarts.org.uk', 'active', 40),
('22222222-2222-4222-8222-222222222204', 'Stockwell Park Community Trust', '(org-stockwell-park.jpg)', 'Local community trust hosting photography and creative workshops.', 'stockwell-park', NULL, 'active', 35),
('22222222-2222-4222-8222-222222222205', 'DA Interventions', '(org-da-interventions.jpg)', 'Recovery and mentoring organisation linked to early intervention creative work.', 'da-interventions', NULL, 'active', 30);

-- Categories (4 shop collections)
INSERT INTO categories (id, name, slug, image_url, short_description, shop_cta, status, sort_order) VALUES
('44444444-4444-4444-8444-444444444401', 'Wear the Story', 'wear-the-story', '(06-shop/wear-t-shirts.jpg)', 'T-shirts and apparel featuring original artwork from our community.', 'Explore apparel', 'active', 50),
('44444444-4444-4444-8444-444444444402', 'Drink the Story', 'drink-the-story', '(06-shop/coffee-editions.jpg)', 'Curated coffee editions with story cards — meaningful conversations.', 'Discover coffee', 'active', 45),
('44444444-4444-4444-8444-444444444403', 'Frame the Story', 'frame-the-story', '(06-shop/prints.jpg)', 'Prints and original artwork to keep a voice on your wall.', 'View prints', 'active', 40),
('44444444-4444-4444-8444-444444444404', 'Gift the Story', 'gift-the-story', '(06-shop/gift-boxes.jpg)', 'Gift boxes and story cards — give something real.', 'Shop gifts', 'active', 35);

-- Stories (requires page_url column — run migration 20260305120000 if missing)
INSERT INTO stories (id, title, slug, image_url, page_url, short_description, tags, creator_id, organisation_id, status, sort_order) VALUES
('33333333-3333-4333-8333-333333333301', 'Bobby', 'bobby', '(03-bobby/hero.jpg)', '/stories/bobby', 'Art that refuses to whisper — Bobby paints survival in colour.', ARRAY['art','recovery'], '11111111-1111-4111-8111-111111111101', '22222222-2222-4222-8222-222222222201', 'active', 50),
('33333333-3333-4333-8333-333333333302', 'Errol', 'errol', '(04-errol/hero.jpg)', '/stories/errol', 'Photography as love letters to people the city walks past.', ARRAY['photography','community-stories'], '11111111-1111-4111-8111-111111111102', '22222222-2222-4222-8222-222222222204', 'active', 45),
('33333333-3333-4333-8333-333333333303', 'Leon', 'leon', '(03-bobby/supporting-leon.jpg)', '/stories/leon', 'Small drawings on scraps of paper — a quiet record of rebuilding.', ARRAY['art','recovery'], '11111111-1111-4111-8111-111111111103', '22222222-2222-4222-8222-222222222201', 'active', 40),
('33333333-3333-4333-8333-333333333304', 'Ed', 'ed', '(03-bobby/supporting-ed.jpg)', '/stories/ed', 'There were days daylight felt like a burden. Art pulled him back.', ARRAY['art','writing','recovery'], '11111111-1111-4111-8111-111111111104', '22222222-2222-4222-8222-222222222203', 'active', 35),
('33333333-3333-4333-8333-333333333305', 'Jamie', 'jamie', '(02-stories/featured-jamie.jpg)', '/stories/jamie', 'Fragments of estate life — told through zines and photographs.', ARRAY['photography','writing','community-stories'], '11111111-1111-4111-8111-111111111105', '22222222-2222-4222-8222-222222222202', 'active', 30);

-- Products
INSERT INTO products (
  id, title, slug, short_description, full_description, main_image_url,
  price_gbp, story_number, product_type, medium, qr_story_url,
  edition_number, total_edition_size, profit_share_note, impact_note,
  inventory_type, inventory_quantity, weight, dimensions, status, sort_order
) VALUES
('55555555-5555-4555-8555-555555555501', 'Bobby Workshop Tee', 'bobby-workshop-tee', 'Screen-printed tee featuring artwork from Bobby''s workshop series.', 'Unisex organic cotton. Design from a T-Shirt Design workshop. 65% of profits reinvested with creators and partners.', '(06-shop/wear-bobby-tee.jpg)', 28.00, 'BP-001', 't-shirt', 'cotton screen print', 'https://brushpast.org/stories/bobby', NULL, NULL, '65% to creators and partners', 'Funds T-Shirt Design workshops', 'limited', 40, '180g', 'S–XL', 'active', 50),
('55555555-5555-4555-8555-555555555502', 'Errol — Peckham Morning', 'errol-peckham-morning', 'Limited giclée print by Errol McGlashan.', 'A3 archival print. Edition of 25. Supports photography workshops at Stockwell Park.', '(06-shop/print-errol-peckham.jpg)', 45.00, 'BP-014', 'print', 'giclée on paper', 'https://brushpast.org/stories/errol', '12', '25', 'Creator paid fairly on every sale', 'Supports Photography workshops', 'limited', 25, '350g', 'A3', 'active', 45),
('55555555-5555-4555-8555-555555555503', 'BrushPast Coffee Edition', 'brushpast-coffee-edition', 'Single-origin coffee with story card — Drink the Story.', '250g wholebean coffee roasted in the UK plus printed story card. Curated for conversation.', '(06-shop/coffee-edition.jpg)', 12.50, 'BP-003', 'coffee-edition', 'wholebean + story card', 'https://brushpast.org/stories/bobby', NULL, NULL, '65% reinvestment model', 'Supports London Coffee Factory programmes', 'unlimited', NULL, '480g', '250g bag', 'active', 40),
('55555555-5555-4555-8555-555555555504', 'Gift the Story Box', 'gift-the-story-box', 'Coffee gift box with story card and print insert.', 'Gift box: coffee edition, story card, and A5 print. Ideal for giving something real.', '(06-shop/gift-box.jpg)', 24.00, 'BP-010', 'gift-box', 'coffee + card + print', 'https://brushpast.org/stories/errol', NULL, NULL, '65% to creators and partners', 'Funds workshops and mentoring', 'unlimited', NULL, '620g', 'Box 24×18×8cm', 'active', 35),
('55555555-5555-4555-8555-555555555505', 'Story Card — Bobby', 'story-card-bobby', 'Pocket story card featuring Bobby''s artwork and quote.', 'Collectible story card — QR links to Bobby''s full story page.', '(06-shop/story-card-bobby.jpg)', 4.50, 'BP-022', 'story-card', 'printed card', 'https://brushpast.org/stories/bobby', NULL, NULL, 'Profits reinvested', 'Supports creative recovery workshops', 'unlimited', NULL, '15g', 'A6 card', 'active', 30);

-- Product images
INSERT INTO product_images (id, product_id, image_url, sort_order) VALUES
('66666666-6666-4666-8666-666666666601', '55555555-5555-4555-8555-555555555501', '(06-shop/wear-bobby-tee-back.jpg)', 40),
('66666666-6666-4666-8666-666666666602', '55555555-5555-4555-8555-555555555501', '(06-shop/wear-bobby-tee-detail.jpg)', 30),
('66666666-6666-4666-8666-666666666603', '55555555-5555-4555-8555-555555555502', '(06-shop/print-errol-peckham-frame.jpg)', 40),
('66666666-6666-4666-8666-666666666604', '55555555-5555-4555-8555-555555555503', '(06-shop/coffee-edition-lifestyle.jpg)', 40),
('66666666-6666-4666-8666-666666666605', '55555555-5555-4555-8555-555555555504', '(06-shop/gift-box-open.jpg)', 40),
('66666666-6666-4666-8666-666666666606', '55555555-5555-4555-8555-555555555505', '(06-shop/story-card-bobby-detail.jpg)', 40);

-- Product variants (Bobby tee sizes only)
INSERT INTO product_variants (id, product_id, variant_name, inventory_type, inventory_quantity, sku, price_override, status, sort_order) VALUES
('77777777-7777-4777-8777-777777777701', '55555555-5555-4555-8555-555555555501', 'Size S', 'limited', 15, 'BP-TEE-S', NULL, 'active', 30),
('77777777-7777-4777-8777-777777777702', '55555555-5555-4555-8555-555555555501', 'Size M', 'limited', 20, 'BP-TEE-M', NULL, 'active', 40),
('77777777-7777-4777-8777-777777777703', '55555555-5555-4555-8555-555555555501', 'Size L', 'limited', 15, 'BP-TEE-L', NULL, 'active', 50);

-- Junction: product ↔ creator
INSERT INTO product_creators (product_id, creator_id) VALUES
('55555555-5555-4555-8555-555555555501', '11111111-1111-4111-8111-111111111101'),
('55555555-5555-4555-8555-555555555502', '11111111-1111-4111-8111-111111111102'),
('55555555-5555-4555-8555-555555555503', '11111111-1111-4111-8111-111111111101'),
('55555555-5555-4555-8555-555555555504', '11111111-1111-4111-8111-111111111102'),
('55555555-5555-4555-8555-555555555505', '11111111-1111-4111-8111-111111111101');

-- Junction: product ↔ category
INSERT INTO product_categories (product_id, category_id) VALUES
('55555555-5555-4555-8555-555555555501', '44444444-4444-4444-8444-444444444401'),
('55555555-5555-4555-8555-555555555502', '44444444-4444-4444-8444-444444444403'),
('55555555-5555-4555-8555-555555555503', '44444444-4444-4444-8444-444444444402'),
('55555555-5555-4555-8555-555555555504', '44444444-4444-4444-8444-444444444404'),
('55555555-5555-4555-8555-555555555505', '44444444-4444-4444-8444-444444444404');

-- Junction: product ↔ story
INSERT INTO product_stories (product_id, story_id) VALUES
('55555555-5555-4555-8555-555555555501', '33333333-3333-4333-8333-333333333301'),
('55555555-5555-4555-8555-555555555502', '33333333-3333-4333-8333-333333333302'),
('55555555-5555-4555-8555-555555555503', '33333333-3333-4333-8333-333333333301'),
('55555555-5555-4555-8555-555555555504', '33333333-3333-4333-8333-333333333302'),
('55555555-5555-4555-8555-555555555505', '33333333-3333-4333-8333-333333333301');

-- Junction: product ↔ organisation
INSERT INTO product_organisations (product_id, organisation_id) VALUES
('55555555-5555-4555-8555-555555555501', '22222222-2222-4222-8222-222222222201'),
('55555555-5555-4555-8555-555555555502', '22222222-2222-4222-8222-222222222204'),
('55555555-5555-4555-8555-555555555503', '22222222-2222-4222-8222-222222222204'),
('55555555-5555-4555-8555-555555555504', '22222222-2222-4222-8222-222222222201'),
('55555555-5555-4555-8555-555555555505', '22222222-2222-4222-8222-222222222202');
