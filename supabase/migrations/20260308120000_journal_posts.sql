-- Journal posts (news / updates managed from admin)

CREATE TABLE IF NOT EXISTS journal_posts (
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

CREATE INDEX IF NOT EXISTS idx_journal_posts_slug ON journal_posts (slug);
CREATE INDEX IF NOT EXISTS idx_journal_posts_status ON journal_posts (status);
CREATE INDEX IF NOT EXISTS idx_journal_posts_sort_order ON journal_posts (sort_order DESC);

CREATE TABLE IF NOT EXISTS journal_post_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  journal_post_id UUID NOT NULL REFERENCES journal_posts (id) ON DELETE CASCADE,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_journal_post_images_post ON journal_post_images (journal_post_id);
CREATE INDEX IF NOT EXISTS idx_journal_post_images_sort ON journal_post_images (journal_post_id, sort_order DESC);

DROP TRIGGER IF EXISTS journal_posts_updated_at ON journal_posts;
CREATE TRIGGER journal_posts_updated_at BEFORE UPDATE ON journal_posts
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

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
