-- Optional checkout contribution (MAKE YOUR GIFT GO FURTHER)

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS optional_contribution_gbp NUMERIC(10, 2)
    CHECK (optional_contribution_gbp IS NULL OR optional_contribution_gbp >= 0),
  ADD COLUMN IF NOT EXISTS contribution_allocation TEXT
    CHECK (
      contribution_allocation IS NULL
      OR contribution_allocation IN (
        'support_creator',
        'fund_workshop',
        'where_needed'
      )
    );

COMMENT ON COLUMN orders.optional_contribution_gbp IS
  'Optional additional contribution added at checkout (GBP). Included in grand_total and Stripe.';
COMMENT ON COLUMN orders.contribution_allocation IS
  'Where the optional contribution should go: support_creator | fund_workshop | where_needed.';
