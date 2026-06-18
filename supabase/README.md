# BrushPast — Supabase

## Fresh database (2 steps)

### 1. Schema

Supabase Dashboard → **SQL Editor** → paste and run:

`migrations/20260601000000_brushpast_schema.sql`

This **drops all legacy tables** and creates the full schema (stories, journal, shop, orders, RLS).

CLI alternative:

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

### 2. Data import

SQL Editor → run:

`data.sql`

Inserts organisations, stories, workshops, journal posts, products, and junction tables. Safe to re-run (truncates catalog only; keeps orders and contact messages).

---

## Files

| File | Purpose |
|------|---------|
| `migrations/20260601000000_brushpast_schema.sql` | **Only migration** — schema + RLS |
| `data.sql` | **Catalog import** — stories, journal, shop, workshops, … |

## Model

- **`stories`** — listing on `/stories` (title, image, quote, `page_url` → hand-coded page in app)
- **`journal_posts`** — `/journal`
- **`organisations`**, **`workshops`**, **`products`**, **`categories`**
- **`product_stories`** — links products to stories

Story **pages** are in the app (`app/stories/…`, `lib/stories/*-content.ts`), not in the database body.

## Stripe

| Field | Purpose |
|-------|---------|
| `orders.order_number` | `BP-YYYYMMDD-######` |
| `stripe_checkout_session_id` | UNIQUE per Checkout Session |
| `stripe_webhook_events` | idempotent webhook |

App: `STRIPE_WEBHOOK_SECRET` → `POST /api/stripe/webhook`
