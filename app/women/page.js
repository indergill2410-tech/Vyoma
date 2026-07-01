import Link from "next/link";
import { productsForAudience } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import EditorialImage from "@/components/EditorialImage";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "Women's Vyomawear",
  description:
    "Shop women's Vyomawear: leggings, bras, tops, Pure basics, layers and yoga essentials.",
  alternates: { canonical: abs("/women") },
};

const CATEGORY_LINKS = [
  { label: "Leggings", href: "#bottoms", body: "Held, opaque and soft through every fold." },
  { label: "Tops", href: "#tops", body: "Light layers for heat, breath and the day after." },
  { label: "Bras", href: "#bras", body: "Soft support with clean natural-fibre intent." },
  { label: "Pure", href: "#pure", body: "Closest-to-skin basics made with care." },
];

export default function WomenPage() {
  const products = productsForAudience("women");
  const bottoms = products.filter((product) => product.category === "Bottoms");
  const tops = products.filter((product) => product.category === "Tops");
  const bras = products.filter((product) => product.category === "Bras");
  const pure = products.filter((product) => product.category === "Vyoma Pure");
  const layers = products.filter((product) => product.category === "Layers");
  const sets = products.filter((product) => product.category === "Sets");
  const featured = products.filter((product) => product.hero).slice(0, 3);

  return (
    <main className="commerce-page shop-page audience-page women-page">
      <section className="commerce-hero shop-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">Women's Vyoma</p>
            <h1>Soft movement layers for practice, travel and everything after.</h1>
            <p className="commerce-lead">
              The full women's catalog: sculpted leggings, breathable tops, clean support, Pure basics and calm layers for the whole day.
            </p>
            <div className="commerce-actions">
              <Link href="#collection" className="btn accent">Shop women</Link>
              <Link href="/pure#women" className="btn ghost">Shop Pure Women</Link>
            </div>
            <div className="commerce-trust-row" aria-label="Shopping promises">
              <span>Soft natural fibres</span>
              <span>Tracked delivery</span>
              <span>Opaque promise</span>
            </div>
          </div>
          <EditorialImage
            name="shopHero"
            alt="Women's Vyoma movement layers in a warm premium studio collage"
            className="commerce-visual"
            priority
          />
        </div>
      </section>

      <section className="commerce-section">
        <div className="commerce-shell">
          <div className="category-strip" aria-label="Shop women's categories">
            {CATEGORY_LINKS.map((item) => (
              <Link href={item.href} className="category-tile" key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.body}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="commerce-section commerce-section-tight" aria-labelledby="women-featured-heading">
          <div className="commerce-shell">
            <div className="commerce-section-head split">
              <div>
                <p className="commerce-eyebrow">Start here</p>
                <h2 id="women-featured-heading">The women's pieces that define the drop.</h2>
              </div>
              <Link href="/fit" className="link-btn">Need size help?</Link>
            </div>
            <div className="grid">
              {featured.map((product) => <ProductCard key={product.slug} product={product} />)}
            </div>
          </div>
        </section>
      )}

      <section id="collection" className="commerce-section collection-section" aria-labelledby="women-collection-heading">
        <div className="commerce-shell">
          <div className="commerce-section-head">
            <p className="commerce-eyebrow">Women's collection</p>
            <h2 id="women-collection-heading">Choose by feel, fit and first layer.</h2>
            <p>Shop by category or move through the whole women's catalog in one place.</p>
          </div>
          {[
            ["sets", "Sets", sets],
            ["bottoms", "Bottoms", bottoms],
            ["tops", "Tops", tops],
            ["bras", "Bras", bras],
            ["pure", "Pure", pure],
            ["layers", "Layers", layers],
          ].map(([id, title, items]) => (
            items.length > 0 && (
              <section id={id} className="commerce-section-tight" key={id} aria-labelledby={`women-${id}-heading`}>
                <div className="commerce-section-head split">
                  <div>
                    <p className="commerce-eyebrow">Women · {title}</p>
                    <h3 id={`women-${id}-heading`}>{title}</h3>
                  </div>
                </div>
                <div className="grid">
                  {items.map((product) => <ProductCard key={product.slug} product={product} />)}
                </div>
              </section>
            )
          ))}
        </div>
      </section>
    </main>
  );
}
