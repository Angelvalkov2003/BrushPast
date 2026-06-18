-- =============================================================================
-- BrushPast: catalog data import
-- Run AFTER migrations/20260601000000_brushpast_schema.sql
-- Supabase Dashboard → SQL Editor → paste and run this file
--
-- Safe to re-run: truncates catalog tables only (keeps orders & messages).
-- =============================================================================

UPDATE order_items
SET product_id = NULL, variant_id = NULL
WHERE product_id IS NOT NULL OR variant_id IS NOT NULL;

TRUNCATE TABLE
  product_categories,
  product_organisations,
  product_stories,
  product_variants,
  product_images,
  products,
  journal_post_images,
  journal_posts,
  workshops,
  categories,
  stories,
  organisations
RESTART IDENTITY CASCADE;

-- Organisations
INSERT INTO organisations (id, name, image_url, short_description, location_label, slug, page_url, external_url, status, sort_order) VALUES
('22222222-2222-4222-8222-222222222201', 'London Coffee Factory', '(org-london-coffee-factory.jpg)', 'Creative hub and café space in Peckham where BrushPast workshops and conversations happen.', 'Peckham, London', 'london-coffee-factory', '/organisations/london-coffee-factory', 'https://www.londoncoffeefactory.co.uk', 'active', 50),
('22222222-2222-4222-8222-222222222202', 'Groundswell', '(org-groundswell.jpg)', 'Homelessness charity partner for storytelling and health advocacy programmes.', 'UK-wide', 'groundswell', '/organisations/groundswell', 'https://www.groundswell.org.uk', 'active', 45),
('22222222-2222-4222-8222-222222222203', 'Koestler Arts', '(org-koestler-arts.jpg)', 'National charity supporting arts by people in the criminal justice system.', 'UK-wide', 'koestler-arts', '/organisations/koestler-arts', 'https://www.koestlerarts.org.uk', 'active', 40),
('22222222-2222-4222-8222-222222222204', 'Stockwell Park Community Trust', '(org-stockwell-park.jpg)', 'Local community trust hosting photography and creative workshops.', 'Stockwell, London', 'stockwell-park', '/organisations/stockwell-park', NULL, 'active', 35),
('22222222-2222-4222-8222-222222222205', 'DA Interventions', '(org-da-interventions.jpg)', 'Recovery and mentoring organisation linked to early intervention creative work.', 'UK-wide', 'da-interventions', '/organisations/da-interventions', NULL, 'active', 30);

