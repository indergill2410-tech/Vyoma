// Catalog as code. Prices live HERE on the server — the client never sets a price.
// Amounts are in minor units: cents (AUD) and paise (INR).
//
// Two markets, one product. priceAud serves Australia, priceInr serves India.
// See lib/regions.js.

// ── Colourways ───────────────────────────────────────────────────────────────
// Vyoma means sky / ether. Every colour is a moment in the sky. Each one renders
// as a generated gradient "swatch".
export const COLOURWAYS = {
  "night-sky-indigo": {
    name: "Night-sky indigo",
    base: "#262A4E",
    accent: "#3A3F66",
    weave: "#2A2E54",
    ink: "#EDEFF3",
  },
  "dawn-rose": {
    name: "Dawn rose",
    base: "#D1998F",
    accent: "#E4BCB5",
    weave: "#D9A8A0",
    ink: "#3A2420",
  },
  "monsoon-grey": {
    name: "Monsoon grey",
    base: "#6B7280",
    accent: "#9AA3AE",
    weave: "#737B86",
    ink: "#F5F6F8",
  },
  "marigold-dusk": {
    name: "Marigold dusk",
    base: "#C98A22",
    accent: "#E9AC3F",
    weave: "#D99A2B",
    ink: "#2A1D05",
  },
  ether: {
    name: "Ether",
    base: "#E7E3DA",
    accent: "#F3F0E9",
    weave: "#DED9CE",
    ink: "#3A3F66",
  },
};

// Build the CSS background for a colourway's generated swatch.
export function swatchStyle(colourwayKey) {
  const c = COLOURWAYS[colourwayKey] || COLOURWAYS["night-sky-indigo"];
  return {
    background: `radial-gradient(120% 90% at 20% 10%, ${c.accent} 0%, transparent 55%), repeating-linear-gradient(115deg, ${c.weave} 0 3px, ${c.base} 3px 6px)`,
  };
}

