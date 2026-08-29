# BrushPast Shop Launch — Decisions, Gaps & Phase Plan

**Last updated:** 29 August 2026  
**Sources cross-referenced:**

| Source | Role |
|--------|------|
| **Current codebase** | What is built and wired today |
| **Alexandra (written brief, §1–11)** | Design/product specification |
| **Vasilena (PM conversation, 28 Aug)** | **Authoritative where it contradicts older assumptions or the brief** |
| **Client answers (29 Aug)** | Fixed prices, gift-box framing, BYO cart rules, extensible categories |

**Internal type IDs (keep in DB/code):** `a` = Next Chapter · `b` = Curated Pairings · `c` = Single Collection · `d` = Build Your Own

---

## Executive cross-analysis

### What the code already supports

| Area | Status | Key files |
|------|--------|-------------|
| Shop hub — 4 sections (desktop) | ✅ Layout matches brief intent | `components/shop/shop-gift-hub.tsx`, `lib/shop-hub-config.ts` |
| Box builder wizard (choose → review → message) | ✅ For `a`, `b`, `c` | `components/shop/box-builder/*`, `app/shop/box/*` |
| Cart `kind: "box"` + Stripe one line | ✅ | `lib/shop-box-cart.ts`, `components/cart/cart-context.tsx` |
| Stock / Out of stock per variant | ✅ | `lib/cart-stock.ts`, `components/product/variant-picker.tsx` |
| Admin — one box category per product | ✅ | `components/admin/admin-product-form.tsx` |
| Sponsor Stripe (one-off) | ✅ On `/contact#become-a-sponsor` | `components/contact/sponsor-impact.tsx`, `app/api/sponsor/checkout/` |
| DB: `box_pair_prices`, orders `box_type` / `gift_message` | ✅ Migration applied in repo | `supabase/migrations/20260818150000_shop_boxes.sql` |
| DB: `box_fixed_prices` (Next Chapter £70) | ⚠️ Migration in repo, **not read by app** | `supabase/migrations/20260828120000_box_fixed_prices.sql` |
| Cart content removal + partial reclassify | ⚠️ **Partial** | `lib/shop-box-cart.ts` → `recalcBoxCartItem`, `boxTypeAfterContentChange` |

### Where Alexandra's brief and Vasilena's PM notes align

| Topic | Alexandra (brief) | Vasilena (PM) | Code today |
|-------|-------------------|---------------|------------|
| Four distinct journeys | §2 — Single / Pairings / Next Chapter / BYO | Same four; **only D is free-form** | Hub OK; builders wrong (see below) |
| Single = one product type only | §2 — coffee **or** tee **or** print | Three separate rows; pick **design only** | `/shop/box/c` shows **all 3** categories |
| Curated Pairings = 3 fixed pairs | §2 — £40 / £47 / £58 | Fixed pairs; design only | Free 2-item picker; **Curator's Favourite** still in hub |
| Next Chapter = 3 categories | §2 — £70 fixed | Fixed box; design per category | Type `a` OK structurally; **SKU-sum pricing**, wrong name |
| Build Your Own | §2 — 2 or 3 items, −7%/−10%, duplicates | **Up to 3**, duplicates OK | Type `d` = coming soon; rules allow 9 items |
| Always gift packaging | §4 — no separate box upgrade | **No purchase without box** | Gift message + box cart exist; messaging inconsistent |
| 65% impact in shop | §5 | (not contradicted) | Constant in `lib/site-config.ts`; **not in shop journey** |
| Optional checkout contribution | §6 | (not contradicted) | **Not implemented** |
| Dedicated Sponsor page | §7 | (not contradicted) | Section on `/contact` only |
| Typography pass | §9 — Oswald, Stick No Bills, DIN, less cursive | (not contradicted) | Oswald + Inter + **Caveat** (`home-typography.ts`) |
| Placeholders until photography | §8 | (not contradicted) | `BoxImagePlaceholder` — correct approach |

### Where PM conversation **corrects or adds** to the written brief

