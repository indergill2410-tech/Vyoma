import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  COLOURWAYS,
  PRODUCTS,
  missingImageRoles,
  productShots,
  productStatus,
  productStoryFields,
  PRODUCT_STATUSES,
} from "../lib/catalog.js";
import { getProducts, shopifyConfigured } from "../lib/shopify.js";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT_DIR = join(ROOT, "docs", "audits");
const BASELINE_JSON = join(OUT_DIR, "catalog-baseline.json");
const BASELINE_MD = join(OUT_DIR, "catalog-baseline.md");
const COMPARISON_MD = join(OUT_DIR, "catalog-comparison.md");
const SHOPIFY_JSON = join(OUT_DIR, "shopify-catalog-snapshot.json");
const SHOPIFY_MD = join(OUT_DIR, "shopify-catalog-snapshot.md");

function imageSnapshot(product) {
  return productShots(product).map((shot) => {
    const relativePath = shot.src.replace(/^\//, "");
    return {
      slot: shot.slot,
      role: shot.role,
      angle: shot.angle,
      src: shot.src,
      fallbackSrc: shot.fallbackSrc || null,
      alt: shot.alt,
      verified: Boolean(shot.verified),
      status: "Verified unique asset",
      exists: existsSync(join(ROOT, "public", relativePath)),
    };
  });
}

function audienceFor(product) {
  if (/women/i.test(product.name)) return "Women";
  if (/men/i.test(product.name)) return "Men";
  return "Not explicitly assigned";
}

function collectionsFor(product) {
  const collections = new Set(["Shop All", product.category]);
  if (product.hero) collections.add("Featured");
  if (product.category === "Vyoma Pure") collections.add("Vyoma Pure");
  if (/women/i.test(product.name)) collections.add("Women");
  if (/men/i.test(product.name)) collections.add("Men");
  if (product.bundle?.length) collections.add("Complete the Set");
  return Array.from(collections).filter(Boolean);
}

function formatMinor(minor) {
  return Number.isFinite(minor) ? minor / 100 : null;
}

function productSnapshot(product) {
  const images = imageSnapshot(product);
  const status = productStatus(product);
  const story = productStoryFields(product);
  return {
    product: product.name,
    slug: product.slug,
    url: `/product/${product.slug}`,
    productId: product.id || null,
    sku: product.sku || null,
    category: product.category,
    collections: collectionsFor(product),
    audience: audienceFor(product),
    badges: product.hero ? ["Featured"] : [],
    status,
    publicState: PRODUCT_STATUSES[status]?.publicState || status,
    checkoutPolicy: PRODUCT_STATUSES[status]?.checkoutPolicy || "Not specified",
    priceAudMinor: product.priceAud,
    priceAudDisplay: `AUD ${formatMinor(product.priceAud)}`,
    priceInrMinor: product.priceInr,
    priceInrDisplay: `INR ${formatMinor(product.priceInr)}`,
    sizes: product.sizes,
    colours: product.colourways.map((key) => ({
      key,
      name: COLOURWAYS[key]?.name || key,
      base: COLOURWAYS[key]?.base || null,
    })),
    availabilityState: product.leadTime || "Not specified",
    description: product.description,
    materialInformation: product.fabric,
    careInformation: product.care,
    fitInformation: product.fit,
    storyHeadline: story.storyHeadline,
    storySummary: story.storySummary,
    useMoments: story.useMoments,
    imagePaths: images.map((image) => image.src),
    images,
    missingImageRoles: missingImageRoles(product),
    variantImageRelationships:
      "Local fallback uses the selected colourway for generated swatch fallback; no committed colour-specific product photos are present.",
    cartIdentifiers: {
      localProductSlug: product.slug,
      localColourwayKeys: product.colourways,
      localSizes: product.sizes,
      checkoutState:
        "Local catalogue is read-only fallback. Shopify Storefront variant IDs are used when Shopify is configured.",
    },
    checkoutIdentifiers: [],
    structuredMetadata: {
      tagline: product.tagline,
      hero: Boolean(product.hero),
      bundle: product.bundle || [],
      completeTheLookIds: story.completeTheLookIds,
    },
  };
}

function snapshot() {
  return {
    generatedAt: new Date().toISOString(),
    source: "GitHub checkout: lib/catalog.js local fallback catalogue",
    note:
      "Shopify is the live commerce system when env vars are configured; this audit records the GitHub source fallback and preserves its commercial fields.",
    productCount: PRODUCTS.length,
    colourwayCount: Object.keys(COLOURWAYS).length,
    products: PRODUCTS.map(productSnapshot),
  };
}

function markdownForSnapshot(data) {
  const rows = data.products
    .map((product) => {
      const imageStatus = `${product.images.filter((image) => image.exists).length}/${product.images.length} verified roles present`;
      const colours = product.colours.map((colour) => colour.name).join(", ");
      return `| ${escapeCell(product.product)} | ${escapeCell(product.slug)} | ${escapeCell(product.category)} | ${product.priceAudDisplay} / ${product.priceInrDisplay} | ${escapeCell(product.sizes.join(", "))} | ${escapeCell(colours)} | ${escapeCell(imageStatus)} | ${escapeCell(product.publicState)} |`;
    })
    .join("\n");

  return `# Catalogue Baseline

Generated: ${data.generatedAt}

Source: ${data.source}

${data.note}

Total products: ${data.productCount}

| Product | Slug | Category | Price | Sizes | Colours | Images | Status |
|---|---|---|---|---|---|---|---|
${rows}
`;
}

function shopifyProductSnapshot(product) {
  const options = Object.fromEntries((product.options || []).map((option) => [option.name, option.values]));
  const variants = product.variants?.nodes || [];
  const images = product.images?.nodes || [];

  return {
    product: product.title,
    slug: product.handle,
    url: `/product/${product.handle}`,
    productId: product.id,
    sku: variants.map((variant) => variant.sku).filter(Boolean),
    category: product.productType || "",
    price: product.priceRange?.minVariantPrice || null,
    sizes: options.Size || options.size || [],
    colours: options.Colour || options.Color || options.colour || options.color || [],
    availabilityState: product.availableForSale ? "Available" : "Unavailable",
    description: product.description || "",
    imagePaths: images.map((image) => image.url),
    images,
    variants: variants.map((variant) => ({
      id: variant.id,
      title: variant.title,
      availableForSale: variant.availableForSale,
      price: variant.price,
      selectedOptions: variant.selectedOptions,
    })),
    structuredMetadata: {
      productType: product.productType || "",
      tags: product.tags || [],
      createdAt: product.createdAt || null,
    },
  };
}

function markdownForShopifySnapshot(data) {
  const rows = data.products
    .map((product) => {
      const price = product.price ? `${product.price.amount} ${product.price.currencyCode}` : "";
      return `| ${escapeCell(product.product)} | ${escapeCell(product.slug)} | ${escapeCell(product.category)} | ${escapeCell(price)} | ${escapeCell(product.sizes.join(", "))} | ${escapeCell(product.colours.join(", "))} | ${product.images.length} | ${escapeCell(product.availabilityState)} |`;
    })
    .join("\n");

  return `# Shopify Catalogue Snapshot

Generated: ${data.generatedAt}

Source: Shopify Storefront API

Total products: ${data.productCount}

| Product | Slug | Category | Price | Sizes | Colours | Images | Status |
|---|---|---|---|---|---|---|---|
${rows}
`;
}

function escapeCell(value) {
  return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function keyBySlug(products) {
  return new Map(products.map((product) => [product.slug, product]));
}

function jsonEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function compareArrays(name, before, after) {
  return {
    check: name,
    before: before.join(", "),
    after: after.join(", "),
    result: jsonEqual(before, after) ? "Pass" : "Fail",
  };
}

function compareToBaseline(before, after) {
  const beforeBySlug = keyBySlug(before.products);
  const afterBySlug = keyBySlug(after.products);
  const rows = [
    {
      check: "Total products",
      before: String(before.productCount),
      after: String(after.productCount),
      result: before.productCount === after.productCount ? "Pass" : "Fail",
    },
    compareArrays("Product slugs", before.products.map((p) => p.slug), after.products.map((p) => p.slug)),
  ];

  for (const slug of beforeBySlug.keys()) {
    const previous = beforeBySlug.get(slug);
    const current = afterBySlug.get(slug);
    if (!current) {
      rows.push({ check: `${slug} exists`, before: "Present", after: "Missing", result: "Fail" });
      continue;
    }
    rows.push({
      check: `${slug} price`,
      before: `${previous.priceAudMinor}/${previous.priceInrMinor}`,
      after: `${current.priceAudMinor}/${current.priceInrMinor}`,
      result:
        previous.priceAudMinor === current.priceAudMinor &&
        previous.priceInrMinor === current.priceInrMinor
          ? "Pass"
          : "Fail",
    });
    rows.push(compareArrays(`${slug} sizes`, previous.sizes, current.sizes));
    rows.push(
      compareArrays(
        `${slug} colours`,
        previous.colours.map((colour) => colour.key),
        current.colours.map((colour) => colour.key)
      )
    );
    rows.push(compareArrays(`${slug} images`, previous.imagePaths, current.imagePaths));
    rows.push({
      check: `${slug} category`,
      before: previous.category,
      after: current.category,
      result: previous.category === current.category ? "Pass" : "Fail",
    });
  }

  return rows;
}

function markdownForComparison(rows) {
  const body = rows
    .map((row) => `| ${escapeCell(row.check)} | ${escapeCell(row.before)} | ${escapeCell(row.after)} | ${row.result} |`)
    .join("\n");
  const failed = rows.filter((row) => row.result !== "Pass");

  return `# Catalogue Comparison

Generated: ${new Date().toISOString()}

| Check | Before | After | Result |
|---|---|---|---|
${body}

Result: ${failed.length ? `${failed.length} failing checks` : "All catalogue preservation checks passed"}
`;
}

function writeBaseline() {
  const data = snapshot();
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(BASELINE_JSON, `${JSON.stringify(data, null, 2)}\n`);
  writeFileSync(BASELINE_MD, markdownForSnapshot(data));
  console.log(`Wrote ${BASELINE_JSON}`);
  console.log(`Wrote ${BASELINE_MD}`);
}

function compare() {
  if (!existsSync(BASELINE_JSON)) {
    throw new Error("Run npm run catalog:audit before comparing.");
  }
  const before = JSON.parse(readFileSync(BASELINE_JSON, "utf8"));
  const after = snapshot();
  const rows = compareToBaseline(before, after);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(COMPARISON_MD, markdownForComparison(rows));
  const failed = rows.filter((row) => row.result !== "Pass");
  console.log(`Wrote ${COMPARISON_MD}`);
  if (failed.length) {
    console.error(`${failed.length} catalogue preservation checks failed.`);
    process.exit(1);
  }
}

async function writeShopifySnapshot() {
  if (!shopifyConfigured()) {
    throw new Error("SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN are required for a live Shopify audit.");
  }

  const products = await getProducts();
  const data = {
    generatedAt: new Date().toISOString(),
    source: "Shopify Storefront API",
    productCount: products.length,
    products: products.map(shopifyProductSnapshot),
  };

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(SHOPIFY_JSON, `${JSON.stringify(data, null, 2)}\n`);
  writeFileSync(SHOPIFY_MD, markdownForShopifySnapshot(data));
  console.log(`Wrote ${SHOPIFY_JSON}`);
  console.log(`Wrote ${SHOPIFY_MD}`);
}

const mode = process.argv[2] || "baseline";

if (mode === "baseline") writeBaseline();
else if (mode === "compare") compare();
else if (mode === "shopify") await writeShopifySnapshot();
else throw new Error(`Unknown catalog audit mode: ${mode}`);
