-- =============================================================================
-- BrushPast - final_db.sql
-- Run in Supabase Dashboard -> SQL Editor
--
-- Part 1: Full schema (drops legacy tables, creates all tables + RLS + functions)
-- Part 2: Catalog seed (truncates catalog only; keeps orders and messages)
--
-- WARNING: Part 1 drops ALL app tables if they exist.
-- To refresh catalog only, run Part 2 (from the catalog seed section).
-- =============================================================================

-- ########## PART 1: SCHEMA ##########
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
DROP TABLE IF EXISTS workshops CASCADE;
DROP TABLE IF EXISTS stories CASCADE;
DROP TABLE IF EXISTS organisations CASCADE;
DROP TABLE IF EXISTS creators CASCADE;
DROP TABLE IF EXISTS journal_post_images CASCADE;
DROP TABLE IF EXISTS journal_posts CASCADE;
DROP TABLE IF EXISTS newsletter_subscribers CASCADE;
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
-- Organisations (public listing; story pages remain hardcoded in the app)
-- =============================================================================
CREATE TABLE organisations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  image_url TEXT,
  short_description TEXT,
  location_label TEXT,
  slug TEXT UNIQUE,
  page_url TEXT,
  external_url TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  status content_status NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_organisations_slug ON organisations (slug) WHERE slug IS NOT NULL;
CREATE INDEX idx_organisations_status ON organisations (status);
CREATE INDEX idx_organisations_sort_order ON organisations (sort_order DESC);

-- =============================================================================
-- Stories (listing metadata; full story pages hardcoded in the app)
-- =============================================================================
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  slug TEXT UNIQUE,
  image_url TEXT,
  short_description TEXT,
  page_url TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  organisation_id UUID REFERENCES organisations (id) ON DELETE SET NULL,
  is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
  status content_status NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_stories_slug ON stories (slug) WHERE slug IS NOT NULL;
CREATE INDEX idx_stories_status ON stories (status);
CREATE INDEX idx_stories_sort_order ON stories (sort_order DESC);
CREATE INDEX idx_stories_tags ON stories USING GIN (tags);
CREATE INDEX idx_stories_organisation_id ON stories (organisation_id);

-- =============================================================================
-- Workshops (optional link to organisation)
-- =============================================================================
CREATE TABLE workshops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  slug TEXT UNIQUE,
  image_url TEXT,
  short_description TEXT,
  location_label TEXT,
  page_url TEXT,
  workshop_category TEXT,
  organisation_id UUID REFERENCES organisations (id) ON DELETE SET NULL,
  status content_status NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_workshops_slug ON workshops (slug) WHERE slug IS NOT NULL;
CREATE INDEX idx_workshops_status ON workshops (status);
CREATE INDEX idx_workshops_sort_order ON workshops (sort_order DESC);
CREATE INDEX idx_workshops_organisation_id ON workshops (organisation_id);

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
  organisation_id UUID REFERENCES organisations (id) ON DELETE SET NULL,
  workshop_id UUID REFERENCES workshops (id) ON DELETE SET NULL,
  status content_status NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products (slug);
CREATE INDEX idx_products_status ON products (status);
CREATE INDEX idx_products_sort_order ON products (sort_order DESC);
CREATE INDEX idx_products_organisation_id ON products (organisation_id);
CREATE INDEX idx_products_workshop_id ON products (workshop_id);

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
  inventory_decremented_at TIMESTAMPTZ,
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
-- Newsletter subscribers
-- =============================================================================
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'join-the-story',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT newsletter_subscribers_email_unique UNIQUE (email)
);

CREATE INDEX idx_newsletter_subscribers_created_at ON newsletter_subscribers (created_at DESC);
CREATE INDEX idx_newsletter_subscribers_source ON newsletter_subscribers (source);

-- =============================================================================
-- Journal posts
-- =============================================================================
CREATE TABLE journal_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  slug TEXT UNIQUE,
  description TEXT,
  main_image_url TEXT,
  body TEXT,
  status content_status NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_journal_posts_slug ON journal_posts (slug);
