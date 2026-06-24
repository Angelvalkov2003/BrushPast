# BrushPast — Supabase

## Fresh database (one file)

Supabase Dashboard → **SQL Editor** → paste and run:

**`final_db.sql`**

This file contains:

1. **Part 1 — Schema** — drops legacy tables and creates the full schema (stories, journal, shop, orders, inventory, RLS, Stripe helpers)
2. **Part 2 — Catalog seed** — organisations, stories, workshops, journal, products, variants, junction tables

**Warning:** Part 1 drops all app tables if they already exist.

To **refresh catalog only** (keep orders and contact messages), run only **Part 2** from `final_db.sql` (the section after `-- ########## PART 2: CATALOG SEED ##########`).

---

## Model

- **`stories`** — listing on `/stories` (title, image, quote, `page_url` → hand-coded page in app)
- **`journal_posts`** — `/journal`
- **`organisations`**, **`workshops`**, **`products`**, **`categories`**
- **`product_stories`** — links products to stories
- **`products.workshop_id`** — optional link to the workshop where a product was created
- **`orders.inventory_decremented_at`** — stock reserved when an order is placed

Story **pages** are in the app (`app/stories/…`, `lib/stories/*-content.ts`), not in the database body.

## Stripe

| Field | Purpose |
|-------|---------|
| `orders.order_number` | `BP-YYYYMMDD-######` |
| `stripe_checkout_session_id` | UNIQUE per Checkout Session |
| `stripe_webhook_events` | idempotent webhook |

App: `STRIPE_WEBHOOK_SECRET` → `POST /api/stripe/webhook`
