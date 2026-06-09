// Catalog as code. Prices live HERE on the server — the client never sets a price.
// Amounts are in minor units: cents (AUD) and paise (INR).
//
// Two markets, one product. priceAud serves Australia (Stripe), priceInr serves
// India. See lib/regions.js.

// ── Colourways ───────────────────────────────────────────────────────────────
// Vyoma means sky / ether. Every colour is a moment in the sky. Each one renders
// as a generated gradient "swatch" (no product photography needed pre-launch).
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
    tagline: "The squat-proof hero.",
    category: "Bottoms",
    hero: true,
    priceAud: 7900, // A$79
    priceInr: 240000, // ₹2,400
    description:
      "Our hero piece. A buttery four-way-stretch knit with a no-slip high waistband that stays put through every flow. Squat-proof opacity — tested, not promised.",
    fabric: "73% recycled poly · 27% elastane · OEKO-TEX Standard 100 certified",
    care: "Cold machine wash, line dry, no fabric softener. Made to last seasons, not weeks.",
    fit: "True to size, compressive. Between sizes? Size down for a firmer hold.",
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
      "A soft, breathable studio-to-street top with an easy drape and a back you'll want to be seen from. Light enough for hot yoga, considered enough for the café after.",
    fabric: "Cotton-rich modal blend · OEKO-TEX Standard 100 certified",
    care: "Cold machine wash, line dry. The drape only gets better with wear.",
    fit: "Relaxed through the body. Size down if you prefer a closer fit.",
    colourways: ["dawn-rose", "ether", "night-sky-indigo"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made for you · ships in 7–14 days",
  },
  {
    slug: "vyoma-the-set",
    name: "The Vyoma Set",
    tagline: "The legging + the top. Together.",
    category: "Sets",
    hero: true,
    bundle: ["vyoma-high-rise-legging", "vyoma-studio-top"],
    priceAud: 12900, // A$129 (save A$9)
    priceInr: 390000, // ₹3,900 (save ₹300)
    description:
      "The High-Rise Legging and the Studio Top, made to move as one. The complete practice, in one box — and a little kinder on the price than buying each alone.",
    fabric: "See each piece. Both OEKO-TEX Standard 100 certified.",
    care: "Cold machine wash, line dry, no fabric softener.",
    fit: "Order your usual size in both. Mix sizes? Leave us a note at checkout.",
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
      "Akasha — Sanskrit for sky, for ether, for the space that holds everything. An open, drapey layer for the walk home and the cool-down. Throw it on; never take it off.",
    fabric: "Organic cotton fleece-back · GOTS-track fibre · OEKO-TEX certified",
    care: "Cold machine wash, line dry flat to keep its shape.",
    fit: "One relaxed, generous cut. Drapes on every body.",
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
      "A clean, adjustable mat sling in heavyweight cotton canvas, screen-printed with व्योम. High margin, low risk, quietly beautiful — the accessory that finishes the kit.",
    fabric: "100% heavyweight cotton canvas · screen-printed in India",
    care: "Spot clean or cold hand wash.",
    fit: "Fits most standard and thick mats. Fully adjustable strap.",
    colourways: ["ether", "night-sky-indigo", "marigold-dusk"],
    sizes: ["One size"],
    leadTime: "Made for you · ships in 7–12 days",
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
