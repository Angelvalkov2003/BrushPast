-- Story tags for /stories filters (run once if schema already exists)
ALTER TABLE stories ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
CREATE INDEX IF NOT EXISTS idx_stories_tags ON stories USING GIN (tags);
