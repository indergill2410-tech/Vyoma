import Link from "next/link";
import Waitlist from "@/components/Waitlist";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/catalog";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "The Drops",
  description:
    "Follow Vyomawear's first drop, restocks and small-batch releases.",
  alternates: { canonical: abs("/drops") },
};

const FIRST_DROP = PRODUCTS.filter((product) => product.hero).slice(0, 3);

const DROP_STAGES = [
  { label: "01", title: "First drop", body: "The opening edit: practice layers, Pure basics and the sky palette." },
  { label: "02", title: "Restock notes", body: "The Circle hears first when a size, colour or small batch returns." },
  { label: "03", title: "Next sky", body: "Future colours and pieces release slowly, so every drop can be made with care." },
];

export default function DropsPage() {
  return (
    <main className="commerce-page drops-page">
      <section className="commerce-hero drops-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">The Drops</p>
            <h1>Small batches, released with room to breathe.</h1>
            <p className="commerce-lead">
              Vyoma does not need a loud season calendar. The first drop is a focused edit,
              followed by restocks and future colour moments when the making is ready.
            </p>
            <div className="commerce-actions">
              <Link href="/shop" className="btn accent">Shop the live drop</Link>
              <Link href="#circle" className="btn ghost">Get restock notes</Link>
            </div>
          </div>
          <div className="drop-orbit" aria-hidden="true">
            <span>Live</span>
            <strong>First drop</strong>
            <em>made in India</em>
          </div>
        </div>
      </section>

      <section className="commerce-section commerce-section-tight" aria-labelledby="drop-flow-heading">
        <div className="commerce-shell">
          <div className="commerce-section-head">
            <p className="commerce-eyebrow">How drops work</p>
            <h2 id="drop-flow-heading">The calendar stays calm. The pieces stay considered.</h2>
          </div>
          <div className="drop-stage-grid">
            {DROP_STAGES.map((stage) => (
              <article className="drop-stage" key={stage.label}>
                <span>{stage.label}</span>
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {FIRST_DROP.length > 0 && (
        <section className="commerce-section" aria-labelledby="first-drop-heading">
          <div className="commerce-shell">
            <div className="commerce-section-head split">
              <div>
                <p className="commerce-eyebrow">Available now</p>
                <h2 id="first-drop-heading">The pieces leading the first drop.</h2>
              </div>
              <Link href="/shop" className="link-btn">See every piece</Link>
            </div>
            <div className="grid">
              {FIRST_DROP.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="circle" className="commerce-section section-light drops-circle-band" aria-labelledby="drop-circle-heading">
        <div className="commerce-shell drops-circle-grid">
          <div>
            <p className="commerce-eyebrow">The Circle</p>
            <h2 id="drop-circle-heading">Restocks should not feel random.</h2>
            <p>
              Join for early notes on size returns, colour stories and small-batch releases.
              The store stays open; The Circle simply hears first.
            </p>
          </div>
          <Waitlist source="drops" />
        </div>
      </section>
    </main>
  );
}
