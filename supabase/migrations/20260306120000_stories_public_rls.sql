-- Public read for stories, creators, organisations + product junction tables.
-- Run in Supabase SQL Editor if /stories listing is empty but admin shows active stories.

ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS creators_public_read ON creators;
CREATE POLICY creators_public_read ON creators
  FOR SELECT TO anon, authenticated
  USING (status = 'active' AND is_anonymous = FALSE);

DROP POLICY IF EXISTS organisations_public_read ON organisations;
CREATE POLICY organisations_public_read ON organisations
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

DROP POLICY IF EXISTS stories_public_read ON stories;
CREATE POLICY stories_public_read ON stories
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

-- Junction tables (story ↔ product links on public pages)
ALTER TABLE product_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_organisations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS product_stories_public_read ON product_stories;
CREATE POLICY product_stories_public_read ON product_stories
  FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS product_creators_public_read ON product_creators;
CREATE POLICY product_creators_public_read ON product_creators
  FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS product_organisations_public_read ON product_organisations;
CREATE POLICY product_organisations_public_read ON product_organisations
  FOR SELECT TO anon, authenticated
  USING (true);

ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS product_variants_public_read ON product_variants;
CREATE POLICY product_variants_public_read ON product_variants
  FOR SELECT TO anon, authenticated
  USING (
    status = 'active'
    AND EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_variants.product_id AND p.status = 'active'
    )
  );
