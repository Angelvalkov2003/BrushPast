-- Karl Rudziak story — paste into Supabase SQL Editor and run.
-- Safe to re-run (upserts on slug).

INSERT INTO stories (
  id,
  title,
  slug,
  image_url,
  short_description,
  page_url,
  tags,
  organisation_id,
  is_anonymous,
  status,
  sort_order
) VALUES (
  '11111111-1111-4111-8111-111111111116',
  'Karl',
  'karl',
  '/stories/KARL/mohawk.jpg',
  'Every portrait begins with a conversation.',
  '/stories/karl',
  ARRAY['art', 'community-stories', 'portraiture'],
  NULL,
  FALSE,
  'active',
  57
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  image_url = EXCLUDED.image_url,
  short_description = EXCLUDED.short_description,
  page_url = EXCLUDED.page_url,
  tags = EXCLUDED.tags,
  is_anonymous = EXCLUDED.is_anonymous,
  status = EXCLUDED.status,
  sort_order = EXCLUDED.sort_order;
