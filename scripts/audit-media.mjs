import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = process.cwd();

const REQUIRED_HOME_SYSTEM_IMAGES = [
  "/products/vyoma-practice-tee/men-lifestyle.webp",
  "/products/vyoma-mat-bag/men-lifestyle.webp",
  "/products/vyoma-meditation-hoodie/men-lifestyle.webp",
  "/products/vyoma-the-set/model.webp",
];

const REQUIRED_AMBER_STAGE_IMAGES = [
  "/editorial/mens-catalogue-hero.webp",
  "/products/vyoma-the-set/model.webp",
  "/products/vyoma-mat-bag/model.webp",
  "/products/vyoma-meditation-hoodie/model.webp",
  "/products/vyoma-high-rise-legging/model.webp",
  "/products/vyoma-practice-tee/model.webp",
  "/products/vyoma-organic-crew-sock/model.webp",
  "/products/vyoma-jogger/model.webp",
];

const SOURCE_FILES_TO_SCAN = [
  ["app", "page.js"],
  ["components", "AmberProductStage.js"],
  ["components", "EditorialImage.js"],
  ["lib", "catalog.js"],
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
const conversionCss = await readFile(join(ROOT, "app", "conversion.css"), "utf8");
const amberStageSource = await readFile(join(ROOT, "components", "AmberProductStage.js"), "utf8");

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

if (amberStageSource.includes('from "next/image"')) {
  fail("Homepage hero collage must render direct WebP assets, not Next image optimizer URLs.");
}

if (!amberStageSource.includes("<img")) {
  fail("Homepage hero collage must render image elements.");
}

if (!/\.amber-stage-img\s*\{[^}]*position:\s*absolute[^}]*width:\s*100%[^}]*height:\s*100%[^}]*object-fit:\s*cover/s.test(conversionCss)) {
  fail("Homepage hero collage images must explicitly fill their tiles.");
}

for (const src of REQUIRED_AMBER_STAGE_IMAGES) {
  if (!amberStageSource.includes(src)) fail(`Hero collage image is not wired: ${src}`);
  if (!(await publicAssetExists(src))) fail(`Hero collage image is missing from /public: ${src}`);
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

for (const filePath of SOURCE_FILES_TO_SCAN) {
  const source = await readFile(join(ROOT, ...filePath), "utf8");
  const refs = source.matchAll(/["'`]((?:\/products|\/editorial)\/[^"'`]+\.(?:webp|png|jpg|jpeg|svg))["'`]/g);

  for (const [, src] of refs) {
    if (!(await publicAssetExists(src))) {
      fail(`${filePath.join("/")} references a missing public image: ${src}`);
    }
  }
}

console.log("Media audit passed: homepage hero, day-system cards and catalogue image references are present.");
