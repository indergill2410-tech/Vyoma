import Link from "next/link";
import EditorialImage from "@/components/EditorialImage";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "Fabric",
  description:
    "The Vyoma fabric promise: soft natural fibres, fewer unknowns and clearer material standards.",
  alternates: { canonical: abs("/fabric") },
};

const MATERIALS = [
  {
    title: "Natural fibre first",
    body: "Cotton-led knits and cotton-modal jerseys chosen for softness, breathability and daily wear.",
  },
  {
    title: "Fewer unknowns",
    body: "Simpler compositions, fewer finish promises and clearer batch language as documentation arrives.",
  },
  {
    title: "Plain claims only",
    body: "No medical promises, no vague wellness language. Just what the garment is, what it avoids and what is verified.",
  },
];

const AVOIDS = ["Polyester as the automatic default", "Nylon-heavy close layers", "Elastane-first storytelling", "Vague wellness claims"];

export default function FabricPage() {
  return (
    <main className="commerce-page fabric-page">
      <section className="commerce-hero fabric-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">Fabric promise</p>
            <h1>Less mystery in the layer closest to you.</h1>
            <p className="commerce-lead">
              Vyoma begins with how fabric feels on warm, moving skin: soft, breathable,
              clear and considered. The proof supports the choice; the feeling comes first.
            </p>
            <div className="commerce-actions">
              <Link href="/shop" className="btn accent">Shop the catalogue</Link>
              <Link href="/research" className="btn ghost">Read the sources</Link>
            </div>
          </div>
          <EditorialImage
            name="fabricMacro"
            alt="Close-up natural fibre weave in soft studio light"
            className="fabric-sample"
            priority
          />
        </div>
      </section>

      <section className="commerce-section commerce-section-tight">
        <div className="commerce-shell">
          <div className="commerce-card-grid three">
            {MATERIALS.map((item) => (
              <article className="commerce-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="commerce-section fabric-compare-band" aria-labelledby="fabric-choice-heading">
        <div className="commerce-shell two-column-section">
          <div className="sticky-copy">
            <p className="commerce-eyebrow">The choice</p>
            <h2 id="fabric-choice-heading">Activewear does not have to start with plastic.</h2>
            <p>
              Some synthetics perform beautifully. But for tight, warm, close-to-skin layers,
              we believe a softer natural-fibre path should be easy to choose.
            </p>
          </div>
          <div className="avoid-panel">
            <h3>Designed away from</h3>
            <ul>
              {AVOIDS.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="commerce-section section-light" aria-labelledby="cert-heading">
        <div className="commerce-shell confidence-grid">
          <div>
            <p className="commerce-eyebrow">Standards</p>
            <h2 id="cert-heading">Proof should stay plain.</h2>
          </div>
          <p>
            As GOTS, OEKO-TEX or product-specific batch documentation is issued, it should live here
            plainly. Until then, Vyoma will keep claims limited to what can be shown.
          </p>
        </div>
      </section>
    </main>
  );
}