| # | PM clarification | Effect on brief / code |
|---|------------------|------------------------|
| **PM-1** | Only **type D** allows free combination and quantity choices | Alexandra §2 BYO already implies this; **contradicts current type `b`** (free any-two picker) and **type `d` rules** (3 per category). **Fix:** lock `b` to `comboId` + 2 categories; only `d` uses open picker. |
| **PM-2** | Single Collection = **three separate entry rows** (coffee / tee / print), not one shared builder | Brief §2 says separate product families; code uses one `/shop/box/c` with hash anchors — **needs separate routes or category lock**, not just scroll-to-section. |
| **PM-3** | Curated Pairings = **exactly 3** pairs; customer picks **design only** | Brief matches; remove **Curator's Favourite** (not in brief). Hub links must pass `comboId`. |
| **PM-4** | Next Chapter = fixed coffee + tee + print; **design only** | Brief matches; rename Signature → **Next Chapter**, fixed **£70** (not SKU sum). |
| **PM-5** | Build Your Own = **up to 3 total**, duplicates allowed | Brief adds explicit **2-item (−7%) / 3-item (−10%)** tiers — PM did not repeat discount %; **keep Alexandra's discount rule** unless client says otherwise. |
| **PM-6** | **Cart re-classification:** removing 1 item from a 3-item box → auto downgrade type + price (e.g. Next Chapter → valid pairing), not delete/block | **Not in Alexandra brief.** Code has **minimal** rule: `a`/`d` unchanged; `b` → `c` when 1 item left (`boxTypeAfterContentChange`). **Needs full spec** (see § Risks). |
| **PM-7** | **No “without box” purchase** — even Single Collection is a gift box | Brief §4 aligns (packaging part of offer). Code treats singles as boxes in cart — **copy/UX must not imply bare product**. |
| **PM-8** | **T-shirt / print uniform pricing not confirmed** | Brief §2 lists fixed £35 / £28 / £15 — **blocked on PM confirmation**. Demo DB has mixed prices (£28 tee, £45 print, £12.50 coffee). |
| **PM-9** | **New product categories possible after New Year** | Brief §3 assumes three families only — **architecture must not hardcode exactly 3** in non-replaceable ways. Today: `BoxCategoryKey` union + `BOX_CATEGORY_ROWS` array — **extensible pattern needed**. |

---

## Потвърдени решения

Decisions we can treat as **locked** for implementation (no client reply required):

1. **Four shop journeys** remain the hub structure; no filters / complicated category system (Alexandra §2).
2. **Internal IDs** `a` / `b` / `c` / `d` stay in DB and code; **customer-facing names** change to Next Chapter / Curated Pairings / Single Collection / Build Your Own.
3. **Remove Curator's Favourite** from Curated Pairings (`SHOP_PAIR_OPTIONS` in `lib/shop-hub-config.ts`).
4. **Curated Pairings fixed combos** (when prices confirmed in DB/config):
   - Coffee + Print → £40 (`print-coffee`)
   - Coffee + T-shirt → £47 (`tshirt-coffee`)
   - T-shirt + Print → £58 (`print-tshirt`)
5. **Next Chapter (type `a`)** = exactly 1 coffee + 1 tee + 1 print; fixed **£70** list price (Alexandra §2); store in `box_fixed_prices`.
6. **Selection UX for A/B/C:** customer chooses **design (+ size for tees)** only; **no free mixing** outside type D (PM-1, PM-2, PM-3, PM-4).
7. **Build Your Own (type `d`):** only journey with **duplicate products** and **customer-chosen counts** up to 3 total (PM-5); Alexandra §2 adds **−7% (2 items) / −10% (3 items)** on retail sum.
8. **Single Collection (type `c`):** exactly **one** product from **one** category per purchase; separate entry points per category (PM-2).
9. **Gift message** remains in box builder before checkout (existing flow); **order notes** stay separate (`customer_note` vs `gift_message`).
10. **One basket + one checkout** for all shop options (Alexandra §6).
11. **Packaging:** no paid gift-box upgrade at launch (Alexandra §4); all purchases presented as gift propositions (PM-7).
12. **Impact copy baseline:** `65% of profits are reinvested…` exists in `lib/site-config.ts` (`PROFIT_REINVESTMENT`) — must surface in shop + checkout (Alexandra §5).
13. **Product images:** keep placeholders until photography (Alexandra §8); populate from Drive / Jira when supplied.
14. **Homepage copy:** do not rewrite until Jeremy confirms (Alexandra §8).
15. **Review dates:** substantial build for **2–3 Sep** review; launch window **10–17 Sep** (Alexandra §10).
16. **Stock:** per variant; OOS disabled (Alexandra §3) — already implemented.
17. **Sponsor payments:** Stripe one-off flow exists; page naming target **Sponsor** (Alexandra §7) — structural move can proceed; recurring/enquiry details pending brief only where not specified.