CREATE INDEX idx_journal_posts_status ON journal_posts (status);
CREATE INDEX idx_journal_posts_sort_order ON journal_posts (sort_order DESC);

CREATE TABLE journal_post_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  journal_post_id UUID NOT NULL REFERENCES journal_posts (id) ON DELETE CASCADE,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_journal_post_images_post ON journal_post_images (journal_post_id);
CREATE INDEX idx_journal_post_images_sort ON journal_post_images (journal_post_id, sort_order DESC);

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
  IF NEW.payment_status = 'paid' AND (OLD.payment_status IS DISTINCT FROM 'paid') AND NEW.inventory_decremented_at IS NULL THEN
    PERFORM decrement_inventory_for_order(NEW.id);
    UPDATE orders SET inventory_decremented_at = NOW() WHERE id = NEW.id;
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
CREATE TRIGGER organisations_updated_at BEFORE UPDATE ON organisations
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();
CREATE TRIGGER stories_updated_at BEFORE UPDATE ON stories
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();
CREATE TRIGGER workshops_updated_at BEFORE UPDATE ON workshops
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();
CREATE TRIGGER categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();
CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();
CREATE TRIGGER product_variants_updated_at BEFORE UPDATE ON product_variants
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();
CREATE TRIGGER journal_posts_updated_at BEFORE UPDATE ON journal_posts
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

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_post_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY journal_posts_public_read ON journal_posts
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY journal_post_images_public_read ON journal_post_images
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM journal_posts jp
      WHERE jp.id = journal_post_images.journal_post_id AND jp.status = 'active'
    )
  );

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;

CREATE POLICY stories_public_read ON stories
  FOR SELECT TO anon, authenticated
  USING (status = 'active' AND is_anonymous = FALSE);

CREATE POLICY organisations_public_read ON organisations
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY workshops_public_read ON workshops
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

ALTER TABLE product_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_organisations ENABLE ROW LEVEL SECURITY;

CREATE POLICY product_stories_public_read ON product_stories
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY product_organisations_public_read ON product_organisations
  FOR SELECT TO anon, authenticated
  USING (true);

-- orders / order_items: no anon policies (service role + admin only)
-- ########## PART 2: CATALOG SEED ##########
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
('22222222-2222-4222-8222-222222222201', 'London Coffee Factory', '(org-london-coffee-factory.jpg)', 'Creative hub and cafÃ© space in Peckham where BrushPast workshops and conversations happen.', 'Peckham, London', 'london-coffee-factory', '/organisations/london-coffee-factory', 'https://www.londoncoffeefactory.co.uk', 'active', 50),
('22222222-2222-4222-8222-222222222202', 'Groundswell', '(org-groundswell.jpg)', 'Homelessness charity partner for storytelling and health advocacy programmes.', 'UK-wide', 'groundswell', '/organisations/groundswell', 'https://www.groundswell.org.uk', 'active', 45),
('22222222-2222-4222-8222-222222222203', 'Koestler Arts', '(org-koestler-arts.jpg)', 'National charity supporting arts by people in the criminal justice system.', 'UK-wide', 'koestler-arts', '/organisations/koestler-arts', 'https://www.koestlerarts.org.uk', 'active', 40),
('22222222-2222-4222-8222-222222222204', 'Stockwell Park Community Trust', '(org-stockwell-park.jpg)', 'Local community trust hosting photography and creative workshops.', 'Stockwell, London', 'stockwell-park', '/organisations/stockwell-park', NULL, 'active', 35),
('22222222-2222-4222-8222-222222222205', 'DA Interventions', '(org-da-interventions.jpg)', 'Recovery and mentoring organisation linked to early intervention creative work.', 'UK-wide', 'da-interventions', '/organisations/da-interventions', NULL, 'active', 30);

