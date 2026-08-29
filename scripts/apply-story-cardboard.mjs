import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const storyDir = path.join(root, "components", "stories");

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (name.endsWith("-page.tsx")) out.push(p);
  }
  return out;
}

function addImport(content) {
  if (content.includes("story-texture")) return content;
  const line =
    'import { StoryPageShell, StoryPanel } from "components/stories/story-texture";\n';
  const m = content.match(/^import .+;\n/m);
  if (m) {
    const idx = content.indexOf(m[0]) + m[0].length;
    return content.slice(0, idx) + line + content.slice(idx);
  }
  return line + content;
}

function transform(content) {
  content = addImport(content);

  // Remove unused inline page backgrounds
  content = content.replace(
    /\nconst (?:CANVAS_BG|PAPER_BG) = \{[\s\S]*?\};\n/g,
    "\n",
  );

  content = content
    .replace(/<div className="bg-bp-canvas text-bp-text">/g, "<StoryPageShell>")
    .replace(
      /<div className="text-bp-text" style=\{(?:CANVAS_BG|PAPER_BG)\}>/g,
      "<StoryPageShell>",
    )
    .replace(/<div className="bg-\[#f9f6f0\] text-bp-text">/g, "<StoryPageShell>");

  content = content.replace(
    /      <Footer \/>\r?\n    <\/div>\r?\n  \);/g,
    "      <Footer />\n    </StoryPageShell>\n  );",
  );

  // Section washes — texture shows through
  content = content.replace(/ bg-bp-surface\/\d+/g, "");
  content = content.replace(/ bg-bp-surface(?![\w/])/g, "");
  content = content.replace(
    /(<RevealSection className="[^"]*) bg-bp-canvas\/\d+([^"]*")/g,
    "$1$2",
  );
  content = content.replace(
    /(<RevealSection className="[^"]*) bg-bp-canvas([^"]*")/g,
    "$1$2",
  );

  // Story body columns
  content = content.replace(
    /<div\r?\n\s+key=\{colIdx\}\r?\n\s+className="relative border-t-2 border-bp-text\/10 bg-bp-canvas\/\d+ px-5 py-8 md:px-6 md:py-10"\r?\n\s+>/g,
    '<StoryPanel\n                key={colIdx}\n                className="relative border-t-2 border-bp-text/10 px-5 py-8 md:px-6 md:py-10"\n              >',
  );

  content = content.replace(
    /                <\/div>\r?\n              <\/div>\r?\n            \)\)\}/g,
    "                </div>\n              </StoryPanel>\n            ))}",
  );

  content = content.replace(
    /absolute -top-5 left-4 bg-bp-canvas px-2/g,
    "absolute -top-5 left-4 bg-[#faf6f0]/95 px-2",
  );

  // Three-column feature panels (fish tank etc.)
  content = content.replace(
    /<div className="flex flex-col border border-bp-text\/15 bg-bp-canvas">/g,
    '<StoryPanel className="flex flex-col border border-bp-text/15">',
  );
  content = content.replace(
    /            <\/div>\r?\n          <\/div>\r?\n\r?\n          <div className="relative flex min-h-\[300px\]/g,
    "            </div>\n          </StoryPanel>\n\n          <div className=\"relative flex min-h-[300px]",
  );

  // Support / bio panels
  content = content.replace(
    /<div className="border border-bp-text\/15 bg-bp-canvas p-6 md:p-8">/g,
    '<StoryPanel className="border border-bp-text/15 p-6 md:p-8">',
  );
  content = content.replace(
    /<div className="border border-bp-text\/10 bg-bp-canvas p-6 shadow-sm md:p-8">/g,
    '<StoryPanel className="border border-bp-text/10 p-6 shadow-sm md:p-8">',
  );
  content = content.replace(
    /<div className="border border-bp-text\/12 bg-bp-canvas p-8 md:p-10">/g,
    '<StoryPanel className="border border-bp-text/12 p-8 md:p-10">',
  );
  content = content.replace(
    /<div className="mx-auto max-w-\[1400px\] border border-bp-text\/12 bg-bp-canvas p-8 md:p-10">/g,
    '<StoryPanel className="mx-auto max-w-[1400px] border border-bp-text/12 p-8 md:p-10">',
  );

  // Close support box (bobby) — before sibling grid closes
  content = content.replace(
    /              <\/Link>\r?\n            <\/div>\r?\n          <\/div>\r?\n        <\/div>\r?\n      <\/RevealSection>\r?\n\r?\n      \{\/\* CTA \*\/\}/g,
    "              </Link>\n            </StoryPanel>\n          </div>\n        </div>\n      </RevealSection>\n\n      {/* CTA */}",
  );

  // Close roundabout bio panel
  content = content.replace(
    /            <p className="mt-4 text-sm font-semibold text-bp-text\/70">- \{firstName\}<\/p>\r?\n          <\/div>\r?\n          <div className="space-y-4 font-serif/g,
    '            <p className="mt-4 text-sm font-semibold text-bp-text/70">- {firstName}</p>\n          </StoryPanel>\n          <div className="space-y-4 font-serif',
  );

  // Close errol bottom panel — before RevealSection closes with products
  content = content.replace(
    /<StoryPanel className="mx-auto max-w-\[1400px\] border border-bp-text\/12 p-8 md:p-10">([\s\S]*?)        <\/div>\r?\n      <\/RevealSection>/g,
    (m, inner) =>
      `<StoryPanel className="mx-auto max-w-[1400px] border border-bp-text/12 p-8 md:p-10">${inner}        </StoryPanel>\n      </RevealSection>`,
  );

  // Close maimouna panel similarly
  content = content.replace(
    /<StoryPanel className="border border-bp-text\/12 p-8 md:p-10">([\s\S]*?)          <\/div>\r?\n        <\/div>\r?\n      <\/RevealSection>/g,
    (m, inner) =>
      `<StoryPanel className="border border-bp-text/12 p-8 md:p-10">${inner}          </StoryPanel>\n        </div>\n      </RevealSection>`,
  );

  // Hero quote cards — extract tint colour
  content = content.replace(
    /<div className="relative mt-8 max-w-lg ([^"]*?) border border-bp-text\/\d+ bg-\[(#[0-9a-fA-F]+)\]([^"]*?) p-6([^>]*?)>/g,
    (match, rotate, color, rest, tail) =>
      `<StoryPanel className="relative mt-8 max-w-lg ${rotate} border border-bp-text/25${rest} p-6${tail} tint="bg-[${color}]/88">`,
  );

  // Jamie hero image column — white bg area
  content = content.replace(
    /<div className="relative flex items-center justify-center bg-bp-canvas px-4 py-8 md:px-10 lg:py-12">/g,
    '<StoryPanel className="relative flex items-center justify-center px-4 py-8 md:px-10 lg:py-12">',
  );
  content = content.replace(
    /            <\/div>\r?\n          <\/div>\r?\n        <\/div>\r?\n      <\/RevealSection>\r?\n\r?\n      <RevealSection className="relative overflow-hidden border-b border-bp-text\/10">/g,
    "            </div>\n          </StoryPanel>\n        </div>\n      </RevealSection>\n\n      <RevealSection className=\"relative overflow-hidden border-b border-bp-text/10\">",
  );

  // Fragment cards — bobby & jr
  content = content.replace(
    /<article\r?\n      className=\{`border border-bp-text\/12 bg-\[#faf7f2\]/g,
    '<StoryPanel as="article"\n      className={`border border-bp-text/12',
  );
  content = content.replace(
    /<article\r?\n      className=\{`relative border border-bp-text\/15 bg-\[#faf6ef\]/g,
    '<StoryPanel as="article"\n      className={`relative border border-bp-text/15',
  );
  content = content.replace(
    /(<StoryPanel as="article"[\s\S]*?<p className=\{`\$\{homeHandClass\} mt-3[^`]+`\}>\{quote\}<\/p>)\r?\n    <\/article>/g,
    "$1\n    </StoryPanel>",
  );
  content = content.replace(
    /(<StoryPanel as="article"[\s\S]*?<p className=\{`\$\{homeHandClass\} mt-4[^`]+`\}>- JR<\/p>)\r?\n    <\/article>/g,
    "$1\n    </StoryPanel>",
  );

  // Maimouna alternating cards — bg-bp-canvas in ternary
  content = content.replace(
    /: "border border-bp-text\/12 bg-bp-canvas"/g,
    ': "border border-bp-text/12"',
  );

  // Rob light quote cards
  content = content.replace(
    /dark \? "bg-bp-dark text-bp-canvas" : "border border-bp-text\/12 bg-\[#f7f3ec\]"/g,
    'dark ? "bg-bp-dark text-bp-canvas" : "border border-bp-text/12"',
  );

  // Eneh photo card backing
  content = content.replace(
    /<div className="relative aspect-\[4\/5\] overflow-hidden border border-bp-text\/15 bg-\[#f5f0e8\]/g,
    '<StoryPanel className="relative aspect-[4/5] overflow-hidden border border-bp-text/15',
  );
  content = content.replace(
    /        \/>\r?\n      <\/div>\r?\n      \{photo\.caption/g,
    "        />\n      </StoryPanel>\n      {photo.caption",
  );

  return content;
}

for (const file of walk(storyDir)) {
  const rel = path.relative(root, file);
  const before = fs.readFileSync(file, "utf8");
  const after = transform(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    console.log("updated", rel);
  }
}

console.log("done");
