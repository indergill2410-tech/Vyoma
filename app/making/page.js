import Link from "next/link";
import MakingJourney from "@/components/MakingJourney";
import EditorialImage from "@/components/EditorialImage";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "The Making",
  description:
    "Follow a Vyoma piece from your order to your door — crafted with care, built to last.",
  alternates: { canonical: abs("/making") },
};

const MAKING_PROOF = [
  { title: "Small-batch care", body: "A textile story rooted in craft, finish and a calmer pace." },
  { title: "Checked by hand", body: "Seams, finish and feel are part of the product, not an afterthought." },
  { title: "Tracked to your door", body: "Once your parcel leaves, delivery details arrive by email for calm follow-through." },
];

export default function MakingPage() {
  return (
    <main className="commerce-page making-page-redesign">
      <section className="commerce-hero making-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">The Making</p>
            <h1>What happens after you choose your piece.</h1>
            <p className="commerce-lead">
              Vyoma follows a slower standard: prepared carefully, checked properly and sent with tracking when it is ready for you.
            </p>
            <div className="commerce-actions">
              <Link href="/shop" className="btn accent">Shop the first drop</Link>
              <Link href="/fit" className="btn ghost">Find your fit</Link>
            </div>
          </div>
          <EditorialImage
            name="makingAtelier"
            alt="Natural fabric on an atelier cutting table in warm Indian evening light"
            className="making-stamp"
            priority
          />
        </div>
      </section>

      <section className="commerce-section commerce-section-tight">
        <div className="commerce-shell">
          <div className="commerce-card-grid three">
            {MAKING_PROOF.map((item) => (
              <article className="commerce-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MakingJourney />

      <section className="commerce-section making-close-band">
        <div className="commerce-shell confidence-grid">
          <div>
            <p className="commerce-eyebrow">The standard</p>
            <h2>Nothing should feel rushed against your skin.</h2>
          </div>
          <p>
            The point is not slowness for its own sake. It is fewer careless decisions,
            clearer making and a product that feels considered when you put it on.
          </p>
        </div>
      </section>
    </main>
  );
}