-- Stories (listing metadata; full pages hardcoded in app at page_url)
INSERT INTO stories (id, title, slug, image_url, short_description, page_url, tags, organisation_id, is_anonymous, status, sort_order) VALUES
('11111111-1111-4111-8111-111111111101', 'Bobby', 'bobby', '/bobby.png', 'I don''t see myself as the product of my crime. I see myself as the product of my creativity.', '/stories/bobby', ARRAY['writing','painting','survival','creativity','art','recovery'], '22222222-2222-4222-8222-222222222201', FALSE, 'active', 50),
('11111111-1111-4111-8111-111111111102', 'Errol', 'errol', '/stories/ERROL/1.webp', 'My Kill List was really my Forgive Listâ€¦ I added my own name to it.', '/stories/errol', ARRAY['writing','photography','recovery','community-stories'], '22222222-2222-4222-8222-222222222204', FALSE, 'active', 45),
('11111111-1111-4111-8111-111111111103', 'Leon', 'leon', '(03-bobby/supporting-leon.jpg)', 'Small drawings on scraps of paper - a quiet record of rebuilding.', '/stories/leon', ARRAY['art','recovery'], '22222222-2222-4222-8222-222222222201', FALSE, 'active', 40),
('11111111-1111-4111-8111-111111111104', 'Ed Beerbohm', 'ed-beerbohm', '/stories/ED-BEERBOHM/1.jpg', 'My flat - my home - has itself become a canvas.', '/stories/ed-beerbohm', ARRAY['art','writing','recovery','film'], '22222222-2222-4222-8222-222222222203', FALSE, 'active', 35),
('11111111-1111-4111-8111-111111111105', 'Jamie', 'jamie', '/stories/JAMIE/1.png', 'This is not a sob story. I consider myself to be one of the very fortunate ones.', '/stories/jamie', ARRAY['photography','writing','recovery','community-stories'], '22222222-2222-4222-8222-222222222202', FALSE, 'active', 30),
('11111111-1111-4111-8111-111111111106', 'Christian', 'christian', '(02-stories/featured-christian.jpg)', 'Anonymous in public, loud on the page.', NULL, ARRAY['writing','recovery'], NULL, TRUE, 'active', 25),
('11111111-1111-4111-8111-111111111107', 'JR', 'jr', '/jr.png', 'I painted the word love because I needed something to hold onto.', '/stories/jr', ARRAY['art','recovery','community-stories'], '22222222-2222-4222-8222-222222222201', FALSE, 'active', 55),
('11111111-1111-4111-8111-111111111108', 'David', 'david', '/stories/david/1.webp', 'The Rooms of Recovery & Fellowship - from childhood bedrooms to prison cells to peace within.', '/stories/david', ARRAY['writing','recovery','community-stories'], '22222222-2222-4222-8222-222222222201', FALSE, 'active', 58),
('11111111-1111-4111-8111-111111111109', 'Maimouna', 'maimouna', '/stories/maimouna/1.webp', 'Sleeping pills offer a quick-and-easy fix - a song from @myteakultcha (Mighty Culture).', '/stories/maimouna', ARRAY['writing','music','recovery'], NULL, FALSE, 'active', 48),
('11111111-1111-4111-8111-111111111110', 'Chrissie', 'chrissie', '/stories/CHRISSIE/1.jpeg', 'Life is good and I am thankful.', '/stories/chrissie', ARRAY['writing','recovery','community-stories'], NULL, FALSE, 'active', 47),
('11111111-1111-4111-8111-111111111111', 'Rob', 'rob', '/stories/ROB''S-POEM/1.png', 'I am just a glitch in your perfect system.', '/stories/rob', ARRAY['writing','art','recovery','community-stories'], NULL, FALSE, 'active', 46),
('11111111-1111-4111-8111-111111111112', 'Eneh', 'eneh', '/stories/ENEH''S-DAY-IN-PHOTOS/1.jpg', 'Eneh took some pictures of her day and the things she likes.', '/stories/eneh', ARRAY['photography','community-stories'], NULL, FALSE, 'active', 44),
('11111111-1111-4111-8111-111111111113', 'Jeremy', 'jeremy', '/stories/Jeremy/1.webp', 'Hope can swim in the unlikeliest of places - a fish named Jeremy at Ohio State Prison.', '/stories/jeremy', ARRAY['writing','recovery','community-stories','art'], '22222222-2222-4222-8222-222222222201', FALSE, 'active', 59),
('11111111-1111-4111-8111-111111111114', 'Little George', 'little-george', '/stories/littleGeorge/1.webp', 'That light brings recovery - from daunting mornings to a glimpse away from the darkness of addiction.', '/stories/little-george', ARRAY['writing','recovery','community-stories'], '22222222-2222-4222-8222-222222222201', FALSE, 'active', 43),
('11111111-1111-4111-8111-111111111115', 'George', 'george', '/stories/george/1.webp', 'Painting with light - from rejected prints and Photoshop to an exhibition called Now and Then.', '/stories/george', ARRAY['photography','art','recovery','community-stories'], '22222222-2222-4222-8222-222222222201', FALSE, 'active', 42);