// ── Products ─────────────────────────────────────────────────────────────────
export const PRODUCTS = [
  {
    slug: "vyoma-high-rise-legging",
    name: "The Vyoma High-Rise Legging",
    tagline: "The one you'll live in.",
    category: "Bottoms",
    hero: true,
    priceAud: 7900, // A$79
    priceInr: 240000, // ₹2,400
    description:
      "A second skin that stays put. Buttery stretch, a high waist that never tugs and never slides — through every fold, flow and upside-down moment. Opaque, always. You have our word.",
    fabric: "Recycled four-way-stretch knit. Soft on skin, tested safe.",
    care: "Cold wash, line dry, skip the softener. Built for seasons, not weeks.",
    fit: "True to size, with a firm hold. Between sizes? Size down.",
    colourways: ["night-sky-indigo", "monsoon-grey", "marigold-dusk"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made for you · ships in 7–14 days",
  },
  {
    slug: "vyoma-studio-top",
    name: "The Vyoma Studio Top",
    tagline: "Studio to street.",
    category: "Tops",
    hero: false,
    priceAud: 5900, // A$59
    priceInr: 180000, // ₹1,800
    description:
      "Light as breath, with a back you'll want to be seen from. Cool enough for hot yoga, considered enough for the café after. Throw it on and forget it's there.",
    fabric: "A cotton-soft modal blend that breathes with you.",
    care: "Cold wash, line dry. The drape only gets better with wear.",
    fit: "Relaxed through the body. Size down for a closer fit.",
    colourways: ["dawn-rose", "ether", "night-sky-indigo"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made for you · ships in 7–14 days",
  },
  {
    slug: "vyoma-the-set",
    name: "The Vyoma Set",
    tagline: "Everything, together.",
    category: "Sets",
    hero: true,
    bundle: ["vyoma-high-rise-legging", "vyoma-studio-top"],
    priceAud: 12900, // A$129
    priceInr: 390000, // ₹3,900
    description:
      "The High-Rise Legging and the Studio Top, made to move as one. Your whole practice, in a single box. Open it, put it on, go.",
    fabric: "Both pieces. One feeling. Soft on skin, tested safe.",
    care: "Cold wash, line dry, skip the softener.",
    fit: "Order your usual size in both. Mixing sizes? Leave us a note at checkout.",
    colourways: ["night-sky-indigo", "dawn-rose", "marigold-dusk"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made for you · ships in 10–16 days",
  },
  {
    slug: "vyoma-akasha-wrap",
    name: "The Akasha Wrap",
    tagline: "The layer for after.",
    category: "Layers",
    hero: false,
    priceAud: 8900, // A$89
    priceInr: 290000, // ₹2,900
    description:
      "Akasha — Sanskrit for the space that holds everything. An open, drapey layer for the walk home and the slow cool-down. Throw it on; you won't want to take it off.",
    fabric: "Organic cotton with a soft, brushed inside. Skin-safe, tested.",
    care: "Cold wash, dry flat to keep its shape.",
    fit: "One relaxed, generous cut. Drapes beautifully on every body.",
    colourways: ["monsoon-grey", "ether", "night-sky-indigo"],
    sizes: ["XS/S", "M/L", "XL"],
    leadTime: "Made for you · ships in 10–16 days",
  },
  {
    slug: "vyoma-mat-bag",
    name: "The Vyoma Mat Carry",
    tagline: "Carry the calm.",
    category: "Accessories",
    hero: false,
    priceAud: 3900, // A$39
    priceInr: 120000, // ₹1,200
    description:
      "A clean, adjustable sling in heavyweight canvas, screen-printed with व्योम. Sling your mat over your shoulder and go — the quiet finish to your kit.",
    fabric: "Heavyweight cotton canvas, screen-printed by hand in India.",
    care: "Spot clean, or a cold hand wash when it needs one.",
    fit: "Fits most mats, standard or thick. Fully adjustable strap.",
    colourways: ["ether", "night-sky-indigo", "marigold-dusk"],
    sizes: ["One size"],
    leadTime: "Made for you · ships in 7–12 days",
  },
  {
    slug: "vyoma-78-legging",
    name: "The 7/8 Legging",
    tagline: "Ankle-length freedom.",
    category: "Bottoms",
    hero: false,
    priceAud: 7500, // A$75
    priceInr: 230000, // ₹2,300
    description:
      "The High-Rise, cropped to the ankle. The same no-slip waist and buttery hold, cut a little shorter for warm studios and bare feet on the mat.",
    fabric: "Recycled four-way-stretch knit. Soft on skin, tested safe.",
    care: "Cold wash, line dry, skip the softener.",
    fit: "True to size, with a firm hold. Between sizes? Size down.",
    colourways: ["night-sky-indigo", "dawn-rose", "ether"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made for you · ships in 7–14 days",
  },
  {
    slug: "vyoma-bike-short",
    name: "The Bike Short",
    tagline: "Short, never short-changed.",
    category: "Bottoms",
    hero: false,
    priceAud: 5500, // A$55
    priceInr: 170000, // ₹1,700
    description:
      "High-waisted, squat-proof, and long enough to forget you're wearing them. For lifting days, hot flows and the long ride home.",
    fabric: "Recycled four-way-stretch knit. Soft on skin, tested safe.",
    care: "Cold wash, line dry, skip the softener.",
    fit: "True to size, compressive. Between sizes? Size down.",
    colourways: ["night-sky-indigo", "monsoon-grey", "marigold-dusk"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made for you · ships in 7–14 days",
  },
  {
    slug: "vyoma-cloud-bra",
    name: "The Cloud Bra",
    tagline: "Barely-there support.",
    category: "Bras",
    hero: false,
    priceAud: 4900, // A$49
    priceInr: 150000, // ₹1,500
    description:
      "Light support for slow flows and easy days. A soft, wide band, a clean back, and nothing that digs in. The one you forget you have on.",
    fabric: "Recycled stretch knit with a soft brushed band. Tested safe.",
    care: "Cold wash, line dry. Remove pads before washing.",
    fit: "Light support. Size up between sizes for a softer fit.",
    colourways: ["dawn-rose", "ether", "night-sky-indigo"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made for you · ships in 7–14 days",
  },
  {
    slug: "vyoma-flow-bra",
    name: "The Flow Bra",
    tagline: "Hold for the harder days.",
    category: "Bras",
    hero: false,
    priceAud: 5900, // A$59
    priceInr: 180000, // ₹1,800
    description:
      "Medium support with a sculpted band and a back you'll want to show. Steady enough for power flows, soft enough to wear all day.",
    fabric: "Recycled four-way-stretch knit, supportive band. Tested safe.",
    care: "Cold wash, line dry. Remove pads before washing.",
    fit: "Medium support. True to size.",
    colourways: ["night-sky-indigo", "monsoon-grey", "marigold-dusk"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made for you · ships in 7–14 days",
  },
  {
    slug: "vyoma-jogger",
    name: "The Off-Duty Jogger",
    tagline: "For the after.",
    category: "Bottoms",
    hero: false,
    priceAud: 8900, // A$89
    priceInr: 290000, // ₹2,900
    description:
      "Soft, tapered and quietly perfect for the walk home, the rest day, the everything-else. The jogger you'll reach for long after the mat is rolled up.",
    fabric: "Organic cotton fleece with a brushed inside. Skin-safe, tested.",
    care: "Cold wash, line dry to keep the softness.",
    fit: "Relaxed, tapered leg. Size down for a slimmer fit.",
    colourways: ["monsoon-grey", "night-sky-indigo", "ether"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made for you · ships in 10–16 days",
  },
];

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

export function relatedProducts(slug, n = 3) {
  return PRODUCTS.filter((p) => p.slug !== slug).slice(0, n);
}

// Validate a colourway for a product (defensive — used server-side at checkout).
export function isValidColourway(product, key) {
  return product.colourways.includes(key);
}

// Photo slots per product: an on-model shot and a fabric/detail shot. Files live
// at /public/products/<slug>/<slot>.png and are produced by scripts/generate-images.mjs.
// Until a file exists, the UI falls back to the generated colourway swatch.
export function productShots(product) {
  const base = `/products/${product.slug}`;
  return [
    { slot: "model", src: `${base}/model.png`, alt: `${product.name}, worn` },
    { slot: "detail", src: `${base}/detail.png`, alt: `${product.name}, fabric detail` },
  ];
}
