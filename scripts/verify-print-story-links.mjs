/** Verify print → story links after catalog sync. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const env = Object.fromEntries(
  fs
    .readFileSync(path.join(root, ".env.local"), "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    }),
);

const EXPECTED = [
  { slug: "fish-might-talk", stories: ["ed-beerbohm"] },
  { slug: "beyond-the-walls", stories: ["ed-beerbohm"] },
  { slug: "sons-of-anarchy", stories: ["bobby"] },
  { slug: "alternative-vista", stories: ["ed-beerbohm"] },
  { slug: "sandra-print", stories: ["sandra", "karl"] },
  { slug: "jed-print", stories: ["jed", "karl"] },
  { slug: "mighty-culture", stories: ["maimouna"] },
  { slug: "human-beans", stories: ["bobby"] },
  { slug: "glimpses-of-light", stories: ["little-george"] },
];

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
const h = { apikey: key, Authorization: `Bearer ${key}` };

const products = await fetch(
  `${url}/rest/v1/products?select=id,slug&product_type=eq.print&status=eq.active`,
  { headers: h },
).then((r) => r.json());
const stories = await fetch(`${url}/rest/v1/stories?select=id,slug`, {
  headers: h,
}).then((r) => r.json());
const links = await fetch(`${url}/rest/v1/product_stories?select=product_id,story_id`, {
  headers: h,
}).then((r) => r.json());

const bySlug = new Map(products.map((p) => [p.slug, p]));
const storyById = new Map(stories.map((s) => [s.id, s.slug]));
let ok = true;
for (const exp of EXPECTED) {
  const p = bySlug.get(exp.slug);
  if (!p) {
    console.log("MISSING product", exp.slug);
    ok = false;
    continue;
  }
  const got = links
    .filter((l) => l.product_id === p.id)
    .map((l) => storyById.get(l.story_id))
    .filter(Boolean)
    .sort();
  const want = [...exp.stories].sort();
  if (JSON.stringify(got) !== JSON.stringify(want)) {
    console.log("MISMATCH", exp.slug, { got, want });
    ok = false;
  } else {
    console.log("ok", exp.slug, got.join(","));
  }
}
process.exit(ok ? 0 : 1);
