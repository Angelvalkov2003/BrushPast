-- BrushPast sponsors (Become a Sponsor on Get in Touch)
-- Incremental: run after 20260818150000_shop_boxes.sql

CREATE TYPE sponsor_tier AS ENUM (
  'supporter',
  'creative_ally',
  'project_backer',
  'visionary',
  'custom'
);

CREATE TYPE sponsor_payment_status AS ENUM (
  'pending',
  'paid',
  'failed',
  'refunded'
);

CREATE TABLE sponsors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT,
  email TEXT,
  amount_gbp NUMERIC(10, 2) NOT NULL CHECK (amount_gbp > 0),
  tier sponsor_tier NOT NULL,
  payment_status sponsor_payment_status NOT NULL DEFAULT 'pending',
  stripe_checkout_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT UNIQUE,
  privacy_policy_accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sponsors_created_at ON sponsors (created_at DESC);
CREATE INDEX idx_sponsors_payment_status ON sponsors (payment_status);
CREATE INDEX idx_sponsors_email ON sponsors (email);
CREATE UNIQUE INDEX idx_sponsors_stripe_session ON sponsors (stripe_checkout_session_id)
  WHERE stripe_checkout_session_id IS NOT NULL;

CREATE TRIGGER sponsors_updated_at
  BEFORE UPDATE ON sponsors
  FOR EACH ROW
  EXECUTE FUNCTION trg_set_updated_at();

ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
-- No anon policies: inserts/updates go through the app service role only.

COMMENT ON TABLE sponsors IS 'Get in Touch sponsorships. Pending until Stripe checkout.session.completed.';