---

## Отворени точки след PM разговора

| ID | Topic | Alexandra | PM | Code | Blocker? |
|----|-------|-----------|-----|------|----------|
| O-1 | **Uniform SKU prices** (all tees £35? all prints £28?) | Fixed list prices | **Waiting confirmation** | Demo products differ | **Yes** — product import & single pricing mode |
| O-2 | **Build Your Own minimum** | Must be 2 or 3 (not 1) | “Up to 3” | Type `d` minTotal = 1 | Minor — align to min 2 unless client says 1 OK for D |
| O-3 | **Cart re-classification matrix** | Not specified | **Required behaviour** | Only `b→c` on remove | **Yes** — see § Risks & Q3 |
| O-4 | **Gift box visual parity** for Single vs multi-item boxes | Packaging included | Always a box | UI says “box” but not specified visually | **Yes** — Q2 |
| O-5 | **Future categories** (post–New Year) | Three families at launch | May add types | `BoxCategoryKey` hardcoded union | **Yes** — Q4 (architecture) |
| O-6 | **Checkout optional contribution** | §6 full spec | Not discussed | Not built | No for architecture; **yes for amounts/Stripe** if client changes suggested £5/£10/£20 |
| O-7 | **Sponsor recurring + partnership route** | §7 | Not discussed | One-off only | Partial — can scaffold `/sponsor` |
| O-8 | **Typography fonts** (Stick No Bills, DIN files) | §9 | Not discussed | Caveat + Inter | Font files / licensing |
| O-9 | **Homepage hierarchy** | §9 + hero 28 Aug | Not discussed | Stories-first hero | Figma map tomorrow |
| O-10 | **`comboId` on order header** when cart has multiple boxes | Silent | Silent | Only **first** box stored (`primaryBoxFromCart`) | Technical debt — document for multi-box orders |

---

## План по фази (с промени в код/файлове)

Legend: **🟢 can start now** · **🔴 blocked on client Q1–Q4**

### Phase 0 — Naming, config hygiene, hub cleanup 🟢

**Goal:** Align language and hub links without changing pricing logic yet.

| Change | Files |
|--------|-------|
| Rename labels: Complete → **Next Chapter**, Pair → **Curated Pairings**, Single → **Single Collection**, Custom → **Build Your Own** | `lib/shop-box-config.ts` (`boxTypeLabel`, `BOX_HUB_CARDS`, `boxTypeIntro`), `lib/shop-hub-config.ts`, `components/shop/shop-gift-hub.tsx`, admin order page |
| Remove **Curator's Favourite** | `lib/shop-hub-config.ts` → `SHOP_PAIR_OPTIONS` |
| Rename hub section “Signature gift box” → **Next Chapter** + supporting copy “One gift. Two impacts.” | `lib/shop-hub-config.ts` (`SHOP_SIGNATURE`), `shop-gift-hub.tsx` |
| Set `PAIR_PRICES_GBP` to £40/£47/£58 (mirror DB) | `lib/shop-box-pricing.ts` |
| Run pair price SQL on live DB | `supabase/seed/shop-launch-import.template.sql` §A, `box_pair_prices` |
| Add customer-facing constants file (display names, fixed prices reference) | New: `lib/shop-launch-copy.ts` (optional consolidation) |

**Not in Phase 0:** switching pricing engine to fixed modes (Phase 2–4).

---

### Phase 1 — Single Collection (type `c`) 🟢

**Goal:** Three isolated flows; one category visible per journey.

| Change | Files |
|--------|-------|
| Routes: `/shop/box/c/coffee`, `/shop/box/c/tshirt`, `/shop/box/c/print` (or query `?category=coffee`) | New pages under `app/shop/box/c/`, update `shop-hub-config.ts` hrefs |
| Builder: accept `lockedCategory: BoxCategoryKey`; hide other `BoxCategorySection`s | `box-builder.tsx`, `box-category-section.tsx` |
| Hub: three Single rows link to **separate** URLs (not hash on shared page) | `lib/shop-hub-config.ts` |
| Mobile hub: add coffee / tee / print entries or keep 2 cards + “see all” — **match Figma when ready** | `shop-gift-hub.tsx`, `SHOP_MOBILE_BOX_CARDS` |
| Pricing mode: prepare `priceMode: "category-fixed"` with constants £15 / £35 / £28 | `lib/shop-box-config.ts`, `lib/shop-box-pricing.ts` |

