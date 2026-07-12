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
    name: "Copper dusk",
    base: "#9D4F24",
    accent: "#C8754A",
    weave: "#7F3F21",
    ink: "#FFF8ED",
  },
  "lotus-coral": {
    name: "Lotus coral",
    base: "#E66655",
    accent: "#F39B74",
    weave: "#D95C4C",
    ink: "#3A1E18",
  },
  "peacock-teal": {
    name: "Peacock teal",
    base: "#0F6C78",
    accent: "#31A3A7",
    weave: "#155B65",
    ink: "#F1FCFB",
  },
  "training-cobalt": {
    name: "Training cobalt",
    base: "#0057B8",
    accent: "#2F7EE6",
    weave: "#064C9A",
    ink: "#F7FBFF",
  },
  "locker-graphite": {
    name: "Locker graphite",
    base: "#30333A",
    accent: "#555B66",
    weave: "#25282F",
    ink: "#F5F6F8",
  },
  "clean-white": {
    name: "Clean white",
    base: "#F7F4EC",
    accent: "#FFFFFF",
    weave: "#E2DED3",
    ink: "#262A4E",
  },
  "saffron-sun": {
    name: "Copper sun",
    base: "#9D4F24",
    accent: "#C8754A",
    weave: "#7F3F21",
    ink: "#FFF8ED",
  },
  "twilight-amethyst": {
    name: "Twilight amethyst",
    base: "#6F2D86",
    accent: "#A05AB3",
    weave: "#793491",
    ink: "#F7ECFA",
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

export const PRODUCT_STATUSES = {
  "made-to-order": {
    label: "Made to order",
    publicState: "Made to order",
    checkoutPolicy: "Shopify variant required before payment",
  },
  "coming-soon": {
    label: "Coming soon",
    publicState: "Join for release",
    checkoutPolicy: "No checkout until approved",
  },
};

const DEFAULT_PRODUCT_STATUS = "made-to-order";

export function productStatus(product) {
  return product.status || DEFAULT_PRODUCT_STATUS;
}

function defaultUseMoments(product) {
  const moments = new Set();
  if (product.category === "Vyoma Pure") moments.add("Closest to Skin");
  if (product.category === "Accessories") moments.add("Travel");
  if (["Bottoms", "Tops", "Bras", "Sets"].includes(product.category)) moments.add("Train");
  if (["Layers", "Accessories"].includes(product.category)) moments.add("Recover");
  if (product.audience === "unisex" || product.catalogues?.includes("men")) moments.add("Travel");
  moments.add("Everyday");
  return Array.from(moments);
}

export function productStoryFields(product) {
  return {
    storyHeadline: product.storyHeadline || product.tagline,
    storySummary: product.storySummary || product.description,
    useMoments: product.useMoments || defaultUseMoments(product),
    fitSummary: product.fitSummary || product.fit,
    materialSummary: product.materialSummary || product.fabric,
    completeTheLookIds: product.completeTheLookIds || product.bundle || [],
  };
}

// ── Products ─────────────────────────────────────────────────────────────────
export const PRODUCTS = [
  {
    slug: "vyoma-high-rise-legging",
    name: "The Vyoma High-Rise Legging",
    tagline: "Sculpted hold, softer contact.",
    category: "Bottoms",
    audience: "women",
    hero: true,
    priceAud: 7900, // A$79
    priceInr: 240000, // ₹2,400
    description:
      "A high-rise practice legging with smooth natural stretch, steady coverage and a held feel that still lets the body breathe.",
    fabric: "Organic cotton performance knit with natural stretch. No polyester, nylon, elastane or spandex.",
    care: "Cold wash, line dry, skip the softener. Built for seasons, not weeks.",
    fit: "True to size, with a firm hold. Between sizes? Size down.",
    colourways: ["night-sky-indigo", "monsoon-grey", "marigold-dusk"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 7–14 days",
  },
  {
    slug: "vyoma-studio-top",
    name: "The Vyoma Studio Top",
    tagline: "Open-back studio layer.",
    category: "Tops",
    audience: "women",
    hero: false,
    priceAud: 5900, // A$59
    priceInr: 180000, // ₹1,800
    description:
      "Light as breath, with a back you'll want to be seen from. Cool enough for hot yoga, considered enough for the café after. Throw it on and forget it's there.",
    fabric: "Organic cotton-modal jersey that breathes with you. No polyester, nylon, elastane or spandex.",
    care: "Cold wash, line dry. The drape only gets better with wear.",
    fit: "Relaxed through the body. Size down for a closer fit.",
    colourways: ["dawn-rose", "ether", "night-sky-indigo"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 7–14 days",
  },
  {
    slug: "vyoma-rib-tank",
    name: "The Vyoma Rib Tank",
    tagline: "Branded rib, bright practice energy.",
    category: "Tops",
    audience: "women",
    hero: false,
    priceAud: 5200, // A$52
    priceInr: 160000, // ₹1,600
    description:
      "A fitted rib tank with the Vyoma mark stitched into the layer you reach for first. Soft organic cotton, lively colour, and enough structure to hold its shape through practice and the rest of the day.",
    fabric: "Organic cotton rib with natural recovery. No polyester, nylon, elastane or spandex.",
    care: "Cold wash, line dry. Wash inside out to protect the embroidery.",
    fit: "Close to the body with natural give. Size up for a softer studio fit.",
    colourways: ["lotus-coral", "peacock-teal", "night-sky-indigo", "ether"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 7–14 days",
  },
  {
    slug: "vyoma-practice-tee",
    name: "The Vyoma Practice Tee",
    tagline: "Training tee, all-day ease.",
    category: "Tops",
    audience: "unisex",
    catalogues: ["men"],
    mensGroup: "Training + Transit",
    shots: {
      model: "/products/vyoma-practice-tee/men-lifestyle.webp",
    },
    hero: false,
    priceAud: 5600, // A$56
    priceInr: 170000, // ₹1,700
    description:
      "A breathable training tee with a clean Vyoma mark, made for the session, the commute and the plans after.",
    fabric: "Organic cotton-modal jersey with a soft hand and easy drape.",
    care: "Cold wash, line dry. The jersey softens with wear.",
    fit: "Relaxed through the body. Take your usual size for an easy fit.",
    colourways: ["peacock-teal", "training-cobalt", "saffron-sun", "locker-graphite"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 7–14 days",
  },
  {
    slug: "vyoma-the-set",
    name: "The Vyoma Set",
    tagline: "The complete practice layer.",
    category: "Sets",
    audience: "women",
    hero: true,
    bundle: ["vyoma-high-rise-legging", "vyoma-studio-top"],
    priceAud: 12900, // A$129
    priceInr: 390000, // ₹3,900
    description:
      "The High-Rise Legging and Studio Top, paired for a practice kit that feels considered before, during and after movement.",
    fabric: "Organic cotton performance knit and cotton-modal jersey. No polyester, nylon, elastane or spandex.",
    care: "Cold wash, line dry, skip the softener.",
    fit: "Order your usual size in both. Mixing sizes? Leave us a note at checkout.",
    colourways: ["night-sky-indigo", "dawn-rose", "marigold-dusk"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 10–16 days",
  },
  {
    slug: "vyoma-akasha-wrap",
    name: "The Akasha Wrap",
    tagline: "Post-practice drape.",
    category: "Layers",
    audience: "women",
    hero: false,
    priceAud: 8900, // A$89
    priceInr: 290000, // ₹2,900
    description:
      "Akasha — Sanskrit for the space that holds everything. An open, drapey layer for the walk home and the slow cool-down. Throw it on; you won't want to take it off.",
    fabric: "Organic cotton with a soft, brushed inside.",
    care: "Cold wash, dry flat to keep its shape.",
    fit: "One relaxed, generous cut. Drapes beautifully on every body.",
    colourways: ["monsoon-grey", "ether", "night-sky-indigo"],
    sizes: ["XS/S", "M/L", "XL"],
    leadTime: "Made to order · ships in 10–16 days",
  },
  {
    slug: "vyoma-mat-bag",
    name: "The Vyoma Gym Carry",
    tagline: "The copper kit bag.",
    category: "Accessories",
    audience: "unisex",
    catalogues: ["men"],
    mensGroup: "Carry + Socks",
    shots: {
      model: "/products/vyoma-mat-bag/men-lifestyle.webp",
    },
    hero: false,
    priceAud: 3900, // A$39
    priceInr: 120000, // ₹1,200
    description:
      "A heavyweight canvas carry for trainers, towel, bottle and the layer you throw on after. The colour hit that makes the kit feel alive.",
    fabric: "Heavyweight organic cotton canvas, screen-printed by hand in India.",
    care: "Spot clean, or a cold hand wash when it needs one.",
    fit: "Roomy enough for gym kit, spare layers and a long weekend reset.",
    colourways: ["saffron-sun", "training-cobalt", "night-sky-indigo", "ether"],
    sizes: ["One size"],
    leadTime: "Made to order · ships in 7–12 days",
  },
  {
    slug: "vyoma-78-legging",
    name: "The 7/8 Legging",
    tagline: "Cropped sculpted hold.",
    category: "Bottoms",
    audience: "women",
    hero: false,
    priceAud: 7500, // A$75
    priceInr: 230000, // ₹2,300
    description:
      "The High-Rise, cropped to the ankle. The same no-slip waist and natural hold, cut a little shorter for warm studios and bare feet on the mat.",
    fabric: "Organic cotton performance knit with natural stretch. No polyester, nylon, elastane or spandex.",
    care: "Cold wash, line dry, skip the softener.",
    fit: "True to size, with a firm hold. Between sizes? Size down.",
    colourways: ["twilight-amethyst", "night-sky-indigo", "dawn-rose", "ether"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 7–14 days",
  },
  {
    slug: "vyoma-bike-short",
    name: "The Bike Short",
    tagline: "High-waist studio short.",
    category: "Bottoms",
    audience: "women",
    hero: false,
    priceAud: 5500, // A$55
    priceInr: 170000, // ₹1,700
    description:
      "High-waisted, squat-proof, and long enough to forget you're wearing them. For lifting days, hot flows and the long ride home.",
    fabric: "Organic cotton performance knit with natural stretch. No polyester, nylon, elastane or spandex.",
    care: "Cold wash, line dry, skip the softener.",
    fit: "True to size, compressive. Between sizes? Size down.",
    colourways: ["night-sky-indigo", "monsoon-grey", "marigold-dusk"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 7–14 days",
  },
  {
    slug: "vyoma-crescent-skort",
    name: "The Crescent Skort",
    tagline: "Studio coverage, sky-bright colour.",
    category: "Bottoms",
    audience: "women",
    hero: false,
    priceAud: 6900, // A$69
    priceInr: 210000, // ₹2,100
    description:
      "A high-waist active skort with a soft crescent wrap front and built-in short. Made for summer practice, long walks and days when leggings feel like too much.",
    fabric: "Organic cotton performance knit with a lightweight cotton inner short.",
    care: "Cold wash, line dry, skip the softener.",
    fit: "True to size with secure waist coverage. Between sizes? Size up.",
    colourways: ["saffron-sun", "lotus-coral", "night-sky-indigo"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 7–14 days",
  },
  {
    slug: "vyoma-cloud-bra",
    name: "The Cloud Bra",
    tagline: "Light support, soft hold.",
    category: "Bras",
    audience: "women",
    hero: false,
    priceAud: 4900, // A$49
    priceInr: 150000, // ₹1,500
    description:
      "Light support for slow flows and easy days. A soft, wide band, a clean back, and nothing that digs in. The one you forget you have on.",
    fabric: "Organic cotton performance knit with a soft brushed band. No polyester, nylon, elastane or spandex.",
    care: "Cold wash, line dry. Remove pads before washing.",
    fit: "Light support. Size up between sizes for a softer fit.",
    colourways: ["dawn-rose", "ether", "night-sky-indigo"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 7–14 days",
  },
  {
    slug: "vyoma-flow-bra",
    name: "The Flow Bra",
    tagline: "Medium support, clean lines.",
    category: "Bras",
    audience: "women",
    hero: false,
    priceAud: 5900, // A$59
    priceInr: 180000, // ₹1,800
    description:
      "Medium support with a sculpted band and a back you'll want to show. Steady enough for power flows, soft enough to wear all day.",
    fabric: "Organic cotton performance knit with a supportive band. No polyester, nylon, elastane or spandex.",
    care: "Cold wash, line dry. Remove pads before washing.",
    fit: "Medium support. True to size.",
    colourways: ["night-sky-indigo", "monsoon-grey", "marigold-dusk"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 7–14 days",
  },
  {
    slug: "vyoma-jogger",
    name: "The Off-Duty Jogger",
    tagline: "Tapered comfort after training.",
    category: "Bottoms",
    audience: "unisex",
    catalogues: ["men"],
    mensGroup: "Training + Transit",
    shots: {
      model: "/products/vyoma-jogger/men-lifestyle.webp",
    },
    hero: false,
    priceAud: 8900, // A$89
    priceInr: 290000, // ₹2,900
    description:
      "Soft, tapered and clean enough to keep on after the session. Built for training days, travel days and the hours after.",
    fabric: "Organic cotton fleece with a brushed inside.",
    care: "Cold wash, line dry to keep the softness.",
    fit: "Relaxed, tapered leg. Size down for a slimmer fit.",
    colourways: ["locker-graphite", "night-sky-indigo", "training-cobalt", "clean-white"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 10–16 days",
  },
  {
    slug: "vyoma-meditation-hoodie",
    name: "The Recovery Hoodie",
    tagline: "Heavy fleece, calmer recovery.",
    category: "Layers",
    audience: "unisex",
    catalogues: ["men"],
    mensGroup: "Recovery",
    shots: {
      model: "/products/vyoma-meditation-hoodie/men-lifestyle.webp",
    },
    hero: false,
    priceAud: 9900, // A$99
    priceInr: 320000, // ₹3,200
    description:
      "A relaxed fleece hoodie with a clean Vyoma mark, made for cool-downs, late starts, airport layers and weekend plans.",
    fabric: "Organic cotton fleece with a brushed inner face and ribbed cuffs.",
    care: "Cold wash inside out, line dry. Do not tumble dry the embroidery.",
    fit: "Oversized and relaxed. Size down for a closer layer.",
    colourways: ["training-cobalt", "night-sky-indigo", "peacock-teal", "saffron-sun"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 10–16 days",
  },
  {
    slug: "vyoma-pure-brief-women",
    name: "Vyoma Pure Brief — Women",
    tagline: "Softest where it matters.",
    category: "Vyoma Pure",
    audience: "women",
    hero: false,
    priceAud: 2500, // A$25
    priceInr: 80000, // ₹800
    description:
      "The layer closest to you, made softer. Breathable organic cotton with a gentle waistband and plain material language.",
    fabric: "Organic cotton, soft and breathable.",
    care: "Cold wash, line dry.",
    fit: "True to size, sits at the natural waist.",
    colourways: ["ether", "night-sky-indigo", "dawn-rose"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made in India · ships in 7–14 days",
  },
  {
    slug: "vyoma-pure-cami",
    name: "Vyoma Pure Cami",
    tagline: "The branded everyday base.",
    category: "Vyoma Pure",
    audience: "women",
    hero: false,
    priceAud: 3900, // A$39
    priceInr: 120000, // ₹1,200
    description:
      "A soft rib cami for the first layer of the day. Clean straps, an easy neckline and a small Vyoma mark at the hem so even the basics feel considered.",
    fabric: "Organic cotton rib, soft and breathable.",
    care: "Cold wash, line dry. Wash inside out to protect the logo stitch.",
    fit: "Close but not compressive. Size up for a softer lounge fit.",
    colourways: ["lotus-coral", "ether", "night-sky-indigo"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made in India · ships in 7–14 days",
  },
  {
    slug: "vyoma-pure-trunk-men",
    name: "Vyoma Pure Trunk — Men",
    tagline: "Base layer, made calmer.",
    category: "Vyoma Pure",
    audience: "men",
    catalogues: ["men"],
    mensGroup: "Base Layer",
    shots: {
      model: "/products/vyoma-pure-trunk-men/men-lifestyle.webp",
    },
    hero: false,
    priceAud: 2700, // A$27
    priceInr: 85000, // ₹850
    description:
      "Breathable daily comfort under the whole activewear kit. Soft organic cotton where the day starts closest to skin.",
    fabric: "Organic cotton, breathable and soft.",
    care: "Cold wash, line dry.",
    fit: "True to size, supportive without digging in.",
    colourways: ["night-sky-indigo", "locker-graphite", "clean-white", "training-cobalt"],
    sizes: ["S", "M", "L", "XL"],
    leadTime: "Made in India · ships in 7–14 days",
  },
  {
    slug: "vyoma-organic-crew-sock",
    name: "The Organic Crew Sock",
    tagline: "The colour hit.",
    category: "Accessories",
    audience: "unisex",
    catalogues: ["men"],
    mensGroup: "Carry + Socks",
    shots: {
      model: "/products/vyoma-organic-crew-sock/men-lifestyle.webp",
    },
    hero: false,
    priceAud: 1900, // A$19
    priceInr: 60000, // ₹600
    description:
      "Soft organic cotton crew socks with a branded cuff and contrast stripe, made to lift sneakers, joggers and the weekend bag.",
    fabric: "Organic cotton-rich knit with a cushioned sole and ribbed cuff.",
    care: "Cold wash, line dry. Keep pairs together for a longer life.",
    fit: "Soft crew height with gentle hold at the cuff.",
    colourways: ["clean-white", "training-cobalt", "saffron-sun", "night-sky-indigo"],
    sizes: ["S/M", "M/L"],
    leadTime: "Made in India · ships in 7–12 days",
  },
];

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

export function catalogueProducts(catalogue) {
  return PRODUCTS.filter((p) => p.catalogues?.includes(catalogue));
}

export function mensCatalogueProducts() {
  return catalogueProducts("men");
}

export function womenCatalogueProducts() {
  return PRODUCTS.filter((p) => p.audience === "women");
}

export function pureProductsForAudience(audience) {
  return PRODUCTS.filter((p) => p.category === "Vyoma Pure" && p.audience === audience);
}

export function relatedProducts(slug, n = 3, options = {}) {
  const current = getProduct(slug);
  const catalogue = options.catalogue || current?.catalogues?.[0];
  const pool = catalogue ? catalogueProducts(catalogue) : PRODUCTS;
  const related = pool.filter((p) => p.slug !== slug);

  if (related.length >= n) return related.slice(0, n);
  return [
    ...related,
    ...PRODUCTS.filter((p) => p.slug !== slug && !related.some((r) => r.slug === p.slug)),
  ].slice(0, n);
}

// Validate a colourway for a product (defensive — used server-side at checkout).
export function isValidColourway(product, key) {
  return product.colourways.includes(key);
}

const VERIFIED_PRODUCT_SHOTS = {
  "vyoma-high-rise-legging": [
    { slot: "back", file: "back.webp", role: "back", angle: "back", label: "back view" },
  ],
  "vyoma-cloud-bra": [
    { slot: "detail", file: "detail.webp", role: "detail", angle: "material", label: "material detail" },
  ],
  "vyoma-the-set": [
    { slot: "detail", file: "detail.webp", role: "detail", angle: "material", label: "material detail" },
  ],
};

function primaryShotLabel(product) {
  if (product.category === "Accessories") return "lifestyle view";
  return "worn view";
}

function createShot(product, { slot, src, fallbackSrc, role, angle, label }) {
  return {
    slot,
    role,
    angle,
    src,
    fallbackSrc,
    alt: `${product.name}, ${label}`,
    verified: true,
  };
}

function addUniqueShot(shots, shot) {
  if (!shot.src || shots.some((existing) => existing.src === shot.src)) return;
  shots.push(shot);
}

// Product galleries expose only verified unique assets. Missing back/detail/
// colour views are tracked by missingImageRoles() instead of being simulated by
// repeating the primary photograph under a false label.
export function productShots(product) {
  const base = `/products/${product.slug}`;
  const configured = product.shots || {};
  const shots = [];

  addUniqueShot(
    shots,
    createShot(product, {
      slot: "model",
      role: product.category === "Accessories" ? "lifestyle" : "worn",
      angle: product.category === "Accessories" ? "lifestyle" : "front-three-quarter",
      label: primaryShotLabel(product),
      src: configured.model || `${base}/model.webp`,
      fallbackSrc: configured.model ? undefined : `${base}/model.png`,
    })
  );

  for (const shot of VERIFIED_PRODUCT_SHOTS[product.slug] || []) {
    addUniqueShot(
      shots,
      createShot(product, {
        ...shot,
        src: `${base}/${shot.file}`,
        fallbackSrc: `${base}/model.webp`,
      })
    );
  }

  for (const slot of ["back", "detail", "lifestyle"]) {
    if (!configured[slot]) continue;
    addUniqueShot(
      shots,
      createShot(product, {
        slot,
        role: slot,
        angle: slot,
        label: slot === "detail" ? "material detail" : `${slot} view`,
        src: configured[slot],
      })
    );
  }

  return shots;
}

export function missingImageRoles(product) {
  const present = new Set(productShots(product).map((shot) => shot.role));
  const expected =
    product.category === "Accessories"
      ? ["lifestyle", "product", "reverse", "detail", "travel", "recovery"]
      : ["worn", "back", "detail", "movement", "daily-life", "colour", "complete-look"];

  return expected.filter((role) => !present.has(role));
}