-- Workshops (listing metadata; full pages hardcoded in app at page_url)
INSERT INTO workshops (id, title, slug, image_url, short_description, location_label, page_url, workshop_category, organisation_id, status, sort_order) VALUES
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaa04', 'Workshop No.1', 'workshop-no-1', '/workshops/workshop-no-1/hero.jpg', 'Nine t-shirts, nine voices - the first chapter of the BrushPast archive at Edward Allsop Court.', 'Edward Allsop Court, London', '/workshops/workshop-no-1', 'T-Shirt Design', NULL, 'active', 60),
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaa01', 'T-Shirt Design - Peckham', 't-shirt-design-peckham', '/workshops.png', 'Screen-printing and design in a safe creative space.', 'Peckham, London', NULL, 'T-Shirt Design', '22222222-2222-4222-8222-222222222201', 'active', 50),
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaa02', 'Photography - Stockwell', 'photography-stockwell', '/workshops-hero.png', 'Disposable cameras, portraits and neighbourhood walks.', 'Stockwell, London', NULL, 'Photography', '22222222-2222-4222-8222-222222222204', 'active', 45),
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaa03', 'Storytelling & Zines', 'storytelling-zines', '/home-hero.png', 'Writing and zine-making for lived experience.', 'Peckham, London', NULL, 'Storytelling', '22222222-2222-4222-8222-222222222201', 'active', 40);

-- Shop categories
INSERT INTO categories (id, name, slug, image_url, short_description, shop_cta, status, sort_order) VALUES
('44444444-4444-4444-8444-444444444401', 'Wear it', 'wear-the-story', '(06-shop/wear-t-shirts.jpg)', 'T-shirts and apparel featuring original artwork from our community.', 'Explore apparel', 'active', 50),
('44444444-4444-4444-8444-444444444402', 'Drink it', 'drink-the-story', '(06-shop/coffee-editions.jpg)', 'Curated coffee editions with story cards - meaningful conversations.', 'Discover coffee', 'active', 45),
('44444444-4444-4444-8444-444444444403', 'Frame it', 'frame-the-story', '(06-shop/prints.jpg)', 'Prints and original artwork to keep a voice on your wall.', 'View prints', 'active', 40);

