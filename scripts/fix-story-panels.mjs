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

  s = s.replace(
    /<div\n                key=\{colIdx\}\n                className="relative border-t-2 border-bp-text\/10 px-5 py-8 md:px-6 md:py-10"\n              >/g,
    '<StoryPanel\n                key={colIdx}\n                className="relative border-t-2 border-bp-text/10 px-5 py-8 md:px-6 md:py-10"\n              >',
  );
  s = s.replace(/                <\/div>\n              \)\)\}/g, "                </StoryPanel>\n              ))}");
  s = s.replace(
    /            <\/div>\n          <\/div>\n\n          <div className="relative flex min-h-\[300px\]/g,
    '            </div>\n          </StoryPanel>\n\n          <div className="relative flex min-h-[300px]',
  );

  if (!s.includes("story-texture") && s.includes("StoryPageShell")) {
    s = s.replace(
      'import Footer from "components/layout/footer";\n',
      'import Footer from "components/layout/footer";\nimport { StoryPageShell, StoryPanel } from "components/stories/story-texture";\n',
    );
  }

  fs.writeFileSync(file, s);
  console.log("ok", file);
}
