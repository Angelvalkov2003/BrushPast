import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "components", "stories");

const files = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (name.endsWith("-page.tsx") || name === "story-artwork-carousel.tsx") files.push(p);
  }
}
walk(root);

const importLine =
  'import { StoryPageShell, StoryPanel } from "components/stories/story-texture";\n';

for (const file of files) {
  let s = fs.readFileSync(file, "utf8");
  if (!s.includes("StoryPageShell") && !importLine.trim().includes(s)) {
    const anchor = s.includes('import Footer from "components/layout/footer";')
      ? 'import Footer from "components/layout/footer";\n'
      : s.includes('import { RevealSection }')
        ? /import \{ RevealSection \}[^\n]+\n/
        : null;
    if (anchor) {
      if (typeof anchor === "string") s = s.replace(anchor, anchor + importLine);
      else s = s.replace(anchor, (m) => m + importLine);
    }
  }

  s = s.replace(
    /<div className="bg-bp-canvas text-bp-text">/g,
    "<StoryPageShell>",
  );
  s = s.replace(
    /<div className="bg-\[#f9f6f0\] text-bp-text">/g,
    "<StoryPageShell>",
  );
  s = s.replace(
    /<div className="text-bp-text" style=\{CANVAS_BG\}>/g,
    "<StoryPageShell>",
  );
  s = s.replace(
    /<div className="text-bp-text" style=\{PAPER_BG\}>/g,
    "<StoryPageShell>",
  );
  s = s.replace(/      <Footer \/>\n    <\/div>/g, "      <Footer />\n    </StoryPageShell>");

  s = s.replace(
    /className="relative border-t-2 border-bp-text\/10 bg-bp-canvas\/\d+ /g,
    'className="relative border-t-2 border-bp-text/10 ',
  );
  s = s.replace(
    /<div\n                className="relative border-t-2 border-bp-text\/10 /g,
    "<StoryPanel\n                className=\"relative border-t-2 border-bp-text/10 ",
  );
  s = s.replace(
    /<div className="relative border-t-2 border-bp-text\/10 /g,
    "<StoryPanel className=\"relative border-t-2 border-bp-text/10 ",
  );

  // column closing - replace matching </div> after column content is hard; use replace for opening only and fix closings
  s = s.replace(
    /<div className="flex flex-col border border-bp-text\/15 bg-bp-canvas">/g,
    '<StoryPanel className="flex flex-col border border-bp-text/15">',
  );
  s = s.replace(
    /<div className="border border-bp-text\/12 bg-bp-canvas /g,
    '<StoryPanel className="border border-bp-text/12 ',
  );
  s = s.replace(
    /<div className="border border-bp-text\/10 bg-bp-canvas /g,
    '<StoryPanel className="border border-bp-text/10 ',
  );
  s = s.replace(
    /<div className="border border-bp-text\/15 bg-bp-canvas /g,
    '<StoryPanel className="border border-bp-text/15 ',
  );
  s = s.replace(
    /<div className="mx-auto max-w-\[1400px\] border border-bp-text\/12 bg-bp-canvas /g,
    '<StoryPanel className="mx-auto max-w-[1400px] border border-bp-text/12 ',
  );

  s = s.replace(/ bg-bp-surface\/40/g, "");
  s = s.replace(/ bg-bp-surface\/50/g, "");
  s = s.replace(/ bg-bp-surface\/30/g, "");
  s = s.replace(/ bg-bp-canvas\/80/g, "");
  s = s.replace(
    /RevealSection className="border-b border-bp-text\/10 bg-bp-canvas /g,
    'RevealSection className="border-b border-bp-text/10 ',
  );
  s = s.replace(
    /RevealSection className="border-b border-bp-text\/10 bg-bp-surface /g,
    'RevealSection className="border-b border-bp-text/10 ',
  );

  s = s.replace(
    /className=\{`\$\{homeHandClass\} absolute -top-5 left-4 bg-bp-canvas px-2/g,
    "className={`${homeHandClass} absolute -top-5 left-4 bg-[#faf6f0]/95 px-2",
  );

  // Fragment cards
  s = s.replace(
    /<article\n      className=\{`border border-bp-text\/12 bg-\[#faf7f2\]/g,
    "<StoryPanel as=\"article\"\n      className={`border border-bp-text/12",
  );
  s = s.replace(
    /<article\n      className=\{`relative border border-bp-text\/15 bg-\[#faf6ef\]/g,
    "<StoryPanel as=\"article\"\n      className={`relative border border-bp-text/15",
  );

  // carousel section
  s = s.replace(
    /<section className="border-b border-bp-text\/10 bg-bp-canvas /g,
    '<TextureSection as="section" texture="secondary" overlay="story" className="border-b border-bp-text/10 ',
  );

  // Close StoryPanel that replaced div - heuristic: after fish tank / column blocks
  // Fix article closing tags for FragmentCard
  s = s.replace(/<\/article>/g, "</StoryPanel>");

  fs.writeFileSync(file, s);
  console.log("updated", path.relative(process.cwd(), file));
}