🔴 **Apply fixed £15/£35/£28 at checkout** only after **Q1** (uniform vs per-design pricing).

---

### Phase 2 — Curated Pairings (type `b`) 🟢

**Goal:** Fixed pair structure; design-only selection.

| Change | Files |
|--------|-------|
| Hub links: `/shop/box/b?combo=print-coffee` etc. | `lib/shop-hub-config.ts` |
| Builder init: read `comboId`, set `draft.comboId`, show **only** the two category sections | `box-builder.tsx`, `lib/shop-box-rules.ts` |
| Switch type `b` to `priceMode: "pair-lookup"` | `lib/shop-box-config.ts`, `lib/shop-box-pricing.ts` |
| Load pair prices from DB at runtime (fallback to `PAIR_PRICES_GBP`) | New: `lib/supabase/box-prices.ts` |
| Remove free any-two copy from `boxTypeIntro("b")` | `lib/shop-box-config.ts` |
| Persist `box_combo_id` on order | Already in `checkout-orders.ts` — ensure `comboId` set before checkout |

🔴 Fixed £40/£47/£58 enforcement if O-1 reveals per-design exceptions.

---

### Phase 3 — Next Chapter (type `a`) 🟢

**Goal:** Three category sections (already correct); fixed £70 price.

| Change | Files |
|--------|-------|
| `priceMode: "fixed-box"` for type `a` | `lib/shop-box-config.ts` |
| Read `box_fixed_prices` where `box_type = 'a'` | `lib/shop-box-pricing.ts`, `lib/supabase/box-prices.ts` |
| Apply migration on live DB | `supabase/migrations/20260828120000_box_fixed_prices.sql` |
| Hub + builder titles/copy | `shop-hub-config.ts`, `box-builder.tsx` |

---

### Phase 4 — Build Your Own (type `d`) 🟢 (logic) · 🔴 (discounts if pricing model unclear)

**Goal:** Open picker; max **3 items total**; duplicates; quantity increments.

| Change | Files |
|--------|-------|
| Replace type `d` rules: `maxTotal: 3`, `maxPerCategory: 3`, allow duplicate lines | `lib/shop-box-config.ts`, `lib/shop-box-rules.ts` |
| Ship builder on `/shop/box/d` (remove coming-soon stub) | `app/shop/box/[type]/page.tsx` |
| UI: “X of 3 selected”, block 4th add | `box-summary-bar.tsx`, `box-builder.tsx` |
| `priceMode: "sku-sum-discount"` — 2 items −7%, 3 items −10% | `lib/shop-box-pricing.ts` |
| Distinct step copy vs Next Chapter | `boxTypeIntro("d")`, hub `SHOP_BUILD_OWN` |

---

### Phase 5 — Impact message + optional checkout contribution 🟢 (impact) · 🔴 (contribution Stripe line)

| Change | Files |
|--------|-------|
| Shop banner: 65% + “Your purchase already gives back…” | New component e.g. `components/shop/shop-impact-banner.tsx`; mount in `shop-gift-hub.tsx`, box builder |
| Checkout contribution UI: £5 / £10 / £20 / Other + allocation radios | `app/checkout/page.tsx` |
| Order schema: `optional_contribution_gbp`, `contribution_allocation` | New migration; `lib/supabase/checkout-orders.ts`, `lib/types.ts` |
| Stripe extra line item | `app/api/checkout/create-session/route.ts`, `lib/stripe.ts` |
| Success copy | `app/checkout/success/page.tsx` |
| Email receipt mention | `lib/email.ts` |

Alexandra §6 spec is clear — **can proceed** unless client changes amounts; not blocked by Q1–Q4.

---

### Phase 6 — Sponsor page 🟢 (structure) · partial (recurring)

