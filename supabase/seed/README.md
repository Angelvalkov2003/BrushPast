# Shop launch catalog

`shop-launch-catalog.csv` is a **template only**.

**Status: Waiting on data** — Jeremy has not supplied final SKUs, stock quantities, coffee list, or confirmed print size for all designs.

Until the spreadsheet is complete:

- Keep UI product image placeholders (`BoxImagePlaceholder` / `main_image_url = NULL`)
- Do **not** run a full catalog import against production
- Demo products in `final_db.sql` remain for local/dev only

When data arrives:

1. Fill every row in `shop-launch-catalog.csv`
2. Generate SQL from `shop-launch-import.template.sql`
3. Apply pair prices + `box_fixed_prices` migrations if not already applied
4. Archive demo products
5. Swap image URLs without changing slugs/SKUs
