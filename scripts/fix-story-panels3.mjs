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
    /            <\/div>\n          <\/div>\n\n          <div className="relative flex min-h-/g,
    "            </div>\n          </StoryPanel>\n\n          <div className=\"relative flex min-h-",
  );

  s = s.replace(
    /            <p className="mt-4 text-sm font-semibold text-bp-text\/70">- \{firstName\}<\/p>\n          <\/div>\n          <div className="space-y-4 font-serif/g,
    '            <p className="mt-4 text-sm font-semibold text-bp-text/70">- {firstName}</p>\n          </StoryPanel>\n          <div className="space-y-4 font-serif',
  );

  s = s.replace(
    /                View artwork →\n              <\/Link>\n            <\/div>\n          <\/div>/g,
    "                View artwork →\n              </Link>\n            </StoryPanel>\n          </div>",
  );

  fs.writeFileSync(file, s);
  console.log(file);
}
