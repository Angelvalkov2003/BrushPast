import fs from "fs";
import path from "path";

const importLine =
  'import { StoryPageShell, StoryPanel } from "components/stories/story-texture";\n';

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

for (const file of files) {
  let s = fs.readFileSync(file, "utf8");

  if (s.includes("StoryPageShell") && !s.includes("story-texture")) {
    const m = s.match(/^import .+;\n/m);
    if (m) {
      const footerIdx = s.indexOf('import Footer from "components/layout/footer";');
      if (footerIdx >= 0) {
        const insertAt = s.indexOf("\n", footerIdx) + 1;
        s = s.slice(0, insertAt) + importLine + s.slice(insertAt);
      } else {
        s = importLine + s;
      }
    }
  }

  if (file.endsWith("story-artwork-carousel.tsx") && !s.includes('from "components/shared/texture-section"')) {
    s = s.replace(
      'import type { StoryArtworkImage }',
      'import { TextureSection } from "components/shared/texture-section";\nimport type { StoryArtworkImage }',
    );
    s = s.replace("</section>", "</TextureSection>");
  }

  // Fish-tank StoryPanel closing
  s = s.replace(
    /(\s+<\/div>\n)(\s+<\/div>\n\n\s+<div className="relative flex min-h-\[300px\])/g,
    "$1          </StoryPanel>\n\n$2",
  );

  // Column panels
  s = s.replace(
    /<div\n                key=\{colIdx\}\n                className="relative border-t-2 border-bp-text\/10 px-5 py-8 md:px-6 md:py-10"\n              >/g,
    '<StoryPanel\n                key={colIdx}\n                className="relative border-t-2 border-bp-text/10 px-5 py-8 md:px-6 md:py-10"\n              >',
  );
  s = s.replace(
    /(\s+<\/div>\n              \)\)\}\n          <\/div>\n        <\/div>\n      <\/RevealSection>)/g,
    (match) => match.replace(/\n              <\/div>\n              \)\)\}/, "\n              </StoryPanel>\n              ))}"),
  );

  // errol / standalone StoryPanel boxes
  s = s.replace(
    /(<StoryPanel className="mx-auto max-w-\[1400px\][^>]+>[\s\S]*?)<\/div>(\s+<\/RevealSection>)/g,
    "$1</StoryPanel>$2",
  );

  s = s.replace(
    /(<StoryPanel className="border border-bp-text\/15 p-6 md:p-8">[\s\S]*?)<\/div>(\s+<\/div>\n        <\/div>\n      <\/RevealSection>)/g,
    "$1</StoryPanel>$2",
  );

  // roundabout inner panel
  s = s.replace(
    /(<StoryPanel className="border border-bp-text\/10 p-6 shadow-sm md:p-8">[\s\S]*?)<\/div>(\s+<\/div>\n      <\/RevealSection>)/g,
    "$1</StoryPanel>$2",
  );

  // rob fish panel
  s = s.replace(
    /(<StoryPanel className="flex flex-col border border-bp-text\/15">[\s\S]*?)<\/div>(\s+<\/div>\n        <\/div>\n      <\/RevealSection>)/g,
    "$1</StoryPanel>$2",
  );

  // maimouna closing box
  s = s.replace(
    /(<StoryPanel className="border border-bp-text\/12 p-8 md:p-10">[\s\S]*?)<\/div>(\s+<\/div>\n      <\/RevealSection>)/g,
    "$1</StoryPanel>$2",
  );

  fs.writeFileSync(file, s);
  console.log("fixed", path.relative(process.cwd(), file));
}

// Fix FragmentCard in jr and bobby
function fixFragmentCard(file, rotateClass) {
  let s = fs.readFileSync(file, "utf8");
  s = s.replace(
    /function FragmentCard[\s\S]*?return \(\n    <article[\s\S]*?<\/StoryPanel>\n  \);/,
    `function FragmentCard({ title, quote, rotate }: { title: string; quote: string; rotate: string }) {
  return (
    <StoryPanel
      as="article"
      className={\`border border-bp-text/12 p-5 shadow-[2px_3px_0_rgba(0,0,0,0.05)] \${rotate}\`}
    >
      <h3 className={\`\${homeHandClass} text-xl font-bold text-bp-accent\`}>{title}</h3>
      <p className={\`\${homeHandClass} mt-3 text-lg leading-snug text-bp-text/88\`}>{quote}</p>
    </StoryPanel>
  );`,
  );
  fs.writeFileSync(file, s);
}

// jr has different FragmentCard content - fix manually via read
