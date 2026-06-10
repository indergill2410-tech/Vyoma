import Link from "next/link";
import MakingJourney from "@/components/MakingJourney";

export const metadata = {
  title: "The Making",
  description:
    "Made in India, the birthplace of yoga. Follow a Vyoma piece from your order to your door — crafted with care, made to last.",
};

export default function MakingPage() {
  return (
    <main className="making">
      <section className="mk-intro">
        <span className="section-eyebrow">The Making</span>
        <h1>Made in India, with care.</h1>
        <p>
          Crafted in the land that gave the world yoga. Here's the whole journey —
          from your order to your door.
        </p>
      </section>

      <MakingJourney />

      <section className="mk-outro">
        <h2>Nothing mass-produced. Nothing wasted.</h2>
        <p>That's the whole idea.</p>
        <div className="mk-outro-cta">
          <Link href="/#shop" className="btn">Explore the collection</Link>
          <Link href="/about" className="btn ghost">Our story</Link>
        </div>
      </section>
    </main>
  );
}
