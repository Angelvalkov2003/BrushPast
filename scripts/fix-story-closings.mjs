import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith("-page.tsx")) out.push(p);
  }
  return out;
}

for (const file of walk(path.join(root, "components", "stories"))) {
  let content = fs.readFileSync(file, "utf8");
  const before = content;

  // Hero quote: close StoryPanel (jamie still had </div>)
  content = content.replace(
    /(<StoryPanel className="relative mt-8[^>]*tint="bg-\[[^\]]+\]\/88">[\s\S]*?<\/p>\r?\n            )<\/div>/g,
    "$1</StoryPanel>",
  );

  // Hero image column: <div bg-[#...]> was wrongly closed with </StoryPanel>
  content = content.replace(
    /(<div className="relative flex items-center justify-center bg-\[[^\]]+\][^>]*>[\s\S]*?<\/div>\r?\n          )<\/StoryPanel>/g,
    "$1</div>",
  );

  // Fish tank: inner flex column closed with </StoryPanel> by mistake
  content = content.replace(
    /            <\/StoryPanel>\r?\n          <\/StoryPanel>\r?\n\r?\n          <div className="relative flex min-h-\[300px\]/g,
    '            </div>\n          </StoryPanel>\n\n          <div className="relative flex min-h-[300px]',
  );

  // Jamie hero image column: StoryPanel opened, closed with </div>
  content = content.replace(
    /(<StoryPanel className="relative flex items-center justify-center px-4 py-8 md:px-10 lg:py-12">[\s\S]*?<\/div>\r?\n          )<\/div>(\r?\n        <\/div>\r?\n      <\/RevealSection>)/g,
    "$1</StoryPanel>$2",
  );
  content = content.replace(
    /(<StoryPanel className="border border-bp-text\/12 p-8 md:p-10">[\s\S]*?<\/p>\r?\n          )<\/div>(\r?\n          <div className="flex items-center justify-center bg-bp-text)/g,
    "$1</StoryPanel>$2",
  );
  content = content.replace(
    /(<div className="flex items-center justify-center bg-bp-text p-8 md:p-10">[\s\S]*?<\/p>\r?\n          )<\/StoryPanel>/g,
    "$1</div>",
  );

  if (content !== before) {
    fs.writeFileSync(file, content);
    console.log("fixed", path.relative(root, file));
  }
}
