import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const roots = ["app", "components", "lib"];
const exts = new Set([".ts", ".tsx", ".js", ".jsx", ".md"]);

const protect = [
  "Brush Past Community Arts CIC",
  "Brush Past Foundation",
  "Brush Past (Community Interest Company)",
];

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith(".")) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "node_modules" || ent.name === ".next") continue;
      walk(p, out);
    } else if (exts.has(path.extname(ent.name))) {
      out.push(p);
    }
  }
  return out;
}

let filesChanged = 0;
for (const rel of roots) {
  for (const file of walk(path.join(root, rel))) {
    let text = fs.readFileSync(file, "utf8");
    const original = text;
    protect.forEach((phrase, i) => {
      text = text.split(phrase).join(`__LEGAL_${i}__`);
    });
    text = text.replace(/Brush Past/g, "BrushPast");
    protect.forEach((phrase, i) => {
      text = text.split(`__LEGAL_${i}__`).join(phrase);
    });
    if (text !== original) {
      fs.writeFileSync(file, text);
      filesChanged += 1;
      console.log("updated", path.relative(root, file));
    }
  }
}
console.log("filesChanged", filesChanged);
