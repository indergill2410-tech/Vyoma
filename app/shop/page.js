import Link from "next/link";
import ShopGrid from "@/components/ShopGrid";
import ProductCard from "@/components/ProductCard";
import AmberProductStage from "@/components/AmberProductStage";
import { PRODUCTS } from "@/lib/catalog";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "Shop Vyomawear",
  description:
    "Shop Vyomawear natural-fibre activewear with clear fit notes, calm materials and tracked delivery across Australia.",
  alternates: { canonical: abs("/shop") },
};

const CATEGORY_LINKS = [
  { label: "Women", href: "/women", body: "Practice layers, soft support and sets that keep working after class." },
  { label: "Men", href: "/men", body: "Base layers, training pieces and recovery fleece for the full day." },
  { label: "Pure", href: "/pure", body: "Soft cotton-led basics for the layer closest to skin." },
  { label: "Accessories", href: "/accessories", body: "Socks and carry pieces that make the kit feel complete." },
  { label: "All products", href: "#collection", body: "Everything visible, with fit and material notes close by." },
];

const FEATURED = PRODUCTS.filter((product) => product.hero).slice(0, 3);

const CATEGORY_GROUPS = [
  {
    id: "practice-bottoms",
    eyebrow: "Practice bottoms",
    title: "Hold, coverage and off-duty comfort.",
    body: "Leggings, shorts, the skort and jogger placed together so the movement base is easy to compare.",
    slugs: [
      "vyoma-high-rise-legging",
      "vyoma-78-legging",
      "vyoma-bike-short",
      "vyoma-crescent-skort",
      "vyoma-jogger",
    ],
  },
  {
    id: "tops-bras",
    eyebrow: "Tops + bras",
    title: "Breathable layers and support.",
    body: "Studio tops, tees, tanks and bras grouped by the layer that meets heat, stretch and support.",
    slugs: [
      "vyoma-studio-top",
      "vyoma-rib-tank",
      "vyoma-practice-tee",
      "vyoma-cloud-bra",
      "vyoma-flow-bra",
    ],
  },
  {
    id: "layers-sets",
    eyebrow: "Layers + sets",
    title: "The outfit and the recovery finish.",
    body: "The complete practice set, the wrap and the hoodie placed where customers build the after-training layer.",
    slugs: [
      "vyoma-the-set",
      "vyoma-akasha-wrap",
      "vyoma-meditation-hoodie",
    ],
  },
  {
    id: "vyoma-pure",
    eyebrow: "Vyoma Pure",
    title: "Closest-to-skin comfort.",
    body: "The Pure line stays visible as its own foundation: brief, cami and trunk.",
    slugs: [
      "vyoma-pure-brief-women",
      "vyoma-pure-cami",
      "vyoma-pure-trunk-men",
    ],
  },
  {
    id: "accessories",
    eyebrow: "Accessories",
    title: "Carry and finish the kit.",
    body: "The existing Gym Carry and Organic Crew Sock are placed together without creating another bag.",
    slugs: [
      "vyoma-mat-bag",
      "vyoma-organic-crew-sock",
    ],
  },
];

function productsFor(slugs) {
  return slugs.map((slug) => PRODUCTS.find((product) => product.slug === slug)).filter(Boolean);
}

export default function ShopPage() {
  return (
    <main className="commerce-page shop-page">
      <section className="commerce-hero shop-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">Shop Vyomawear</p>
            <h1>The full catalogue, with the details that make choosing easier.</h1>
            <p className="commerce-lead">
              Men, women, Pure and accessories stay together in one clear shop:
              soft natural-fibre layers, fit notes, material clarity and checkout confidence.
            </p>
            <div className="commerce-actions">
              <Link href="/women" className="btn accent">Shop women</Link>
              <Link href="/men" className="btn ghost">Shop men</Link>
            </div>
            <div className="commerce-trust-row" aria-label="Shopping promises">
              <span>Fit notes first</span>
              <span>Tracked delivery</span>
              <span>Hosted checkout</span>
            </div>
          </div>
          <AmberProductStage variant="shop" priority />
        </div>
      </section>

      <section className="commerce-section">
        <div className="commerce-shell">
          <div className="category-strip" aria-label="Shop by need">
            {CATEGORY_LINKS.map((item) => (
              <Link href={item.href} className="category-tile" key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.body}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {FEATURED.length > 0 && (
        <section className="commerce-section commerce-section-tight" aria-labelledby="featured-heading">
          <div className="commerce-shell">
            <div className="commerce-section-head split">
              <div>
                <p className="commerce-eyebrow">Start here</p>
                <h2 id="featured-heading">The pieces people reach for first.</h2>
              </div>
              <Link href="/fabric" className="link-btn">Read the fabric promise</Link>
            </div>
            <div className="grid">
              {FEATURED.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="collection" className="commerce-section collection-section" aria-labelledby="collection-heading">
        <div className="commerce-shell">
          <div className="commerce-section-head">
            <p className="commerce-eyebrow">Full collection</p>
            <h2 id="collection-heading">Choose by feel, then confirm the details.</h2>
            <p>
              Take your time with the full collection. Every product page keeps sizing,
              material notes, care and delivery timing close to the decision.
            </p>
          </div>
          <ShopGrid />
        </div>
      </section>

      <section className="commerce-section section-light" aria-labelledby="category-placement-heading">
        <div className="commerce-shell">
          <div className="commerce-section-head">
            <p className="commerce-eyebrow">Placed by purpose</p>
            <h2 id="category-placement-heading">All 18 current products, sorted before any new catalogue work.</h2>
            <p>
              These sections keep every existing product visible in the wardrobe area it already belongs to.
            </p>
          </div>
          {CATEGORY_GROUPS.map((group) => {
            const products = productsFor(group.slugs);
            if (!products.length) return null;

            return (
              <section
                className="commerce-subsection"
                id={group.id}
                aria-labelledby={`${group.id}-heading`}
                key={group.id}
              >
                <div className="commerce-section-head compact">
                  <p className="commerce-eyebrow">{group.eyebrow}</p>
                  <h3 id={`${group.id}-heading`}>{group.title}</h3>
                  <p>{group.body}</p>
                </div>
                <div className="grid">
                  {products.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="commerce-section final-shop-band" aria-labelledby="shop-confidence-heading">
        <div className="commerce-shell confidence-grid">
          <div>
            <p className="commerce-eyebrow">Buy with clarity</p>
            <h2 id="shop-confidence-heading">Know what you are choosing.</h2>
          </div>
          <ul className="confidence-list">
            <li><strong>Fit first.</strong><span>Size guidance before you buy, with product-specific notes on every page.</span></li>
            <li><strong>Care visible.</strong><span>Fabric, care and claim language stays tied to what can be shown.</span></li>
            <li><strong>Checkout protected.</strong><span>Payment completes through hosted checkout, with shipping and taxes shown before payment.</span></li>
          </ul>
        </div>
      </section>
    </main>
  );
}