-- Stories (listing metadata; full pages hardcoded in app at page_url)
INSERT INTO stories (id, title, slug, image_url, short_description, page_url, tags, organisation_id, is_anonymous, status, sort_order) VALUES
('11111111-1111-4111-8111-111111111101', 'Bobby', 'bobby', '/bobby.png', 'I don''t see myself as the product of my crime. I see myself as the product of my creativity.', '/stories/bobby', ARRAY['writing','painting','survival','creativity','art','recovery'], '22222222-2222-4222-8222-222222222201', FALSE, 'active', 50),
('11111111-1111-4111-8111-111111111102', 'Errol', 'errol', '/stories/ERROL/1.webp', 'My Kill List was really my Forgive List… I added my own name to it.', '/stories/errol', ARRAY['writing','photography','recovery','community-stories'], '22222222-2222-4222-8222-222222222204', FALSE, 'active', 45),
('11111111-1111-4111-8111-111111111103', 'Leon', 'leon', '(03-bobby/supporting-leon.jpg)', 'Small drawings on scraps of paper — a quiet record of rebuilding.', '/stories/leon', ARRAY['art','recovery'], '22222222-2222-4222-8222-222222222201', FALSE, 'active', 40),
('11111111-1111-4111-8111-111111111104', 'Ed Beerbohm', 'ed-beerbohm', '/stories/ED-BEERBOHM/1.jpg', 'My flat — my home — has itself become a canvas.', '/stories/ed-beerbohm', ARRAY['art','writing','recovery','film'], '22222222-2222-4222-8222-222222222203', FALSE, 'active', 35),
('11111111-1111-4111-8111-111111111105', 'Jamie', 'jamie', '/stories/JAMIE/1.png', 'This is not a sob story. I consider myself to be one of the very fortunate ones.', '/stories/jamie', ARRAY['photography','writing','recovery','community-stories'], '22222222-2222-4222-8222-222222222202', FALSE, 'active', 30),
('11111111-1111-4111-8111-111111111106', 'Christian', 'christian', '(02-stories/featured-christian.jpg)', 'Anonymous in public, loud on the page.', NULL, ARRAY['writing','recovery'], NULL, TRUE, 'active', 25),
('11111111-1111-4111-8111-111111111107', 'JR', 'jr', '/jr.png', 'I painted the word love because I needed something to hold onto.', '/stories/jr', ARRAY['art','recovery','community-stories'], '22222222-2222-4222-8222-222222222201', FALSE, 'active', 55),
('11111111-1111-4111-8111-111111111108', 'David', 'david', '/stories/david/1.webp', 'The Rooms of Recovery & Fellowship — from childhood bedrooms to prison cells to peace within.', '/stories/david', ARRAY['writing','recovery','community-stories'], '22222222-2222-4222-8222-222222222201', FALSE, 'active', 58),
('11111111-1111-4111-8111-111111111109', 'Maimouna', 'maimouna', '/stories/maimouna/1.webp', 'Sleeping pills offer a quick-and-easy fix — a song from @myteakultcha (Mighty Culture).', '/stories/maimouna', ARRAY['writing','music','recovery'], NULL, FALSE, 'active', 48),
('11111111-1111-4111-8111-111111111110', 'Chrissie', 'chrissie', '/stories/CHRISSIE/1.jpeg', 'Life is good and I am thankful.', '/stories/chrissie', ARRAY['writing','recovery','community-stories'], NULL, FALSE, 'active', 47),
('11111111-1111-4111-8111-111111111111', 'Rob', 'rob', '/stories/ROB''S-POEM/1.png', 'I am just a glitch in your perfect system.', '/stories/rob', ARRAY['writing','art','recovery','community-stories'], NULL, FALSE, 'active', 46),
('11111111-1111-4111-8111-111111111112', 'Eneh', 'eneh', '/stories/ENEH''S-DAY-IN-PHOTOS/1.jpg', 'Eneh took some pictures of her day and the things she likes.', '/stories/eneh', ARRAY['photography','community-stories'], NULL, FALSE, 'active', 44),
('11111111-1111-4111-8111-111111111113', 'Jeremy', 'jeremy', '/stories/Jeremy/1.webp', 'Hope can swim in the unlikeliest of places — a fish named Jeremy at Ohio State Prison.', '/stories/jeremy', ARRAY['writing','recovery','community-stories','art'], '22222222-2222-4222-8222-222222222201', FALSE, 'active', 59),
('11111111-1111-4111-8111-111111111114', 'Little George', 'little-george', '/stories/littleGeorge/1.webp', 'That light brings recovery — from daunting mornings to a glimpse away from the darkness of addiction.', '/stories/little-george', ARRAY['writing','recovery','community-stories'], '22222222-2222-4222-8222-222222222201', FALSE, 'active', 43),
('11111111-1111-4111-8111-111111111115', 'George', 'george', '/stories/george/1.webp', 'Painting with light — from rejected prints and Photoshop to an exhibition called Now and Then.', '/stories/george', ARRAY['photography','art','recovery','community-stories'], '22222222-2222-4222-8222-222222222201', FALSE, 'active', 42);

-- Workshops (listing metadata; full pages hardcoded in app at page_url)
INSERT INTO workshops (id, title, slug, image_url, short_description, location_label, page_url, workshop_category, organisation_id, status, sort_order) VALUES
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaa04', 'Workshop No.1', 'workshop-no-1', '/workshops/workshop-no-1/hero.jpg', 'Nine t-shirts, nine voices — the first chapter of the BrushPast archive at Edward Allsop Court.', 'Edward Allsop Court, London', '/workshops/workshop-no-1', 'T-Shirt Design', NULL, 'active', 60),
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaa01', 'T-Shirt Design — Peckham', 't-shirt-design-peckham', '/workshops.png', 'Screen-printing and design in a safe creative space.', 'Peckham, London', NULL, 'T-Shirt Design', '22222222-2222-4222-8222-222222222201', 'active', 50),
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaa02', 'Photography — Stockwell', 'photography-stockwell', '/workshops-hero.png', 'Disposable cameras, portraits and neighbourhood walks.', 'Stockwell, London', NULL, 'Photography', '22222222-2222-4222-8222-222222222204', 'active', 45),
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaa03', 'Storytelling & Zines', 'storytelling-zines', '/home-hero.png', 'Writing and zine-making for lived experience.', 'Peckham, London', NULL, 'Storytelling', '22222222-2222-4222-8222-222222222201', 'active', 40);

