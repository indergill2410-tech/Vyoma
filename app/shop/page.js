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
  { label: "Accessories", href: "#collection", body: "Socks and carry pieces that make the kit feel complete." },
  { label: "All products", href: "#collection", body: "Everything visible, with fit and material notes close by." },
];

const FEATURED = PRODUCTS.filter((product) => product.hero).slice(0, 3);

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
