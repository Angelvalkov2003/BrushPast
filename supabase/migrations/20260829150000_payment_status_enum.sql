-- Step 1: add enum values only (use in later migration / after commit on older PG).
ALTER TYPE payment_status ADD VALUE IF NOT EXISTS 'stripe_confirmed';
ALTER TYPE payment_status ADD VALUE IF NOT EXISTS 'received';
ALTER TYPE payment_status ADD VALUE IF NOT EXISTS 'cancelled';
