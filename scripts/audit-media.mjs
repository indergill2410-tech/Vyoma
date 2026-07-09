import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = process.cwd();

const REQUIRED_HOME_SYSTEM_IMAGES = [
  "/products/vyoma-practice-tee/men-lifestyle.webp",
  "/products/vyoma-mat-bag/men-lifestyle.webp",
  "/products/vyoma-meditation-hoodie/men-lifestyle.webp",
  "/products/vyoma-the-set/model.webp",
];

function fail(message) {
  throw new Error(message);
}

async function publicAssetExists(src) {
  try {
    await access(join(ROOT, "public", src));
    return true;
  } catch {
    return false;
  }
}

const homeSource = await readFile(join(ROOT, "app", "page.js"), "utf8");
const homeCss = await readFile(join(ROOT, "app", "HomePage.module.css"), "utf8");

if (!homeSource.includes("systemVisual")) {
  fail("Homepage day-system cards must include a visual panel.");
}

if (!homeSource.includes("systemText")) {
  fail("Homepage day-system copy must be wrapped so it cannot fall into the number column.");
}

for (const src of REQUIRED_HOME_SYSTEM_IMAGES) {
  if (!homeSource.includes(src)) fail(`Homepage day-system image is not wired: ${src}`);
  if (!(await publicAssetExists(src))) fail(`Homepage day-system image is missing from /public: ${src}`);
}

if (!homeCss.includes(".systemVisual img")) {
  fail("Homepage day-system images must have explicit fit rules.");
}

if (!homeCss.includes(".systemText")) {
  fail("Homepage day-system copy needs a dedicated text layout.");
}

if (/\\.systemCard\\s*\\{[^}]*grid-template-columns:\\s*56px\\s+1fr/s.test(homeCss)) {
  fail("Homepage day-system cards still use the old narrow number-column grid.");
}

console.log("Media audit passed: homepage day-system cards have real images and safe text placement.");
