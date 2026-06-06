# BrushPast — Supabase

## Как да пуснеш миграцията

**Не** е „терминал в Supabase“. Правиш едно от двете:

### A) SQL Editor (най-лесно)

1. [Supabase Dashboard](https://supabase.com/dashboard) → проект → **SQL Editor**
2. **New query**
3. Копирай целия файл `migrations/brushpast_final.sql`
4. **Run** (или „Run and enable RLS“ — OK и двете, RLS вече е в скрипта)

### B) Supabase CLI (локален терминал)

```bash
cd d:\mine\BrushPast
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

(CLI чете файловете от `supabase/migrations/`. За чист старт ползвай само `brushpast_final.sql`; старите `20260301*` са placeholder-и.)

**Внимание:** `brushpast_final.sql` изтрива legacy таблици (`collections`, стари `orders` и т.н.) и създава схемата отново.

## Вече пуснал само първата миграция (без RLS)?

Пусни само секцията **RLS** от края на `brushpast_final.sql` (от `-- BrushPast RLS` надолу). Не пускай целия final отново — ще дропне данни.

## Stripe

| Field | Purpose |
|-------|---------|
| `orders.order_number` | `BP-20260301-000001` |
| `stripe_checkout_session_id` | UNIQUE — една поръчка на Checkout Session |
| `stripe_webhook_events` | idempotent webhook |

App: `STRIPE_WEBHOOK_SECRET` → `POST /api/stripe/webhook` (`checkout.session.completed`).

## Tables

See `content/dbprompt.md`.
