# BrushPast seed CSV (English)

Aligned with the client content brief: four shop collections, six creators, story–product links.

**Fastest:** run `reset-and-seed.sql` in **Supabase Dashboard → SQL Editor** (clears catalog + inserts everything in one go).

Or import via **Table Editor → Insert → Import data from CSV**.

**Fresh database:** import in this order (foreign keys):

1. `creators.csv`
2. `organisations.csv`
3. `categories.csv`
4. `stories.csv`
5. `products.csv`
6. `product_images.csv`
7. `product_creators.csv`
8. `product_categories.csv`
9. `product_stories.csv`
10. `product_organisations.csv`

**Re-import after old seed:** delete or truncate content tables first, or IDs will conflict.

Optional: `product_variants.csv` (after products).

## Content model (client brief)

| Layer | Seed file | Notes |
|-------|-----------|--------|
| Shop collections | `categories.csv` | Wear / Drink / Frame / Gift the Story |
| Product types | `products.product_type` | t-shirt, print, coffee-edition, gift-box, story-card, … |
| Creators | `creators.csv` | Bobby, Errol, Leon, Ed, Jamie, Christian |
| Stories | `stories.csv` | `page_url` → hand-built pages under `app/stories/…` |
| Links | `product_*` junction CSVs | Every product → creator + story + collection |

Tags on stories (`tags` column) match filters in `lib/stories-config.ts`: photography, writing, art, recovery, workshops, community-stories, limited-editions, coffee-editions, anonymous.

## Client image folders

Placeholders use the folder names the client will send assets in. When files arrive, upload to Cloudinary (or `public/`) and replace placeholders with full URLs.

| Folder | Use |
|--------|-----|
| `01-home/` | Founder hero, workshops, coffee/gift, lifestyle |
| `02-stories/` | Story landing + featured story imagery |
| `03-bobby/` | Bobby hero, gallery, supporting |
| `04-errol/` | Errol hero + supporting |
| `05-workshops/` | T-shirt, photography, creative, mentoring |
| `06-shop/` | Wear, prints, coffee, gift boxes |
| `07-about/` | About page |
| `08-journal/` | Journal (future) |
| `09-contact/` | Contact |

Example: `(06-shop/wear-bobby-tee.jpg)` → `https://res.cloudinary.com/…/wear-bobby-tee.jpg`

**Important:** Parentheses paths are not valid URLs. The storefront skips them until replaced. Invalid URLs break `next/image` if not sanitized (the app now guards against this).

## IDs

Fixed UUIDs so junction tables link correctly. Do not change IDs unless you update junction CSVs too.

## Status

All content rows use `active`. Set `draft` in admin to hide before launch.

## Stories not showing on `/stories`?

Admin shows stories but the public page is empty → missing **RLS policies** on `stories` / `creators`. Run once in SQL Editor:

`supabase/migrations/20260306120000_stories_public_rls.sql`