-- Shop categories
INSERT INTO categories (id, name, slug, image_url, short_description, shop_cta, status, sort_order) VALUES
('44444444-4444-4444-8444-444444444401', 'Wear it', 'wear-the-story', '(06-shop/wear-t-shirts.jpg)', 'T-shirts and apparel featuring original artwork from our community.', 'Explore apparel', 'active', 50),
('44444444-4444-4444-8444-444444444402', 'Drink it', 'drink-the-story', '(06-shop/coffee-editions.jpg)', 'Curated coffee editions with story cards — meaningful conversations.', 'Discover coffee', 'active', 45),
('44444444-4444-4444-8444-444444444403', 'Frame it', 'frame-the-story', '(06-shop/prints.jpg)', 'Prints and original artwork to keep a voice on your wall.', 'View prints', 'active', 40);

-- Journal posts
INSERT INTO journal_posts (id, title, slug, description, main_image_url, body, status, sort_order) VALUES
(
  '88888888-8888-4888-8888-888888888801',
  'Workshops return to Peckham',
  'workshops-return-peckham',
  'Creative sessions are back at London Coffee Factory — open to anyone rebuilding through art, writing and photography.',
  '/workshops.png',
  'BrushPast workshops create space for people to make something real — without performing recovery or explaining their past.

This spring we are running sessions in Peckham focused on photography, zine-making and conversation. No experience needed. Everyone is welcome exactly as they are.

If you would like to join or host a session, get in touch through our contact page.',
  'active',
  50
),
(
  '88888888-8888-4888-8888-888888888802',
  'New prints from the archive',
  'new-prints-from-the-archive',
  'Limited edition prints from Errol and Bobby are now in The Archive Shop.',
  '/home-hero.png',
  'Two new giclée prints have joined Frame the Story — each linked to a lived experience and paid fairly to the creator.

Every purchase reinvests in workshops, mentoring and recovery organisations across the UK. Thank you for keeping these voices in circulation.',
  'active',
  40
),
(
  '88888888-8888-4888-8888-888888888803',
  'SOMETHING TO TAKE OFF THE EDGE',
  'something-to-take-off-the-edge',
  'BrushPast hosts a special performance with Stockwell Park Community Trust — Thursday, 2nd April 2026.',
  NULL,
  'Brushpast is delighted to announce our upcoming collaboration with the Stockwell Park Community Trust. On Thursday, 2nd April 2026, we are helping host a special performance of ''Something to Take Off the Edge'' by acclaimed performer Errol McGlashan.

The play explores the poignant and unexpected bond between two people in prison, offering a unique perspective on human connection in the toughest of circumstances.

Don''t miss out on this unforgettable evening of storytelling. Grab your tickets now before they''re all gone!',
  'active',
  60
),
(
  '88888888-8888-4888-8888-888888888804',
  'GROUNDSWELL x BRUSHPAST',
  'groundswell-x-brushpast',
  'Partnering with Groundswell and Yves — coffee boxes, storytelling and community at Canterbury Court.',
  NULL,
  'The art of empowerment is stronger when communities create together.

Partnering with Yves, whose work turns lived experience into powerful storytelling and with Groundswell - Homelessness Charity UK, bringing the voice of people affected by homelessness into everyday spaces through our Coffee Boxes.

We were very lucky to share a space at Canterbury Court and engage with the public to raise awareness to our causes.

Here are some photos of that day:',
  'active',
  65
),
(
  '88888888-8888-4888-8888-888888888805',
  'COTTON GARDENS PHOTOGRAPHY WORKSHOP',
  'cotton-gardens-photography-workshop',
  'GA Films and George Aponsah hosted a BRUSHPAST photography workshop with the Cotton Gardens Estate community, ages 4 to 80.',
  NULL,
  'Updated: Dec 9, 2025

GA Films, led by George Aponsah, hosted a BRUSHPAST photography workshop where participants from the Cotton Gardens Estate community, spanning ages 4 to 80, shared personal stories and captured meaningful photographs.

We also had a little girl named Eneh taking us with on her day.',
  'active',
  70
),
(
  '88888888-8888-4888-8888-888888888806',
  'Kettle Gallery',
  'kettle-gallery',
  'Kettle Gallery is coming soon — a guide to building your own frame and hanging the story where it belongs.',
  '/Kettle-Gallery.png',
  'Kettle Gallery is on its way — a new home for Frame the Story, where lived experience meets the wall.

You do not need a perfect studio or expensive kit to honour a print. Building your own frame is one of the simplest ways to slow down and give a story the attention it deserves.

Start with the measurements: leave a little breathing room around the artwork so it is not cramped against the glass. A basic wooden moulding, a hand saw, sandpaper and wood glue are enough for a clean, honest frame. Mitre the corners at 45 degrees, clamp while the glue sets, and finish with a stain or wax that suits your room.

Mount with acid-free tape or corners — never glue directly onto the print. Add backing board, secure the artwork, then fit the glass or acrylic. A hanging wire or sawtooth bracket on the back, and your piece is ready to live where conversation happens: above a kettle, beside a doorway, in the room where people pause.

That is the spirit behind Kettle Gallery — frames you can build, stories you can keep close. Coming soon to BrushPast.',
  'active',
  75
);