| Change | Files |
|--------|-------|
| New route `/sponsor` | `app/sponsor/page.tsx` |
| Move `SponsorImpact` from contact | `components/contact/sponsor-impact.tsx` → or shared import |
| Nav: Sponsor link (desktop + mobile) | `navbar-client.tsx`, `mobile-menu.tsx` |
| Partnership enquiry: separate form block / `/contact?subject=partnership` | `lib/contact-config.ts`, contact form |
| Recurring Stripe (if confirmed) | `lib/stripe-sponsors.ts`, new API routes |

---

### Phase 7 — Homepage & typography 🟢 (Oswald cleanup) · 🔴 (Stick No Bills / DIN until assets)

| Change | Files |
|--------|-------|
| Homepage section reorder per Figma (gift boxes up) | `app/page.tsx`, new `components/home/home-gift-boxes-teaser.tsx` |
| Hero image swap (28 Aug asset) | `components/home/home-hero.tsx` |
| Reduce Caveat: replace `bpWhisperUtility` / `homeHandClass` on shop/checkout | grep + targeted edits |
| Add Stick No Bills + DIN when licensed | `home-typography.ts`, `globals.css` |
| Mount unused `home-impact.tsx` or merge into new shop teaser | `components/home/home-impact.tsx` |

---

### Phase 8 — Products & images 🔴 (blocked on Q1 + catalog spreadsheet)

| Change | Files |
|--------|-------|
| Fill `supabase/seed/shop-launch-catalog.csv` | Jeremy / PM |
| Generate SQL from CSV (script or manual) | `supabase/seed/shop-launch-import.template.sql` |
| 16× tee products + 4 size variants each | `products`, `product_variants`, `product_categories` |
| 8× print products | same |
| Coffee SKUs when confirmed | same |
| Archive demo seed products | optional UPDATE in seed template |
| Swap placeholders → real URLs | `main_image_url`, no slug changes |

---

### Phase 9 — Testing (Alexandra §11)

Execute before **2–3 Sep** review:

- Desktop + mobile layouts, nav links
- Each Single Collection path (coffee / tee / print only)
- All 3 pairings with correct categories + fixed price
- Next Chapter: 3 picks, £70
- Build Your Own: 2 and 3 items, duplicates, discount math, max 3 cap
- **Cart re-classification scenarios** (once spec approved — Q3)
- Stock / OOS on tee sizes and print designs
- Basket updates, Stripe, webhooks
- Optional checkout contribution + Sponsor payment
- Confirmation emails / receipts
- Cancelled payment / validation failures

---

### Phase 10 — Cart re-classification (cross-cutting) 🔴 blocked on Q3

**Current behaviour** (`lib/shop-box-cart.ts`, `lib/shop-box-rules.ts`):

```
removeBoxContentItem → recalcBoxCartItem
  → boxTypeAfterContentChange(type, remainingCount)
       if type === 'b' && count === 1 → 'c'
       else → unchanged type
  → priceOfBox(newType, contents, comboId)
```

**Gaps vs PM-6:**

| From type | Items after remove | Expected (TBD) | Code today |
|-----------|-------------------|----------------|------------|
| `a` (3 items) | 2 items matching a valid pair | Downgrade to `b` + correct `comboId` + pair price | Stays `a`, wrong price |
| `a` | 1 item | Downgrade to `c` + single price | Stays `a`, wrong price |
| `b` | 1 item | Downgrade to `c` | ✅ `b→c` |
| `d` (3 items) | 2 items | Downgrade to `d` with 2-item −7% **or** to `b` if matches a pair? | Stays `d` |
| `d` | 1 item | Downgrade to `c`? | Stays `d` |
| Any | 0 items | Remove cart line | ✅ returns `null` |

**Implementation target (after spec):**

| File | Change |
|------|--------|
| `lib/shop-box-rules.ts` | New `inferBoxTypeFromContents(items): { type, comboId? }` |
| `lib/shop-box-cart.ts` | `recalcBoxCartItem` uses inference + repricing |
| `components/cart/modal.tsx` | UX copy when box “transforms” (toast or inline) |
| `lib/shop-box-pricing.ts` | All price modes in one `priceOfBox` path |

---

## Рискове / технически решения, които трябват спецификация

### R-1 — Cart re-classification (PM-6, not in written brief)

