-- Stories: link to hand-built pages (run once in Supabase SQL Editor)
ALTER TABLE stories DROP COLUMN IF EXISTS full_description;
ALTER TABLE stories DROP COLUMN IF EXISTS sticky_quote;
ALTER TABLE stories DROP COLUMN IF EXISTS reflection_quote;
ALTER TABLE stories DROP COLUMN IF EXISTS location_label;
ALTER TABLE stories DROP COLUMN IF EXISTS story_year;
ALTER TABLE stories ADD COLUMN IF NOT EXISTS page_url TEXT;

-- Optional: set page URLs for existing seed stories
UPDATE stories SET page_url = '/stories/' || slug WHERE slug IS NOT NULL AND page_url IS NULL;