INSERT INTO journal_post_images (id, journal_post_id, image_url, sort_order) VALUES
('99999999-9999-4999-8999-999999999901', '88888888-8888-4888-8888-888888888801', '/workshops.png', 50),
('99999999-9999-4999-8999-999999999902', '88888888-8888-4888-8888-888888888801', '/home-hero.png', 40),
('99999999-9999-4999-8999-999999999903', '88888888-8888-4888-8888-888888888802', '(06-shop/print-errol-peckham.jpg)', 50),
('99999999-9999-4999-8999-999999999904', '88888888-8888-4888-8888-888888888802', '(06-shop/print-errol-peckham-frame.jpg)', 40);

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

INSERT INTO product_images (id, product_id, image_url, sort_order) VALUES
('66666666-6666-4666-8666-666666666601', '55555555-5555-4555-8555-555555555501', '(06-shop/wear-bobby-tee-back.jpg)', 40),
('66666666-6666-4666-8666-666666666602', '55555555-5555-4555-8555-555555555501', '(06-shop/wear-bobby-tee-detail.jpg)', 30),
('66666666-6666-4666-8666-666666666603', '55555555-5555-4555-8555-555555555502', '(06-shop/print-errol-peckham-frame.jpg)', 40),
('66666666-6666-4666-8666-666666666604', '55555555-5555-4555-8555-555555555503', '(06-shop/coffee-edition-lifestyle.jpg)', 40),
('66666666-6666-4666-8666-666666666605', '55555555-5555-4555-8555-555555555504', '(06-shop/gift-box-open.jpg)', 40),
('66666666-6666-4666-8666-666666666606', '55555555-5555-4555-8555-555555555505', '(06-shop/story-card-bobby-detail.jpg)', 40);

INSERT INTO product_variants (id, product_id, variant_name, inventory_type, inventory_quantity, sku, price_override, status, sort_order) VALUES
('77777777-7777-4777-8777-777777777701', '55555555-5555-4555-8555-555555555501', 'Size S', 'limited', 15, 'BP-TEE-S', NULL, 'active', 30),
('77777777-7777-4777-8777-777777777702', '55555555-5555-4555-8555-555555555501', 'Size M', 'limited', 20, 'BP-TEE-M', NULL, 'active', 40),
('77777777-7777-4777-8777-777777777703', '55555555-5555-4555-8555-555555555501', 'Size L', 'limited', 15, 'BP-TEE-L', NULL, 'active', 50);

INSERT INTO product_stories (product_id, story_id) VALUES
('55555555-5555-4555-8555-555555555501', '11111111-1111-4111-8111-111111111101'),
('55555555-5555-4555-8555-555555555502', '11111111-1111-4111-8111-111111111102'),
('55555555-5555-4555-8555-555555555503', '11111111-1111-4111-8111-111111111101'),
('55555555-5555-4555-8555-555555555504', '11111111-1111-4111-8111-111111111102'),
('55555555-5555-4555-8555-555555555505', '11111111-1111-4111-8111-111111111101');

INSERT INTO product_categories (product_id, category_id) VALUES
('55555555-5555-4555-8555-555555555501', '44444444-4444-4444-8444-444444444401'),
('55555555-5555-4555-8555-555555555502', '44444444-4444-4444-8444-444444444403'),
('55555555-5555-4555-8555-555555555503', '44444444-4444-4444-8444-444444444402'),
('55555555-5555-4555-8555-555555555504', '44444444-4444-4444-8444-444444444402'),
('55555555-5555-4555-8555-555555555505', '44444444-4444-4444-8444-444444444403');

INSERT INTO product_organisations (product_id, organisation_id) VALUES
('55555555-5555-4555-8555-555555555501', '22222222-2222-4222-8222-222222222201'),
('55555555-5555-4555-8555-555555555502', '22222222-2222-4222-8222-222222222204'),
('55555555-5555-4555-8555-555555555503', '22222222-2222-4222-8222-222222222204'),
('55555555-5555-4555-8555-555555555504', '22222222-2222-4222-8222-222222222201'),
('55555555-5555-4555-8555-555555555505', '22222222-2222-4222-8222-222222222202');