**Problem:** Customer removes one line from a multi-item box in the cart. PM expects **automatic downgrade** to the highest valid lower box type with **recalculated price**, not deletion or checkout block.

**Open design choices:**

1. **Priority when 2 items remain after removing from Next Chapter:** always map to the **unique** matching Curated Pairing, or allow Build Your Own 2-item −7% if contents don’t match a official pair?
2. **Build Your Own → Pairing:** if 2 items exactly match coffee+print etc., use **pair fixed price** (£40) or **BYO −7%** on sum? (Different amounts possible.)
3. **`comboId` inference:** derive from category keys present, or require original purchase journey metadata?
4. **UX:** silent repricing vs explicit “Your box is now a Curated Pairing (£47)” message?
5. **Order audit:** store final `box_type` / `box_combo_id` at checkout only, or log reclassification events?

**Recommendation until Q3 answered:** implement inference table in `lib/shop-box-rules.ts` as pure function + unit-test matrix; wire cart only after client signs off.

---

### R-2 — Category model extensibility (PM-9)

**Problem:** `BoxCategoryKey = "coffee" | "tshirt" | "print"` is a TypeScript union across ~15 files.

**Recommendation (after Q4):**

- Short term: keep union for launch; load **display order + slug map** from `BOX_CATEGORY_ROWS` / DB categories table.
- Medium term: `box_category_key TEXT` without enum; box rules reference `category_id` FK.
- Avoid: switch statements on three literals in UI components — use config-driven loops (already partially done in `BOX_CATEGORY_ROWS`).

---

### R-3 — Pricing source of truth

Three layers exist today:

| Layer | Location | Used by app? |
|-------|----------|--------------|
| Product `price_gbp` / variant | `products`, `product_variants` | ✅ SKU sum |
| `box_pair_prices` | DB | ❌ (constants null in TS) |
| `box_fixed_prices` | DB migration | ❌ |

**Target:** single loader `getBoxPricingConfig()` from Supabase; TS constants as dev fallback only.

---

### R-4 — Multiple boxes in one order

`primaryBoxFromCart()` writes one `box_type` on order header. If customer buys two boxes, metadata is lossy. **Launch assumption:** allow multiple cart lines but document limitation; or restrict to one box per order until schema supports `order_boxes` child table.

---

### R-5 — Alexandra §2 vs PM on Build Your Own discounts

Alexandra specifies **−7% / −10%**. PM specifies **up to 3 items + duplicates** only. **Working assumption:** both apply; no contradiction. If client wants pair fixed prices when BYO happens to match a pair, that overlaps R-1/Q3.

---

## Implementation guardrail

**Do not implement** (pricing modes, product import, cart inference matrix, category architecture refactor) until the four client questions below are answered.

**Safe to implement immediately:** Phase 0; Phase 1 routing/category lock (with SKU-sum fallback); Phase 2 structure + combo routing; Phase 3 fixed £70 wiring; Phase 4 builder shell; impact copy component; Curator removal; Sponsor route scaffold; typography audit list.

---

## Confirmed answers (29 Aug 2026)

| Question | Decision |
|----------|----------|
| **Q1 Pricing** | Fixed by category: coffee **£15**, t-shirt **£35**, print **£28**. Pairings **£40 / £47 / £58**. Next Chapter **£70**. Prices do **not** vary by design. |
| **Q2 Gift box** | Gift-box concept applies to **Single Collection** too — no paid packaging upgrade. Singles may use a smaller appropriate box. |
| **Q3 Cart (BYO)** | BYO 3→2 stays BYO with **−7%**. One item remaining → **full single category price** (reclass to Single Collection). |
| **Q4 Categories** | Leave extensible via config/`BOX_CATEGORY_ROWS`; no hard rewrite required for post–New Year types. |

See implementation in `lib/shop-box-config.ts`, `lib/shop-box-pricing.ts`, `lib/shop-box-rules.ts`, `/sponsor`.


### Question 1 — Product pricing consistency (Single Collection & catalog import)

