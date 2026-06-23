import Link from "next/link";
import MakingJourney from "@/components/MakingJourney";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "The Making",
  description:
    "Follow a Vyoma piece from order to your door: made in India, checked with care and shipped with tracking.",
  alternates: { canonical: abs("/making") },
};

const MAKING_PROOF = [
  { title: "Made in India", body: "A textile story rooted close to the origin of yoga and the craft behind the cloth." },
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
              Vyoma is made in India with a slower standard: prepared carefully, checked properly
              and sent with tracking when it is ready for you.
            </p>
            <div className="commerce-actions">
              <Link href="/shop" className="btn accent">Shop the first drop</Link>
              <Link href="/track" className="btn ghost">Track an order</Link>
            </div>
          </div>
          <div className="making-stamp" aria-hidden="true">
            <span>cut</span><span>sewn</span><span>checked</span>
          </div>
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
