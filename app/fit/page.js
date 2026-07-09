import Link from "next/link";
import FitFinder from "@/components/FitFinder";
import EditorialImage from "@/components/EditorialImage";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "Fit Finder",
  description:
    "Find your Vyomawear size and fit feel before you choose your piece.",
  alternates: { canonical: abs("/fit") },
};

const FIT_NOTES = [
  {
    title: "Held, not squeezed",
    body: "Our active layers are designed to feel secure without making you aware of every seam.",
  },
  {
    title: "Between sizes? Choose the feeling",
    body: "Size down for a firmer practice fit, or size up for a softer all-day fit.",
  },
  {
    title: "Pure should disappear",
    body: "The closest layer should sit calmly and breathe easily through the whole day.",
  },
];

export default function FitPage() {
  return (
    <main className="commerce-page fit-page-main">
      <section className="commerce-hero fit-landing">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">Fit Finder</p>
            <h1>Find the size that lets you stop thinking about size.</h1>
            <p className="commerce-lead">
              A quick guide for the current catalogue. It is simple on purpose: your frame,
              your preferred feel, and the colour mood you reach for.
            </p>
            <div className="commerce-actions">
              <Link href="#finder" className="btn accent">Start the finder</Link>
              <Link href="/shop" className="btn ghost">Shop first</Link>
            </div>
          </div>
          <EditorialImage
            name="fitPackaging"
            alt="Vyoma fit cards, soft packaging and measuring tape in dawn light"
            className="fit-scale"
            priority
          />
        </div>
      </section>

      <section id="finder" className="commerce-section fit-tool-section">
        <div className="commerce-shell narrow-shell">
          <FitFinder />
        </div>
      </section>

      <section className="commerce-section commerce-section-tight">
        <div className="commerce-shell">
          <div className="commerce-section-head">
            <p className="commerce-eyebrow">How to choose</p>
            <h2>Fit is a feeling before it is a number.</h2>
          </div>
          <div className="commerce-card-grid three">
            {FIT_NOTES.map((note) => (
              <article className="commerce-card" key={note.title}>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