Alexandra’s brief lists fixed Single Collection prices (**Coffee £15, T-shirt £35, Art print £28**), while Vasilena noted that **uniform pricing across all t-shirt designs and all print designs is not yet confirmed**. Before we import the launch catalog and switch Single Collection to fixed box pricing, please confirm: **(a)** Will every t-shirt design sell at the same £35 and every print at the same £28 at launch, regardless of design? **(b)** If not, should Single Collection still show one fixed price per category (with internal SKU differences absorbed), or should the customer see the specific design’s price? **(c)** For Curated Pairings (£40 / £47 / £58) and Next Chapter (£70), are these always the checkout price regardless of which designs are chosen? This determines our product seed data, `price_gbp` values, and whether we use category-fixed vs SKU-sum modes.

### Question 2 — “Always a gift box” — customer-facing promise

Vasilena confirmed there is **no option to buy without gift packaging**, and Alexandra’s brief treats all four journeys as gift propositions with no separate packaging upgrade. Please confirm what the customer should **see and read** for **Single Collection** (one coffee, one tee, or one print): is it the same branded kraft gift box experience as pairs and Next Chapter, and should the website always say **“gift box”** (not “product only”) in headings, cart, and order confirmation? Any difference in copy or photography between a single-item box and a multi-item box should be spelled out so we do not imply a lesser offer for singles.

### Question 3 — Cart behaviour when a customer removes an item from a multi-item box

When a customer edits the bag and **removes one product from a 3-item Next Chapter box** (or reduces a Build Your Own selection), Vasilena expects the order to **automatically reclassify** to the correct lower box type (e.g. Next Chapter → matching Curated Pairing, or down to Single Collection) with an **updated price**, rather than blocking checkout or deleting the whole box. This behaviour is **not detailed in the written brief**. Please confirm the rules we should implement: **(a)** When two remaining items match an official pairing, do we always apply the **fixed pairing price** (£40 / £47 / £58)? **(b)** When two items do not match any official pair (possible only from Build Your Own today), do we use **Build Your Own −7%** or something else? **(c)** When one item remains, does it always become **Single Collection** at £15 / £35 / £28? **(d)** Should the customer see an explicit message when the box type and price change in the cart? A simple decision table (remaining categories → box type → price rule) will be enough for us to build and test this.

### Question 4 — Future product categories beyond coffee, t-shirt, and print

Vasilena mentioned that **new product types may be added after New Year**. At launch we will ship exactly three families, but we want the shop architecture to stay maintainable. Please confirm: **(a)** For the September launch, is it acceptable that box logic is configured for **coffee, t-shirt, and print only**, as long as adding a fourth category later does not require a full rewrite? **(b)** When new categories appear, will they join **Build Your Own** only, or could they also appear in new **Curated Pairings / Next Chapter** box definitions? **(c)** Who will own ongoing updates to box combinations and fixed prices — admin UI, or developer/config updates? Your answers define whether we keep category rules in database config vs hardcoded TypeScript for launch.

---

## Appendix — File index (shop launch)

| Concern | Primary files |
|---------|---------------|
| Box types & rules | `lib/shop-box-config.ts`, `lib/shop-box-rules.ts`, `lib/shop-box-pricing.ts` |
| Hub copy & links | `lib/shop-hub-config.ts`, `components/shop/shop-gift-hub.tsx` |
| Builder UI | `components/shop/box-builder/*` |
| Routes | `app/shop/page.tsx`, `app/shop/box/c/page.tsx`, `app/shop/box/[type]/page.tsx` |
| Cart & reclassify | `lib/shop-box-cart.ts`, `components/cart/cart-context.tsx`, `components/cart/modal.tsx` |
| Checkout | `app/checkout/page.tsx`, `app/checkout/actions.ts`, `app/api/checkout/create-session/route.ts` |
| Admin categories | `components/admin/admin-product-form.tsx`, `app/admin/(protected)/products/actions.ts` |
| DB | `supabase/migrations/20260818150000_shop_boxes.sql`, `20260828120000_box_fixed_prices.sql`, `supabase/seed/shop-launch-import.template.sql`, `shop-launch-catalog.csv` |
| Impact copy | `lib/site-config.ts` (`PROFIT_REINVESTMENT`) |
| Sponsor | `lib/sponsor-config.ts`, `components/contact/sponsor-impact.tsx`, `app/api/sponsor/checkout/route.ts` |
| Typography | `components/home/home-typography.ts`, `app/globals.css`, `public/fonts/README.md` |
| Homepage | `app/page.tsx`, `components/home/home-gift-boxes.tsx`, `components/home/*` |
| Checkout contribution | `lib/checkout-contribution.ts`, `components/checkout/checkout-contribution.tsx`, migration `20260829140000_checkout_contribution.sql` |