-- Journal posts
INSERT INTO journal_posts (id, title, slug, description, main_image_url, body, status, sort_order) VALUES
(
  '88888888-8888-4888-8888-888888888801',
  'Workshops return to Peckham',
  'workshops-return-peckham',
  'Creative sessions are back at London Coffee Factory - open to anyone rebuilding through art, writing and photography.',
  '/workshops.png',
  'BrushPast workshops create space for people to make something real - without performing recovery or explaining their past.

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
  'Two new giclÃ©e prints have joined Frame the Story - each linked to a lived experience and paid fairly to the creator.

Every purchase reinvests in workshops, mentoring and recovery organisations across the UK. Thank you for keeping these voices in circulation.',
  'active',
  40
),
(
  '88888888-8888-4888-8888-888888888803',
  'SOMETHING TO TAKE OFF THE EDGE',
  'something-to-take-off-the-edge',
  'BrushPast hosts a special performance with Stockwell Park Community Trust - Thursday, 2nd April 2026.',
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
  'Partnering with Groundswell and Yves - coffee boxes, storytelling and community at Canterbury Court.',
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
  'Kettle Gallery is coming soon - a guide to building your own frame and hanging the story where it belongs.',
  '/Kettle-Gallery.png',
  'Kettle Gallery is on its way - a new home for Frame the Story, where lived experience meets the wall.

You do not need a perfect studio or expensive kit to honour a print. Building your own frame is one of the simplest ways to slow down and give a story the attention it deserves.

Start with the measurements: leave a little breathing room around the artwork so it is not cramped against the glass. A basic wooden moulding, a hand saw, sandpaper and wood glue are enough for a clean, honest frame. Mitre the corners at 45 degrees, clamp while the glue sets, and finish with a stain or wax that suits your room.

Mount with acid-free tape or corners - never glue directly onto the print. Add backing board, secure the artwork, then fit the glass or acrylic. A hanging wire or sawtooth bracket on the back, and your piece is ready to live where conversation happens: above a kettle, beside a doorway, in the room where people pause.

That is the spirit behind Kettle Gallery - frames you can build, stories you can keep close. Coming soon to BrushPast.',
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
('55555555-5555-4555-8555-555555555501', 'Bobby Workshop Tee', 'bobby-workshop-tee', 'Screen-printed tee featuring artwork from Bobby''s workshop series.', 'Unisex organic cotton. Design from a T-Shirt Design workshop. 65% of profits reinvested with creators and partners.', '(06-shop/wear-bobby-tee.jpg)', 28.00, 'BP-001', 't-shirt', 'cotton screen print', 'https://brushpast.org/stories/bobby', NULL, NULL, '65% to creators and partners', 'Funds T-Shirt Design workshops', 'limited', 40, '180g', 'Sâ€“XL', 'active', 50),
('55555555-5555-4555-8555-555555555502', 'Errol - Peckham Morning', 'errol-peckham-morning', 'Limited giclÃ©e print by Errol McGlashan.', 'A3 archival print. Edition of 25. Supports photography workshops at Stockwell Park.', '(06-shop/print-errol-peckham.jpg)', 45.00, 'BP-014', 'print', 'giclÃ©e on paper', 'https://brushpast.org/stories/errol', '12', '25', 'Creator paid fairly on every sale', 'Supports Photography workshops', 'limited', 25, '350g', 'A3', 'active', 45),
('55555555-5555-4555-8555-555555555503', 'BrushPast Coffee Edition', 'brushpast-coffee-edition', 'Single-origin coffee with story card - Drink the Story.', '250g wholebean coffee roasted in the UK plus printed story card. Curated for conversation.', '(06-shop/coffee-edition.jpg)', 12.50, 'BP-003', 'coffee-edition', 'wholebean + story card', 'https://brushpast.org/stories/bobby', NULL, NULL, '65% reinvestment model', 'Supports London Coffee Factory programmes', 'unlimited', NULL, '480g', '250g bag', 'active', 40),
('55555555-5555-4555-8555-555555555504', 'Gift the Story Box', 'gift-the-story-box', 'Coffee gift box with story card and print insert.', 'Gift box: coffee edition, story card, and A5 print. Ideal for giving something real.', '(06-shop/gift-box.jpg)', 24.00, 'BP-010', 'gift-box', 'coffee + card + print', 'https://brushpast.org/stories/errol', NULL, NULL, '65% to creators and partners', 'Funds workshops and mentoring', 'unlimited', NULL, '620g', 'Box 24Ã—18Ã—8cm', 'active', 35),
('55555555-5555-4555-8555-555555555505', 'Story Card - Bobby', 'story-card-bobby', 'Pocket story card featuring Bobby''s artwork and quote.', 'Collectible story card - QR links to Bobby''s full story page.', '(06-shop/story-card-bobby.jpg)', 4.50, 'BP-022', 'story-card', 'printed card', 'https://brushpast.org/stories/bobby', NULL, NULL, 'Profits reinvested', 'Supports creative recovery workshops', 'unlimited', NULL, '15g', 'A6 card', 'active', 30);

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
