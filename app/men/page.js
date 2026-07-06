import Link from "next/link";
import { PRODUCTS } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import EditorialImage from "@/components/EditorialImage";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "Men's Catalogue",
  description:
    "Men's and unisex Vyomawear movement layers: organic-cotton Pure trunks, fleece, tees, socks and carry pieces made in India.",
  alternates: { canonical: abs("/men") },
};

const MENS_SLUGS = [
  "vyoma-pure-trunk-men",
  "vyoma-practice-tee",
  "vyoma-jogger",
  "vyoma-meditation-hoodie",
  "vyoma-mat-bag",
  "vyoma-organic-crew-sock",
];

const MENS_PROMISES = [
  {
    title: "Start with the closest layer",
    body: "Soft organic-cotton trunks for daily comfort, with fewer synthetic unknowns against warm skin.",
  },
  {
    title: "Move, recover, repeat",
    body: "Practice tees, fleece and carry pieces make the catalogue feel like a complete day, not one isolated product.",
  },
  {
    title: "Choose with clarity",
    body: "Every product card leads to fit, fabric and delivery details before checkout.",
  },
];

function mensProducts() {
  return MENS_SLUGS.map((slug) => PRODUCTS.find((product) => product.slug === slug)).filter(Boolean);
}

export default function MenPage() {
  const products = mensProducts();

  return (
    <main className="commerce-page mens-page">
      <section className="commerce-hero mens-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">Men's catalogue</p>
            <h1>Clean layers for the body that does not want noise.</h1>
            <p className="commerce-lead">
              Men's and unisex Vyoma pieces for daily movement, recovery and the closest layer:
              organic-cotton first, made in India, and built around calm comfort.
            </p>
            <div className="commerce-actions">
              <Link href="#mens-catalog" className="btn accent">Shop men's pieces</Link>
              <Link href="/pure#men" className="btn ghost">Go to Pure Men</Link>
            </div>
            <div className="commerce-trust-row" aria-label="Men's shopping promises">
              <span>Organic cotton first</span>
              <span>Made in India</span>
              <span>Secure checkout</span>
            </div>
          </div>
          <EditorialImage
            name="pureStillLife"
            alt="Vyoma men's Pure trunk and movement layers in warm dusk light"
            className="pure-visual"
            priority
          />
        </div>
      </section>

      <section className="commerce-section commerce-section-tight">
        <div className="commerce-shell">
          <div className="commerce-card-grid three">
            {MENS_PROMISES.map((promise) => (
              <article className="commerce-card" key={promise.title}>
                <h3>{promise.title}</h3>
                <p>{promise.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="mens-catalog" className="commerce-section" aria-labelledby="mens-catalog-heading">
        <div className="commerce-shell">
          <div className="commerce-section-head split">
            <div>
              <p className="commerce-eyebrow">Men + unisex</p>
              <h2 id="mens-catalog-heading">The first men's edit.</h2>
            </div>
            <Link href="/fit" className="link-btn">Need size help?</Link>
          </div>
          <div className="grid">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="commerce-section section-light" aria-labelledby="mens-pure-heading">
        <div className="commerce-shell confidence-grid">
          <div>
            <p className="commerce-eyebrow">Pure for men</p>
            <h2 id="mens-pure-heading">The layer you reach for every day.</h2>
          </div>
          <p>
            Start with breathable organic-cotton trunks, then build the rest of the kit with fleece,
            tees, socks and carry pieces that keep the same calm material language.
          </p>
        </div>
      </section>
    </main>
  );
}