---

## Final status (pre 2–3 Sep review) — 29 Aug 2026

| Item | Status | Notes |
|------|--------|-------|
| Shop journey renames + hub (4 sections) | **Done** | Next Chapter / Curated Pairings / Single Collection / Build Your Own |
| Remove Curator's Favourite | **Done** | |
| Single Collection category-locked routes | **Done** | `/shop/box/c?category=` + chooser when missing |
| Curated Pairings combo-locked + £40/£47/£58 | **Done** | App constants; run DB pair price UPDATE on live |
| Next Chapter £70 fixed | **Done** | App `NEXT_CHAPTER_PRICE_GBP`; apply `box_fixed_prices` migration on live |
| Build Your Own max 3, duplicates, −7%/−10% | **Done** | `/shop/box/d` live |
| Cart reclassification (BYO 3→2 −7%; 1→ single price) | **Done** | `inferBoxFromContents` + `recalcBoxCartItem` |
| 65% impact banner on shop | **Done** | |
| `/sponsor` page (Figma structure + Stripe one-off) | **Done** | Nav + contact redirect |
| Optional checkout contribution £5/£10/£20/Other + allocation | **Done** | Same Stripe session line item; thank-you + emails |
| Homepage gift boxes hierarchy | **Done** | `HomeGiftBoxes` after hero; copy unchanged |
| Typography: Oswald more, less cursive, Stick No Bills | **Done** | Caveat kept for story voice; DIN awaits font files |
| DIN font files | **Waiting on data** | Drop into `public/fonts/` — see README |
| Design-system consistency (shop/sponsor/checkout) | **Done** | Shared tokens, Oswald CTAs, IndexCard/Polaroid, no dark: checkout |
| Product catalog import (16 tees / 8 prints / coffee) | **Waiting on data** | CSV template only — `supabase/seed/README.md` |
| Product photography | **Waiting on data** | Placeholders remain |
| Homepage hero final image (28 Aug) | **Waiting on data** | Keep `/home-hero.png` until swap |
| Sponsor recurring contributions | **Blocked** | Not specified beyond one-off; one-off Done |
| Live DB migrations apply | **Waiting on ops** | Run: boxes, fixed prices, contribution columns |
| Full Stripe E2E + email delivery QA | **Manual QA** | See checklist below — code path verified via `pnpm build` |

---

## Test checklist results (29 Aug)

Legend: ✅ code/build verified · 🟡 needs manual browser/Stripe · ❌ fail · ⏸ blocked on data

| Test | Result | Notes |
|------|--------|-------|
| `pnpm build` | ✅ | Passes |
| Desktop/mobile layout compile | ✅ | Routes present |
| Nav + Sponsor link | ✅ | Desktop + mobile |
| Single Collection coffee/tee/print only | 🟡 | Logic locks categories — manual click-through |
| 3 fixed pairings + prices | 🟡 | Combo routes + `PAIR_PRICES_GBP` |
| Next Chapter 3 picks + £70 | 🟡 | Manual |
| BYO 2/3 items, duplicates, discounts | 🟡 | Manual |
| BYO cart remove → −7% / single price | 🟡 | `inferBoxFromContents` unit path via cart |
| Stock / Out of stock | ✅ | Existing variant stack unchanged |
| Basket + Stripe line items | 🟡 | Needs live Stripe keys |
| Optional contribution + allocation in Stripe | 🟡 | Wired in `createCheckoutSession` |
| Sponsor one-off payment | 🟡 | Manual |
| Sponsor recurring | ⏸ | Out of scope until specified |
| Partnership enquiry | ✅ | `/contact#contact-form` |
| Confirmation screens | ✅ | Success copy for contribution |
| Confirmation emails | ✅ | Admin + customer receipt include contribution |
| Form validation | 🟡 | Manual |
| Cancelled payment | ✅ | `/checkout/cancel` route exists |
| Catalog products live | ⏸ | Waiting on Jeremy CSV |

**Manual QA owner before 2–3 Sep:** run Stripe test mode through one Single, one Pairing, Next Chapter, BYO, contribution, and Sponsor pledge; confirm Resend delivery.
