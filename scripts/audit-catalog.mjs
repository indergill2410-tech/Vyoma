import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  PRODUCTS,
  PRODUCT_STATUSES,
  mensCatalogueProducts,
  missingImageRoles,
  productShots,
  productStatus,
  productStoryFields,
  pureProductsForAudience,
  womenCatalogueProducts,
} from "../lib/catalog.js";

const ROOT = process.cwd();

const REQUIRED_PRODUCTS = [
  "vyoma-high-rise-legging",
  "vyoma-studio-top",
  "vyoma-rib-tank",
  "vyoma-practice-tee",
  "vyoma-the-set",
  "vyoma-akasha-wrap",
  "vyoma-mat-bag",
  "vyoma-78-legging",
  "vyoma-bike-short",
  "vyoma-crescent-skort",
  "vyoma-cloud-bra",
  "vyoma-flow-bra",
  "vyoma-jogger",
  "vyoma-meditation-hoodie",
  "vyoma-pure-brief-women",
  "vyoma-pure-cami",
  "vyoma-pure-trunk-men",
  "vyoma-organic-crew-sock",
];

const REQUIRED_WOMEN = [
  "vyoma-high-rise-legging",
  "vyoma-studio-top",
  "vyoma-rib-tank",
  "vyoma-the-set",
  "vyoma-akasha-wrap",
  "vyoma-78-legging",
  "vyoma-bike-short",
  "vyoma-crescent-skort",
  "vyoma-cloud-bra",
  "vyoma-flow-bra",
  "vyoma-pure-brief-women",
  "vyoma-pure-cami",
];

const REQUIRED_MEN = [
  "vyoma-practice-tee",
  "vyoma-mat-bag",
  "vyoma-jogger",
  "vyoma-meditation-hoodie",
  "vyoma-pure-trunk-men",
  "vyoma-organic-crew-sock",
];

const REQUIRED_PURE = [
  "vyoma-pure-brief-women",
  "vyoma-pure-cami",
  "vyoma-pure-trunk-men",
];

function fail(message) {
  throw new Error(message);
}

function missing(required, actual) {
  const actualSet = new Set(actual);
  return required.filter((slug) => !actualSet.has(slug));
}

async function existsPublicAsset(src) {
  if (!src || !src.startsWith("/")) return true;
  try {
    await access(join(ROOT, "public", src));
    return true;
  } catch {
    return false;
  }
}

function assertNoMissing(label, required, actual) {
  const missingSlugs = missing(required, actual);
  if (missingSlugs.length) fail(`${label} is missing: ${missingSlugs.join(", ")}`);
}

const allSlugs = PRODUCTS.map((product) => product.slug);
assertNoMissing("Full catalogue", REQUIRED_PRODUCTS, allSlugs);
assertNoMissing("Women catalogue", REQUIRED_WOMEN, womenCatalogueProducts().map((product) => product.slug));
assertNoMissing("Men catalogue", REQUIRED_MEN, mensCatalogueProducts().map((product) => product.slug));
assertNoMissing(
  "Pure catalogue",
  REQUIRED_PURE,
  [
    ...pureProductsForAudience("women"),
    ...pureProductsForAudience("men"),
  ].map((product) => product.slug)
);

const duplicates = allSlugs.filter((slug, index) => allSlugs.indexOf(slug) !== index);
if (duplicates.length) fail(`Duplicate catalogue slugs: ${[...new Set(duplicates)].join(", ")}`);

for (const product of PRODUCTS) {
  const status = productStatus(product);
  if (!PRODUCT_STATUSES[status]) fail(`${product.slug} has invalid product status: ${status}`);

  const story = productStoryFields(product);
  if (!story.storyHeadline || !story.storySummary) {
    fail(`${product.slug} is missing backward-compatible story fields.`);
  }
  if (!Array.isArray(story.useMoments) || story.useMoments.length === 0) {
    fail(`${product.slug} must declare at least one use moment.`);
  }

  const shots = productShots(product);
  if (shots.length < 1) fail(`${product.slug} should expose at least one product shot.`);

  const shotSrcs = shots.map((shot) => shot.src);
  const duplicateShotSrcs = shotSrcs.filter((src, index) => shotSrcs.indexOf(src) !== index);
  if (duplicateShotSrcs.length) {
    fail(`${product.slug} repeats one image as multiple gallery roles: ${[...new Set(duplicateShotSrcs)].join(", ")}`);
  }

  for (const shot of shots) {
    if (!shot.role || !shot.angle || !shot.alt) {
      fail(`${product.slug} ${shot.slot} must include role, angle and alt metadata.`);
    }
    if (/back view/i.test(shot.alt) && shot.role !== "back") {
      fail(`${product.slug} labels ${shot.slot} as a back view without a back role.`);
    }
    if (/material detail/i.test(shot.alt) && shot.role !== "detail") {
      fail(`${product.slug} labels ${shot.slot} as material detail without a detail role.`);
    }

    const hasPrimary = await existsPublicAsset(shot.src);
    const hasFallback = await existsPublicAsset(shot.fallbackSrc);
    if (!hasPrimary && !hasFallback) {
      fail(`${product.slug} ${shot.slot} has no usable image or fallback.`);
    }
  }

  const missingRoles = missingImageRoles(product);
  if (!Array.isArray(missingRoles)) fail(`${product.slug} missing image roles must be auditable.`);
}

const productCard = await readFile(join(ROOT, "components", "ProductCard.js"), "utf8");
if (productCard.includes("data-reveal")) {
  fail("ProductCard must stay visible by default; remove data-reveal from catalogue cards.");
}

const shopGrid = await readFile(join(ROOT, "components", "ShopGrid.js"), "utf8");
if (/className=["'{`]card["'}`][^>]*data-reveal/.test(shopGrid)) {
  fail("ShopGrid live cards must stay visible by default; remove data-reveal.");
}

const globals = await readFile(join(ROOT, "app", "globals.css"), "utf8");
if (!globals.includes(".pdp-frame .product-img")) {
  fail("PDP product images must be constrained inside .pdp-frame.");
}

console.log(
  `Catalogue audit passed: ${PRODUCTS.length} products, ${womenCatalogueProducts().length} women, ${mensCatalogueProducts().length} men, ${REQUIRED_PURE.length} Pure.`
);
