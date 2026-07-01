import Link from "next/link";
import EditorialImage from "@/components/EditorialImage";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "Our story",
  description:
    "Vyoma means sky. Natural-fibre activewear with a yoga soul — considered, never wasted.",
  alternates: { canonical: abs("/about") },
};

const STORY_PILLARS = [
  {
    title: "The name",
    body: "Vyoma means sky, ether and the space that holds everything. The clothes should feel like that: room, breath, ease.",
  },
  {
    title: "The origin",
    body: "The story begins with yoga, textile craft and a promise to keep the product considered.",
  },
  {
    title: "The standard",
    body: "Softer natural fibres, fewer unknowns and claims that stay close to what can be verified.",
  },
];

export default function About() {
  return (
    <main className="commerce-page about-redesign">
      <section className="commerce-hero about-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">Our story</p>
            <h1>Vyoma means sky.</h1>
            <p className="commerce-lead">
              व्योम · vee-OH-ma · the room to breathe that a practice gives back to you.
              We make activewear with softer materials and a clearer conscience.
            </p>
            <div className="commerce-actions">
              <Link href="/shop" className="btn accent">Shop the first drop</Link>
              <Link href="/making" className="btn ghost">See the making</Link>
            </div>
          </div>
          <EditorialImage
            name="makingAtelier"
            alt="Natural fabric being prepared in a warm atelier setting"
            className="about-wordmark"
            priority
          />
        </div>
      </section>

      <section className="commerce-section commerce-section-tight">
        <div className="commerce-shell">
          <div className="commerce-card-grid three">
            {STORY_PILLARS.map((pillar) => (
              <article className="commerce-card" key={pillar.title}>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="commerce-section story-manifesto" aria-labelledby="manifesto-heading">
        <div className="commerce-shell two-column-section">
          <div className="sticky-copy">
            <p className="commerce-eyebrow">Why it exists</p>
            <h2 id="manifesto-heading">The body knows when a layer is kind.</h2>
          </div>
          <div className="story-copy-block">
            <p>
              Most activewear asks you to accept plastic-heavy stretch as the default.
              Vyoma begins somewhere softer: with the feeling of cotton-led fibres, the discipline
              of small batches and the belief that what touches your skin should be easier to trust.
            </p>
            <p>
              We are not building a brand to shout. We are building one that can sit quietly in a drawer,
              be reached for every week and still feel beautiful years from now.
            </p>
            <Link href="/fabric" className="btn ghost">Read the fabric promise</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
