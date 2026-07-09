import Link from "next/link";
import ShopGrid from "@/components/ShopGrid";
import ProductCard from "@/components/ProductCard";
import EditorialImage from "@/components/EditorialImage";
import { PRODUCTS } from "@/lib/catalog";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "Shop the first drop",
  description:
    "Shop Vyomawear's first drop of soft natural-fibre activewear, made in India and built for movement.",
  alternates: { canonical: abs("/shop") },
};

const CATEGORY_LINKS = [
  { label: "Leggings", href: "#collection", body: "Held, opaque and soft through every fold." },
  { label: "Tops", href: "#collection", body: "Light layers for heat, breath and the day after." },
  { label: "Men", href: "/men", body: "Lifestyle activewear for gym, travel and weekends." },
  { label: "Pure", href: "/pure", body: "Closest-to-skin basics made with extra care." },
  { label: "Sets", href: "#collection", body: "One decision. A complete practice uniform." },
];

const FEATURED = PRODUCTS.filter((product) => product.hero).slice(0, 3);

export default function ShopPage() {
  return (
    <main className="commerce-page shop-page">
      <section className="commerce-hero shop-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">The first drop</p>
            <h1>Soft movement layers, made close to the source.</h1>
            <p className="commerce-lead">
              Organic-first activewear for training, travel, errands and the quiet hours after.
              Choose your piece, then move through secure checkout when you are ready.
            </p>
            <div className="commerce-actions">
              <Link href="#collection" className="btn accent">Shop the collection</Link>
              <Link href="/men" className="btn ghost">Shop men</Link>
            </div>
            <div className="commerce-trust-row" aria-label="Shopping promises">
              <span>Made in India</span>
              <span>Tracked delivery</span>
              <span>Opaque promise</span>
            </div>
          </div>
          <EditorialImage
            name="shopHero"
            alt="Folded Vyoma movement layers and carry pieces in soft dusk light"
            className="commerce-visual"
            priority
          />
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
                <h2 id="featured-heading">The pieces that define the drop.</h2>
              </div>
              <Link href="/sky-series" className="link-btn">Explore the colour story</Link>
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
            <h2 id="collection-heading">Choose the layer your body wants first.</h2>
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
            <li><strong>Fit first.</strong><span>Size help before you buy and exchange support if the first fit is not right.</span></li>
            <li><strong>Care visible.</strong><span>Fabric, care and batch language stays tied to what can be shown.</span></li>
            <li><strong>Checkout protected.</strong><span>Payment happens through the secure hosted checkout already connected to the store.</span></li>
          </ul>
        </div>
      </section>
    </main>
  );
}
