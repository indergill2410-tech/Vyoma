import Link from "next/link";
import EditorialImage from "@/components/EditorialImage";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "Story",
  description:
    "The Vyoma story: lifestyle activewear with softer natural fibres, warm colour and a calmer feel against skin.",
  alternates: { canonical: abs("/story") },
};

const STORY_PILLARS = [
  {
    title: "Room to move",
    body: "Vyoma begins with breath, space and the feeling of a layer that lets your body settle before it asks your body to perform.",
  },
  {
    title: "Craft with context",
    body: "Materials, finish and fit are treated as part of the same story, so each layer feels considered from first touch.",
  },
  {
    title: "Less plastic on skin",
    body: "We are building toward softer natural-fibre movement layers with fewer unknowns and clearer material promises.",
  },
];

export default function StoryPage() {
  return (
    <main className="commerce-page about-redesign story-redesign">
      <section className="commerce-hero about-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">Story</p>
            <h1>Vyoma means sky.</h1>
            <p className="commerce-lead">
              व्योम · vee-OH-ma · the room to breathe that a good practice gives back to you.
              Lifestyle activewear for movement that feels calmer on the skin.
            </p>
            <div className="commerce-actions">
              <Link href="/shop" className="btn accent">Shop the catalogue</Link>
              <Link href="/fabric" className="btn ghost">See the fabric promise</Link>
            </div>
          </div>
          <EditorialImage
            name="makingAtelier"
            alt="Vyoma natural fibre activewear in warm atelier light"
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

      <section className="commerce-section story-manifesto" aria-labelledby="story-standard-heading">
        <div className="commerce-shell two-column-section">
          <div className="sticky-copy">
            <p className="commerce-eyebrow">Why it exists</p>
            <h2 id="story-standard-heading">The body knows when a layer is kind.</h2>
          </div>
          <div className="story-copy-block">
            <p>
              Most activewear asks you to accept plastic-heavy stretch as the default. Vyoma begins
              somewhere softer: with cotton-led comfort, small batches and the belief that the layer
              closest to your skin should be easier to trust.
            </p>
            <p>
              We are building a brand that does not need to shout. It should sit quietly in a drawer,
              be reached for every week and still feel beautiful years from now.
            </p>
            <div className="commerce-actions">
              <Link href="/making" className="btn ghost">See the making</Link>
              <Link href="/circle" className="btn accent">Join The Circle</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
