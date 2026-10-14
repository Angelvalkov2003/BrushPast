import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function loadEnvLocal() {
  const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return env;
}

const EXPECTED = [
  { slug: "hope", stories: [], workshop: "workshop-no-1" },
  { slug: "pollen-ate", stories: ["ed-beerbohm"] },
  { slug: "fish-out-of-water", stories: ["ed-beerbohm"] },
  { slug: "alternative-vista", stories: ["ed-beerbohm"] },
  { slug: "fish-might-chat", stories: ["ed-beerbohm"] },
  { slug: "beyond-the-walls", stories: ["ed-beerbohm"] },
  { slug: "human-beans", stories: ["bobby"] },
  { slug: "sons-of-anarchy", stories: ["bobby"] },
  { slug: "chemistry", stories: ["maimouna"] },
  { slug: "mighty-culture", stories: ["maimouna"] },
  { slug: "sandra-print", stories: ["sandra", "karl"], title: "Sandra" },
  { slug: "jed-print", stories: ["jed", "karl"] },
  { slug: "glimpse-of-light", stories: ["little-george"] },
];

const env = loadEnvLocal();
const sb = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

async function main() {
  const { data: products, error } = await sb
    .from("products")
    .select(
      "id, slug, title, main_image_url, workshop_id, product_type, status, qr_story_url",
    )
    .eq("product_type", "print")
    .order("slug");
  if (error) throw error;

  const { data: stories } = await sb.from("stories").select("id, slug");
  const storyById = Object.fromEntries((stories ?? []).map((s) => [s.id, s.slug]));

  const { data: workshops } = await sb.from("workshops").select("id, slug");
  const wsById = Object.fromEntries((workshops ?? []).map((w) => [w.id, w.slug]));

  const { data: links } = await sb
    .from("product_stories")
    .select("product_id, story_id");
  const linksByProduct = {};
  for (const l of links ?? []) {
    (linksByProduct[l.product_id] ||= []).push(storyById[l.story_id]);
  }

  const bySlug = Object.fromEntries((products ?? []).map((p) => [p.slug, p]));

  console.log("=== Jeremy checklist ===\n");
  for (const exp of EXPECTED) {
    const p = bySlug[exp.slug];
    if (!p) {
      console.log(`FAIL ${exp.slug}: PRODUCT MISSING`);
      continue;
    }
    const linked = (linksByProduct[p.id] || []).filter(Boolean).sort();
    const want = [...exp.stories].sort();
    const ws = p.workshop_id ? wsById[p.workshop_id] : null;
    const imgOk = p.main_image_url
      ? existsSync(resolve("public", p.main_image_url.replace(/^\//, "")))
      : false;
    const storiesOk = JSON.stringify(linked) === JSON.stringify(want);
    const workshopOk = !exp.workshop || ws === exp.workshop;
    const titleOk = !exp.title || p.title === exp.title;
    const ok = storiesOk && workshopOk && titleOk;
    console.log(
      `${ok ? "OK" : "FAIL"} ${exp.slug} | title=${p.title} | stories=[${linked}] | workshop=${ws ?? "-"} | image=${p.main_image_url ?? "NONE"} ${p.main_image_url ? (imgOk ? "(file ok)" : "(FILE MISSING)") : ""}`,
    );
    if (!storiesOk) console.log(`  expected stories [${want}]`);
    if (!workshopOk) console.log(`  expected workshop ${exp.workshop}`);
    if (!titleOk) console.log(`  expected title ${exp.title}`);
  }

  console.log("\n=== All active prints (incl. extras) ===\n");
  for (const p of products ?? []) {
    if (p.status !== "active") continue;
    const linked = (linksByProduct[p.id] || []).filter(Boolean);
    console.log(
      `${p.slug} | ${p.title} | [${linked}] | img=${p.main_image_url ?? "NONE"}`,
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
