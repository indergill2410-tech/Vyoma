import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { mensCatalogueProducts, productShots, relatedProducts } from "../lib/catalog.js";

const ROOT = process.cwd();
const FORBIDDEN_ASSET_FRAGMENTS = [
  "pure-brief-women",
  "cloud-bra",
  "flow-bra",
  "pure-cami",
  "high-rise-legging",
  "studio-top",
  "rib-tank",
  "crescent-skort",
  "bike-short",
  "78-legging",
];

function fail(message) {
  throw new Error(message);
}

function containsForbidden(value) {
  const lower = String(value || "").toLowerCase();
  return FORBIDDEN_ASSET_FRAGMENTS.find((fragment) => lower.includes(fragment));
}

const menProducts = mensCatalogueProducts();
if (!menProducts.length) fail("Men catalogue is empty.");

for (const product of menProducts) {
  if (product.audience === "women") {
    fail(`${product.slug} is audience=women but appears in the Men catalogue.`);
  }

  if (!product.mensGroup) {
    fail(`${product.slug} is missing mensGroup metadata.`);
  }

  for (const shot of productShots(product)) {
    const forbidden = containsForbidden(shot.src);
    if (forbidden) fail(`${product.slug} uses forbidden Men asset fragment: ${forbidden}`);
  }

  const related = relatedProducts(product.slug, 3);
  const unsafeRelated = related.find((item) => item.audience === "women");
  if (unsafeRelated) {
    fail(`${product.slug} recommends women-audience product ${unsafeRelated.slug}.`);
  }
}

const menPage = await readFile(join(ROOT, "app", "men", "page.js"), "utf8");
if (menPage.includes("pureStillLife")) fail("/men still uses pureStillLife.");
if (menPage.includes("/pure#men")) fail("/men still links to /pure#men.");

for (const fragment of FORBIDDEN_ASSET_FRAGMENTS) {
  if (menPage.toLowerCase().includes(fragment)) {
    fail(`/men source contains forbidden fragment: ${fragment}`);
  }
}

if (process.env.MEN_AUDIT_URL) {
  const res = await fetch(process.env.MEN_AUDIT_URL);
  if (!res.ok) fail(`Live Men audit URL returned ${res.status}.`);
  const html = (await res.text()).toLowerCase();
  for (const fragment of FORBIDDEN_ASSET_FRAGMENTS) {
    if (html.includes(fragment)) fail(`Live Men page contains forbidden fragment: ${fragment}`);
  }
}

console.log(`Men catalogue audit passed for ${menProducts.length} products.`);
