import Link from "next/link";
import ShopGrid from "@/components/ShopGrid";
import ProductCard from "@/components/ProductCard";
import AmberProductStage from "@/components/AmberProductStage";
import { PRODUCTS } from "@/lib/catalog";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "Shop Vyomawear",
  description:
    "Shop Vyomawear lifestyle activewear for training, travel, recovery and everyday movement.",
  alternates: { canonical: abs("/shop") },
};

const CATEGORY_LINKS = [
  { label: "Women", href: "/women", body: "Leggings, tops, bras, skorts and soft sets." },
  { label: "Men", href: "/men", body: "Lifestyle activewear for gym, travel and weekends." },
  { label: "Pure", href: "/pure", body: "Closest-to-skin basics made with extra care." },
  { label: "Accessories", href: "#collection", body: "Socks and carry pieces that finish the kit." },
  { label: "All products", href: "#collection", body: "The full catalogue in one place." },
];

const FEATURED = PRODUCTS.filter((product) => product.hero).slice(0, 3);

export default function ShopPage() {
  return (
    <main className="commerce-page shop-page">
      <section className="commerce-hero shop-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">Shop Vyomawear</p>
            <h1>The full catalogue, built around the day you move through.</h1>
            <p className="commerce-lead">
              Men, women, Pure and accessories stay together in one clear shop:
              warm natural-fibre layers, product detail and secure checkout.
            </p>
            <div className="commerce-actions">
              <Link href="/women" className="btn accent">Shop women</Link>
              <Link href="/men" className="btn ghost">Shop men</Link>
            </div>
            <div className="commerce-trust-row" aria-label="Shopping promises">
              <span>Training to life</span>
              <span>Tracked delivery</span>
              <span>Secure checkout</span>
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
                <h2 id="featured-heading">The pieces that anchor the wardrobe.</h2>
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
            <h2 id="collection-heading">Choose the layer your day needs first.</h2>
            <p>
              Take your time with the full collection. Each product page has the sizing,
              material notes and delivery details you need when you're ready to choose.
            </p>
          </div>
          <ShopGrid />
        </div>
      </section>

      <section className="commerce-section final-shop-band" aria-labelledby="shop-confidence-heading">
        <div className="commerce-shell confidence-grid">
          <div>
            <p className="commerce-eyebrow">Buy with clarity</p>
            <h2 id="shop-confidence-heading">The good kind of simple.</h2>
          </div>
          <ul className="confidence-list">
            <li><strong>Fit first.</strong><span>Size guidance before you buy, with product-specific fit notes on every page.</span></li>
            <li><strong>Care visible.</strong><span>Fabric, care and batch language stays tied to what can be shown.</span></li>
            <li><strong>Checkout protected.</strong><span>Payment completes through protected hosted checkout.</span></li>
          </ul>
        </div>
      </section>
    </main>
  );
}
