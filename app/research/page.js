import Link from "next/link";
import EditorialImage from "@/components/EditorialImage";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "Research",
  description:
    "The quiet proof behind Vyomawear's material choices: microfibres, PFAS, skin contact and clearer standards.",
  alternates: { canonical: abs("/research") },
};

const EVIDENCE = [
  {
    label: "Microfibres",
    title: "Synthetic garments can shed.",
    body: "Published research has measured microfiber release from synthetic garments and found that construction, yarn and fibre type all influence how much is released.",
    source: "Scientific Reports",
    href: "https://www.nature.com/articles/s41598-019-43023-x",
  },
  {
    label: "PFAS",
    title: "Some finishes are made to last.",
    body: "Public health agencies note that PFAS have been used in consumer products including stain- and water-resistant clothing, and many break down slowly over time.",
    source: "US EPA",
    href: "https://www.epa.gov/pfas/our-current-understanding-human-health-and-environmental-risks-pfas",
  },
  {
    label: "Skin contact",
    title: "The closest layer deserves care.",
    body: "Everyday chemical exposure can happen through multiple routes, including skin contact. Clothing is not medicine, but material choice can still be considered.",
    source: "NIEHS",
    href: "https://www.niehs.nih.gov/health/topics/agents/endocrine",
  },
];

const PRINCIPLES = [
  "We only claim what we can actually show you.",
  "We choose softer natural fibres wherever they can do the job.",
  "We publish batch documents once the certificates are real.",
  "We let the clothes feel beautiful before the proof needs to speak.",
];

const CLAIM_BOUNDARIES = [
  {
    title: "What we can prove",
    body: "Synthetic textile studies measure microfibre release during washing, and public agencies document that PFAS have been used in some resistant finishes.",
  },
  {
    title: "What varies",
    body: "Fibre type, yarn, construction, finish, washing and the specific supplier all matter. A material category alone never tells the whole story.",
  },
  {
    title: "What we will not claim",
    body: "Vyoma is not medical clothing. We do not claim treatment, detox effects or that every synthetic garment carries the same risk.",
  },
];

export default function ResearchPage() {
  return (
    <main className="commerce-page research-page-redesign">
      <section className="commerce-hero research-hero-redesign">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">The quiet proof</p>
            <h1>Why we lead with natural fibre.</h1>
            <p className="commerce-lead">
              We'd rather you felt the softness than read a lecture. But if you want to know
              why we choose natural fibres, fewer finishes and gentler close-to-skin layers,
              here's the reading behind it.
            </p>
            <div className="commerce-actions">
              <Link href="/shop" className="btn accent">Shop the catalogue</Link>
              <Link href="/fabric" className="btn ghost">Read the fabric promise</Link>
            </div>
          </div>
          <EditorialImage
            name="fabricMacro"
            alt="Close-up of soft natural-fibre fabric"
            className="research-ledger"
            priority
          />
        </div>
      </section>

      <section className="commerce-section commerce-section-tight" aria-labelledby="evidence-heading">
        <div className="commerce-shell">
          <div className="commerce-section-head">
            <p className="commerce-eyebrow">Material questions</p>
            <h2 id="evidence-heading">The questions behind our material choices.</h2>
            <p>
              We're not here to scare you. These are simply the studies we read while choosing
              softer, simpler materials — linked so you can read them too.
            </p>
          </div>
          <div className="commerce-card-grid three evidence-cards">
            {EVIDENCE.map((item) => (
              <article className="commerce-card evidence-card" key={item.title}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <a href={item.href} target="_blank" rel="noopener noreferrer">{item.source}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="commerce-section research-standard-band" aria-labelledby="principles-heading">
        <div className="commerce-shell two-column-section">
          <div className="sticky-copy">
            <p className="commerce-eyebrow">How we use it</p>
            <h2 id="principles-heading">We'd rather show than shout.</h2>
            <p>
              You should feel the softness first. The evidence is here for when you want to
              look closer — especially on the claims that are easy to exaggerate and hard to back up.
            </p>
          </div>
          <ul className="principle-list">
            {PRINCIPLES.map((item, index) => (
              <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="commerce-section section-light" aria-labelledby="claim-boundaries-heading">
        <div className="commerce-shell">
          <div className="commerce-section-head">
            <p className="commerce-eyebrow">Claim boundaries</p>
            <h2 id="claim-boundaries-heading">Evidence without fear.</h2>
            <p>
              The research page should help you understand our choices, not make you anxious.
              These boundaries keep the brand honest as documentation grows.
            </p>
          </div>
          <div className="commerce-card-grid three">
            {CLAIM_BOUNDARIES.map((item) => (
              <article className="commerce-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
