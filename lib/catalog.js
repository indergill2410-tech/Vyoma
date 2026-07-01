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
  "saffron-sun": {
    name: "Saffron sun",
    base: "#E69A18",
    accent: "#FFC45A",
    weave: "#D98712",
    ink: "#302006",
  },
  "twilight-amethyst": {
    name: "Twilight amethyst",
    base: "#6F2D86",
    accent: "#A05AB3",
    weave: "#793491",
    ink: "#F7ECFA",
  },
  "clear-sky-blue": {
    name: "Clear-sky blue",
    base: "#2F8EDB",
    accent: "#74C4F3",
    weave: "#2B7FC3",
    ink: "#F6FBFF",
  },
  "mango-pop": {
    name: "Mango pop",
    base: "#F2B544",
    accent: "#FFD978",
    weave: "#E69A18",
    ink: "#31200A",
  },
  "hibiscus-pink": {
    name: "Hibiscus pink",
    base: "#D9468F",
    accent: "#F27AB3",
    weave: "#C7347B",
    ink: "#FFF3F8",
  },
  "parrot-green": {
    name: "Parrot green",
    base: "#76B947",
    accent: "#B7DD62",
    weave: "#639E3A",
    ink: "#16310C",
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
    tagline: "Sculpted organic performance.",
    category: "Bottoms",
    audience: "women",
    hero: true,
    priceAud: 7900, // A$79
    priceInr: 240000, // ₹2,400
    description:
      "A second skin that stays put. Smooth natural stretch, a high waist that never tugs and never slides — through every fold, flow and upside-down moment. Opaque, always. You have our word.",
    fabric: "Organic cotton performance knit with natural stretch. No polyester, nylon, elastane or spandex.",
    care: "Cold wash, line dry, skip the softener. Built for seasons, not weeks.",
    fit: "True to size, with a firm hold. Between sizes? Size down.",
    colourways: ["hibiscus-pink", "night-sky-indigo", "peacock-teal", "monsoon-grey", "marigold-dusk"],
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
    colourways: ["clear-sky-blue", "dawn-rose", "ether", "night-sky-indigo"],
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
    colourways: ["lotus-coral", "parrot-green", "peacock-teal", "night-sky-indigo", "ether"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 7–14 days",
  },
  {
    slug: "vyoma-practice-tee",
    name: "The Vyoma Practice Tee",
    tagline: "Lived-in softness, clean branding.",
    category: "Tops",
    audience: "women",
    hero: false,
    priceAud: 5600, // A$56
    priceInr: 170000, // ₹1,700
    description:
      "A breathable practice tee with a relaxed drape and a clean Vyoma chest mark. Built for warm-ups, travel days and the coffee after class.",
    fabric: "Organic cotton-modal jersey with a soft hand and easy drape.",
    care: "Cold wash, line dry. The jersey softens with wear.",
    fit: "Relaxed through the body. Take your usual size for an easy fit.",
    colourways: ["peacock-teal", "hibiscus-pink", "lotus-coral", "monsoon-grey", "ether"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 7–14 days",
  },
  {
    slug: "vyoma-the-set",
    name: "The Vyoma Set",
    tagline: "The full practice uniform.",
    category: "Sets",
    audience: "women",
    hero: true,
    bundle: ["vyoma-high-rise-legging", "vyoma-studio-top"],
    priceAud: 12900, // A$129
    priceInr: 390000, // ₹3,900
    description:
      "The High-Rise Legging and the Studio Top, made to move as one. Your whole practice, in a single box. Open it, put it on, go.",
    fabric: "Organic cotton performance knit and cotton-modal jersey. No polyester, nylon, elastane or spandex.",
    care: "Cold wash, line dry, skip the softener.",
    fit: "Order your usual size in both. Mixing sizes? Leave us a note at checkout.",
    colourways: ["hibiscus-pink", "clear-sky-blue", "night-sky-indigo", "dawn-rose", "marigold-dusk"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 10–16 days",
  },
  {
    slug: "vyoma-akasha-wrap",
    name: "The Akasha Wrap",
    tagline: "Post-practice drape.",
    category: "Layers",
    audience: "unisex",
    hero: false,
    priceAud: 8900, // A$89
    priceInr: 290000, // ₹2,900
    description:
      "Akasha — Sanskrit for the space that holds everything. An open, drapey layer for the walk home and the slow cool-down. Throw it on; you won't want to take it off.",
    fabric: "Organic cotton with a soft, brushed inside.",
    care: "Cold wash, dry flat to keep its shape.",
    fit: "One relaxed, generous cut. Drapes beautifully on every body.",
    colourways: ["clear-sky-blue", "ether", "monsoon-grey", "night-sky-indigo"],
    sizes: ["XS/S", "M/L", "XL"],
    leadTime: "Made to order · ships in 10–16 days",
  },
  {
    slug: "vyoma-mat-bag",
    name: "The Vyoma Mat Carry",
    tagline: "Carry the calm.",
    category: "Accessories",
    audience: "unisex",
    hero: false,
    priceAud: 3900, // A$39
    priceInr: 120000, // ₹1,200
    description:
      "A clean, adjustable sling in heavyweight canvas, screen-printed with व्योम. Sling your mat over your shoulder and go — the quiet finish to your kit.",
    fabric: "Heavyweight organic cotton canvas, screen-printed by hand in India.",
    care: "Spot clean, or a cold hand wash when it needs one.",
    fit: "Fits most mats, standard or thick. Fully adjustable strap.",
    colourways: ["mango-pop", "ether", "night-sky-indigo", "marigold-dusk"],
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
    colourways: ["twilight-amethyst", "clear-sky-blue", "night-sky-indigo", "dawn-rose", "ether"],
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
    colourways: ["clear-sky-blue", "night-sky-indigo", "mango-pop", "monsoon-grey", "marigold-dusk"],
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
    colourways: ["saffron-sun", "lotus-coral", "hibiscus-pink", "night-sky-indigo"],
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
    colourways: ["hibiscus-pink", "dawn-rose", "ether", "night-sky-indigo"],
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
    colourways: ["peacock-teal", "night-sky-indigo", "mango-pop", "monsoon-grey", "marigold-dusk"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 7–14 days",
  },
  {
    slug: "vyoma-jogger",
    name: "The Off-Duty Jogger",
    tagline: "Tailored off-duty layer.",
    category: "Bottoms",
    audience: "unisex",
    hero: false,
    priceAud: 8900, // A$89
    priceInr: 290000, // ₹2,900
    description:
      "Soft, tapered and quietly perfect for the walk home, the rest day, the everything-else. The jogger you'll reach for long after the mat is rolled up.",
    fabric: "Organic cotton fleece with a brushed inside.",
    care: "Cold wash, line dry to keep the softness.",
    fit: "Relaxed, tapered leg. Size down for a slimmer fit.",
    colourways: ["clear-sky-blue", "monsoon-grey", "night-sky-indigo", "ether"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 10–16 days",
  },
  {
    slug: "vyoma-meditation-hoodie",
    name: "The Meditation Hoodie",
    tagline: "Premium fleece, visible Vyoma.",
    category: "Layers",
    audience: "unisex",
    hero: false,
    priceAud: 9900, // A$99
    priceInr: 320000, // ₹3,200
    description:
      "A relaxed organic fleece hoodie with raised Vyoma embroidery across the chest. Warm after practice, sharp enough for the street, and made with the colour confidence the brand deserves.",
    fabric: "Organic cotton fleece with a brushed inner face and ribbed cuffs.",
    care: "Cold wash inside out, line dry. Do not tumble dry the embroidery.",
    fit: "Oversized and relaxed. Size down for a closer layer.",
    colourways: ["peacock-teal", "twilight-amethyst", "hibiscus-pink", "night-sky-indigo"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Made to order · ships in 10–16 days",
  },
  {
    slug: "vyoma-pure-brief-women",
    name: "Vyoma Pure Brief — Women",
    tagline: "The cleanest layer.",
    category: "Vyoma Pure",
    audience: "women",
    hero: false,
    priceAud: 2500, // A$25
    priceInr: 80000, // ₹800
    description:
      "The layer closest to you, made clean. Soft, breathable organic cotton with a gentle waistband — designed without the plastics and harsh finishes of synthetic underwear.",
    fabric: "Organic cotton, soft and breathable.",
    care: "Cold wash, line dry.",
    fit: "True to size, sits at the natural waist.",
    colourways: ["hibiscus-pink", "ether", "night-sky-indigo", "dawn-rose"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Ships in 7–14 days",
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
    colourways: ["lotus-coral", "parrot-green", "ether", "night-sky-indigo"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Ships in 7–14 days",
  },
  {
    slug: "vyoma-pure-bikini-women",
    name: "Vyoma Pure Bikini — Women",
    tagline: "Low-profile daily softness.",
    category: "Vyoma Pure",
    audience: "women",
    photoModel: "female",
    photoExt: "png",
    hero: false,
    priceAud: 2400, // A$24
    priceInr: 75000, // ₹750
    description:
      "A lower-rise organic cotton bikini brief with a smooth edge and gentle everyday hold. Clean, breathable and made for long days on sensitive skin.",
    fabric: "Organic cotton jersey with a soft, low-bulk waistband.",
    care: "Cold wash, line dry. Wash dark colours separately.",
    fit: "Low rise with light coverage. True to size; size up if you prefer a softer waistband.",
    colourways: ["dawn-rose", "hibiscus-pink", "ether", "night-sky-indigo"],
    sizes: ["XS", "S", "M", "L", "XL"],
    leadTime: "Ships in 7–14 days",
  },
  {
    slug: "vyoma-pure-trunk-men",
    name: "Vyoma Pure Trunk — Men",
    tagline: "Made clean.",
    category: "Vyoma Pure",
    audience: "men",
    photoModel: "male",
    photoExt: "png",
    hero: false,
    priceAud: 2700, // A$27
    priceInr: 85000, // ₹850
    description:
      "Breathable, all-day comfort. Organic cotton with nothing synthetic where it counts — the everyday layer, made clean.",
    fabric: "Organic cotton, breathable and soft.",
    care: "Cold wash, line dry.",
    fit: "True to size, supportive without digging in.",
    colourways: ["clear-sky-blue", "night-sky-indigo", "monsoon-grey", "ether"],
    sizes: ["S", "M", "L", "XL"],
    leadTime: "Ships in 7–14 days",
  },
  {
    slug: "vyoma-pure-brief-men",
    name: "Vyoma Pure Brief — Men",
    tagline: "Clean support, less bulk.",
    category: "Vyoma Pure",
    audience: "men",
    photoModel: "male",
    photoExt: "png",
    hero: false,
    priceAud: 2500, // A$25
    priceInr: 80000, // ₹800
    description:
      "A classic organic cotton brief with a clean waistband, breathable front support and a lean cut under training shorts, denim and travel layers.",
    fabric: "Organic cotton jersey with a soft supportive pouch and covered elastic waistband.",
    care: "Cold wash, line dry. Avoid tumble drying to protect the waistband.",
    fit: "Close, supportive fit. Take your usual underwear size; size up between sizes.",
    colourways: ["peacock-teal", "night-sky-indigo", "monsoon-grey", "ether"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    leadTime: "Ships in 7–14 days",
  },
  {
    slug: "vyoma-mens-practice-tee",
    name: "The Men's Practice Tee",
    tagline: "Clean lines, quiet strength.",
    category: "Tops",
    audience: "men",
    photoModel: "male",
    photoExt: "png",
    hero: true,
    priceAud: 5900, // A$59
    priceInr: 180000, // ₹1,800
    description:
      "A premium organic cotton-modal tee cut for movement without clinging. Built for training, slow practice, travel and the clean hour after class.",
    fabric: "Organic cotton-modal jersey with a smooth hand and breathable drape.",
    care: "Cold wash, line dry. The jersey softens with wear.",
    fit: "Athletic regular fit through the chest and shoulder, easy through the body.",
    colourways: ["clear-sky-blue", "night-sky-indigo", "peacock-teal", "mango-pop", "ether"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    leadTime: "Made to order · ships in 7–14 days",
  },
  {
    slug: "vyoma-mens-movement-short",
    name: "The Men's Movement Short",
    tagline: "Studio short, street finish.",
    category: "Bottoms",
    audience: "men",
    photoModel: "male",
    photoExt: "png",
    hero: false,
    priceAud: 6900, // A$69
    priceInr: 210000, // ₹2,100
    description:
      "A clean mid-thigh movement short with a soft natural-fibre hand, secure waistband and enough structure for yoga, gym sessions and all-day wear.",
    fabric: "Organic cotton performance twill with natural stretch and a soft internal drawcord.",
    care: "Cold wash, line dry. Wash with similar colours.",
    fit: "Regular athletic fit, mid-thigh length. Size up for a relaxed lounge fit.",
    colourways: ["mango-pop", "night-sky-indigo", "monsoon-grey", "peacock-teal", "marigold-dusk"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    leadTime: "Made to order · ships in 7–14 days",
  },
  {
    slug: "vyoma-mens-jogger",
    name: "The Men's Off-Duty Jogger",
    tagline: "Tapered comfort, premium calm.",
    category: "Bottoms",
    audience: "men",
    photoModel: "male",
    photoExt: "png",
    hero: false,
    priceAud: 9200, // A$92
    priceInr: 300000, // ₹3,000
    description:
      "A tapered organic cotton fleece jogger with a clean line, soft brushed inside and enough polish to leave the studio without changing.",
    fabric: "Organic cotton fleece with ribbed cuffs and a soft brushed inner face.",
    care: "Cold wash inside out, line dry to keep the fleece smooth.",
    fit: "Relaxed through the thigh, tapered below the knee. Size down for a slimmer line.",
    colourways: ["peacock-teal", "monsoon-grey", "night-sky-indigo", "ether"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    leadTime: "Made to order · ships in 10–16 days",
  },
  {
    slug: "vyoma-mens-meditation-hoodie",
    name: "The Men's Meditation Hoodie",
    tagline: "A sharp layer for stillness.",
    category: "Layers",
    audience: "men",
    photoModel: "male",
    photoExt: "png",
    hero: false,
    priceAud: 10500, // A$105
    priceInr: 340000, // ₹3,400
    description:
      "A premium organic fleece hoodie with raised Vyoma embroidery and an easy athletic frame. Warm after practice, clean enough for the street.",
    fabric: "Organic cotton fleece with brushed inner face, ribbed cuffs and raised embroidery.",
    care: "Cold wash inside out, line dry. Do not tumble dry the embroidery.",
    fit: "Relaxed athletic fit. Size up for a heavier oversized look.",
    colourways: ["twilight-amethyst", "night-sky-indigo", "peacock-teal", "hibiscus-pink"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    leadTime: "Made to order · ships in 10–16 days",
  },
  {
    slug: "vyoma-organic-crew-sock",
    name: "The Organic Crew Sock",
    tagline: "A small hit of Vyoma colour.",
    category: "Accessories",
    audience: "unisex",
    hero: false,
    priceAud: 1900, // A$19
    priceInr: 60000, // ₹600
    description:
      "Soft organic cotton crew socks with a branded cuff, contrast heel and toe, and enough colour to lift the whole kit. Made for the studio floor, travel days and everything between.",
    fabric: "Organic cotton-rich knit with a cushioned sole and ribbed cuff.",
    care: "Cold wash, line dry. Keep pairs together for a longer life.",
    fit: "Soft crew height with gentle hold at the cuff.",
    colourways: ["mango-pop", "clear-sky-blue", "hibiscus-pink", "ether", "night-sky-indigo", "saffron-sun", "lotus-coral"],
    sizes: ["S/M", "M/L"],
    leadTime: "Ships in 7–12 days",
  },
];

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

export function productAudience(product) {
  if (!product) return "unisex";
  if (product.audience) return product.audience;
  if (/\bmen\b/i.test(product.name) || product.slug.endsWith("-men")) return "men";
  if (/\bwomen\b/i.test(product.name) || product.slug.endsWith("-women")) return "women";
  if (["Bras"].includes(product.category)) return "women";
  return "unisex";
}

export function audienceLabel(product) {
  const audience = productAudience(product);
  if (audience === "men") return "Men";
  if (audience === "women") return "Women";
  return "Unisex";
}

export function productsForAudience(audience, { includeUnisex = true } = {}) {
  return PRODUCTS.filter((product) => {
    const productFor = productAudience(product);
    return productFor === audience || (includeUnisex && productFor === "unisex");
  });
}

export function relatedProducts(slug, n = 3) {
  const product = getProduct(slug);
  if (!product) return PRODUCTS.filter((p) => p.slug !== slug).slice(0, n);

  const audience = productAudience(product);
  return PRODUCTS.filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aAudience = productAudience(a);
      const bAudience = productAudience(b);
      const aScore = (a.category === product.category ? 2 : 0) + (aAudience === audience || aAudience === "unisex" ? 1 : 0);
      const bScore = (b.category === product.category ? 2 : 0) + (bAudience === audience || bAudience === "unisex" ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, n);
}

// Validate a colourway for a product (defensive — used server-side at checkout).
export function isValidColourway(product, key) {
  return product.colourways.includes(key);
}

// Photo slots per product: on-model, back, and a fabric/detail shot. Files live
// at /public/products/<slug>/<slot>.webp, with PNG fallback generated by
// scripts/generate-images.mjs while final WebP assets are prepared.
export function productShots(product) {
  const base = `/products/${product.slug}`;
  const ext = product.photoExt || "webp";
  const fallbackExt = ext === "png" ? "webp" : "png";
  return [
    {
      slot: "model",
      src: `${base}/model.${ext}`,
      fallbackSrc: `${base}/model.${fallbackExt}`,
      alt: `${product.name}, worn`,
    },
    {
      slot: "back",
      src: `${base}/back.${ext}`,
      fallbackSrc: `${base}/back.${fallbackExt}`,
      alt: `${product.name}, back view`,
    },
    {
      slot: "detail",
      src: `${base}/detail.${ext}`,
      fallbackSrc: `${base}/detail.${fallbackExt}`,
      alt: `${product.name}, fabric detail`,
    },
  ];
}
