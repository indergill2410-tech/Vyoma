import Link from "next/link";
import { pureProductsForAudience } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import EditorialImage from "@/components/EditorialImage";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "Vyoma Pure",
  description:
    "Organic-cotton underwear for women and men. The closest layer, made softer and clearer.",
  alternates: { canonical: abs("/pure") },
};

const PURE_POINTS = [
  { title: "Soft where it matters", body: "A breathable everyday layer for warm contact, long wear and fewer distractions." },
  { title: "Natural fibre first", body: "Organic cotton-led comfort, with product claims kept plain and verifiable." },
  { title: "Activewear-level care", body: "Everyday basics with the same fit, fabric and care attention as the movement line." },
];

export default function PurePage() {
  const women = pureProductsForAudience("women");
  const men = pureProductsForAudience("men");

  return (
    <main className="commerce-page pure-page">
      <section className="commerce-hero pure-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">Vyoma Pure</p>
            <h1>The closest layer should feel the cleanest.</h1>
            <p className="commerce-lead">
              Cotton-led underwear and first layers for women and men, made for the skin that notices everything.
              No drama. Just softer daily comfort, clearer materials and a calmer first touch.
            </p>
            <div className="commerce-actions">
              <Link href="#women" className="btn accent">Shop women's Pure</Link>
              <Link href="/men" className="btn ghost">Shop men's catalogue</Link>
            </div>
          </div>
          <EditorialImage
            name="pureStillLife"
            alt="Soft organic cotton Pure layers arranged in warm dawn light"
            className="pure-visual"
            priority
          />
        </div>
      </section>

      <section className="commerce-section commerce-section-tight">
        <div className="commerce-shell">
          <div className="commerce-card-grid three">
            {PURE_POINTS.map((point) => (
              <article className="commerce-card" key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="women" className="commerce-section" aria-labelledby="pure-women-heading">
        <div className="commerce-shell">
          <div className="commerce-section-head split">
            <div>
              <p className="commerce-eyebrow">Pure · Women</p>
              <h2 id="pure-women-heading">Soft on the skin that notices everything.</h2>
            </div>
            <Link href="/fit" className="link-btn">Need size help?</Link>
          </div>
          <div className="grid">
            {women.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>

      <section id="men" className="commerce-section section-light" aria-labelledby="pure-men-heading">
        <div className="commerce-shell">
          <div className="commerce-section-head split">
            <div>
              <p className="commerce-eyebrow">Pure · Men</p>
              <h2 id="pure-men-heading">All-day comfort without the noise.</h2>
            </div>
            <Link href="/men" className="link-btn">Open the men's catalogue</Link>
          </div>
          <div className="grid">
            {men.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>

      <section className="commerce-section pure-closing-band">
        <div className="commerce-shell confidence-grid">
          <div>
            <p className="commerce-eyebrow">The simple promise</p>
            <h2>Made to be reached for without second-guessing.</h2>
          </div>
          <p>
            Vyoma Pure is not about fear. It is about giving the closest layer more care,
            because it is often the one you wear longest.
          </p>
        </div>
      </section>
    </main>
  );
}
