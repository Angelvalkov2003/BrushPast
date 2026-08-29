import fs from "fs";
import path from "path";

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith("-page.tsx")) out.push(p);
  }
  return out;
}

for (const file of walk(path.join("components", "stories"))) {
  let s = fs.readFileSync(file, "utf8");

  // Page shell closing
  s = s.replace(/      <Footer \/>\n    <\/div>\n  \);/g, "      <Footer />\n    </StoryPageShell>\n  );");

  // Fish-tank StoryPanel closing (3-col grid)
  s = s.replace(
    /            <\/div>\n          <\/div>\n\n          <div className="relative flex min-h-/g,
    "            </div>\n          </StoryPanel>\n\n          <div className=\"relative flex min-h-",
  );

  // Column panels still on plain div
  s = s.replace(
    /<div\n                key=\{colIdx\}\n                className="relative border-t-2 border-bp-text\/10 px-5 py-8 md:px-6 md:py-10"\n              >/g,
    '<StoryPanel\n                key={colIdx}\n                className="relative border-t-2 border-bp-text/10 px-5 py-8 md:px-6 md:py-10"\n              >',
  );
  s = s.replace(
    /                <\/div>\n              <\/div>\n            \)\)\}/g,
    "                </div>\n              </StoryPanel>\n            ))}",
  );

  // Standalone StoryPanel boxes (errol, maimouna, bobby support)
  s = s.replace(
    /(<StoryPanel className="(?:mx-auto max-w-\[1400px\] )?border[^"]+">[\s\S]*?)<\/div>(\n        <\/RevealSection>)/g,
    "$1</StoryPanel>$2",
  );

  // Roundabout bio StoryPanel - close before sibling div
  s = s.replace(
    /(<StoryPanel className="border border-bp-text\/10 p-6 shadow-sm md:p-8">[\s\S]*?)<\/div>(\n          <div className="space-y-4)/g,
    "$1</StoryPanel>$2",
  );

  // Bobby support panel wrong close
  s = s.replace(
    /(<StoryPanel className="border border-bp-text\/15 p-6 md:p-8">[\s\S]*?)<\/div>(\n          <\/div>\n        <\/div>\n      <\/RevealSection>)/g,
    "$1</StoryPanel>$2",
  );

  if (!s.includes("story-texture") && s.includes("StoryPageShell")) {
    s = s.replace(
      'import Footer from "components/layout/footer";\n',
      'import Footer from "components/layout/footer";\nimport { StoryPageShell, StoryPanel } from "components/stories/story-texture";\n',
    );
  }

  fs.writeFileSync(file, s);
  console.log("fixed", file);
}
