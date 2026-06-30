import Link from "next/link";
import { productsForAudience } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import EditorialImage from "@/components/EditorialImage";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "Men's Vyomawear",
  description:
    "Shop men's Vyomawear: organic cotton tees, movement shorts, joggers, hoodies and Pure underwear, made in India.",
  alternates: { canonical: abs("/men") },
};

const CATEGORY_LINKS = [
  { label: "Pure", href: "#pure", body: "Closest-to-skin comfort made clean." },
  { label: "Tops", href: "#tops", body: "Breathable layers for training and travel." },
  { label: "Bottoms", href: "#bottoms", body: "Shorts and joggers with a clean line." },
  { label: "Layers", href: "#layers", body: "Warm, sharp layers after practice." },
];

export default function MenPage() {
  const products = productsForAudience("men");
  const pure = products.filter((product) => product.category === "Vyoma Pure");
  const tops = products.filter((product) => product.category === "Tops");
  const bottoms = products.filter((product) => product.category === "Bottoms");
  const layers = products.filter((product) => product.category === "Layers");
  const featured = products.filter((product) => product.hero).slice(0, 3);

  return (
    <main className="commerce-page shop-page audience-page men-page">
      <section className="commerce-hero shop-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">Men's Vyoma</p>
            <h1>Clean movement layers for training, stillness and the day after.</h1>
            <p className="commerce-lead">
              Organic-first men's essentials with premium fit, quiet branding and the same made-in-India care as the practice line.
            </p>
            <div className="commerce-actions">
              <Link href="#collection" className="btn accent">Shop men</Link>
              <Link href="/pure#men" className="btn ghost">Shop Pure Men</Link>
            </div>
            <div className="commerce-trust-row" aria-label="Shopping promises">
              <span>Made in India</span>
              <span>Tracked delivery</span>
              <span>Natural fibre first</span>
            </div>
          </div>
          <EditorialImage
            name="fabricMacro"
            alt="Men's Vyoma natural-fibre layers and Pure essentials in a premium studio collage"
            className="commerce-visual"
            priority
          />
        </div>
      </section>

      <section className="commerce-section">
        <div className="commerce-shell">
          <div className="category-strip" aria-label="Shop men's categories">
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
        <section className="commerce-section commerce-section-tight" aria-labelledby="men-featured-heading">
          <div className="commerce-shell">
            <div className="commerce-section-head split">
              <div>
                <p className="commerce-eyebrow">Start here</p>
                <h2 id="men-featured-heading">The men's pieces that set the tone.</h2>
              </div>
              <Link href="/fit" className="link-btn">Need size help?</Link>
            </div>
            <div className="grid">
              {featured.map((product) => <ProductCard key={product.slug} product={product} />)}
            </div>
          </div>
        </section>
      )}

      <section id="collection" className="commerce-section collection-section" aria-labelledby="men-collection-heading">
        <div className="commerce-shell">
          <div className="commerce-section-head">
            <p className="commerce-eyebrow">Men's collection</p>
            <h2 id="men-collection-heading">Everything for the clean daily uniform.</h2>
            <p>Shop by category or move through the whole men's catalog in one place.</p>
          </div>
          {[
            ["pure", "Pure", pure],
            ["tops", "Tops", tops],
            ["bottoms", "Bottoms", bottoms],
            ["layers", "Layers", layers],
          ].map(([id, title, items]) => (
            items.length > 0 && (
              <section id={id} className="commerce-section-tight" key={id} aria-labelledby={`men-${id}-heading`}>
                <div className="commerce-section-head split">
                  <div>
                    <p className="commerce-eyebrow">Men · {title}</p>
                    <h3 id={`men-${id}-heading`}>{title}</h3>
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
