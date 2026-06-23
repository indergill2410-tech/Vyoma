import Link from "next/link";
import styles from "./Research.module.css";

export const metadata = {
  title: "Research",
  description:
    "The research behind Vyomawear's natural-fibre activewear standard: synthetic microfibres, PFAS, endocrine-disrupting chemicals and transparent testing.",
};

const EVIDENCE = [
  {
    label: "Microfibres",
    stat: "124-308 mg/kg",
    title: "Synthetic clothing can shed during washing.",
    body:
      "A 2019 Scientific Reports study measured microfiber release from synthetic garments and found that construction, yarn and fibre type all change how much is released.",
    source: "Scientific Reports, 2019",
    href: "https://www.nature.com/articles/s41598-019-43023-x",
  },
  {
    label: "PFAS",
    stat: "Slow to break down",
    title: "Some performance finishes persist.",
    body:
      "The US EPA notes that PFAS have been used in consumer products including stain- and water-resistant clothing, and that many PFAS break down slowly over time.",
    source: "US EPA, updated 2026",
    href: "https://www.epa.gov/pfas/our-current-understanding-human-health-and-environmental-risks-pfas",
  },
  {
    label: "Hormone systems",
    stat: "Everyday exposure",
    title: "Chemical classes deserve careful screening.",
    body:
      "NIEHS explains that endocrine-disrupting chemicals can be found in everyday products, with exposure possible through air, food, water and skin contact.",
    source: "NIEHS",
    href: "https://www.niehs.nih.gov/health/topics/agents/endocrine",
  },
];

const STANDARD = [
  {
    title: "Natural fibre first",
    body:
      "Use cotton-led and cotton-modal fabrics where they can meet the performance need, instead of treating petroleum-based synthetics as the default.",
  },
  {
    title: "Transparent testing",
    body:
      "Publish batch documentation as certification arrives, and keep the language tied to what has actually been verified.",
  },
  {
    title: "Low-assumption design",
    body:
      "Choose fewer finishes, clearer compositions and small-batch production so the material story stays inspectable.",
  },
  {
    title: "No medical theatre",
    body:
      "Clothing does not treat or prevent disease. Vyoma is about better material choices, clearer evidence and a calmer daily layer.",
  },
];

const SOURCES = [
  {
    title: "US EPA: PFAS health and environmental risks",
    href: "https://www.epa.gov/pfas/our-current-understanding-human-health-and-environmental-risks-pfas",
  },
  {
    title: "NIEHS: Endocrine disruptors",
    href: "https://www.niehs.nih.gov/health/topics/agents/endocrine",
  },
  {
    title: "NIEHS: Perfluoroalkyl and polyfluoroalkyl substances",
    href: "https://www.niehs.nih.gov/health/topics/agents/pfc",
  },
  {
    title: "De Falco et al., Scientific Reports, 2019",
    href: "https://www.nature.com/articles/s41598-019-43023-x",
  },
];

export default function ResearchPage() {
  return (
    <main className={styles.research}>
      <section className={styles.hero}>
        <div className={styles.shell}>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>Vyoma Research</p>
              <h1>Why the closest layer deserves evidence.</h1>
              <p className={styles.lead}>
                Synthetic activewear works. It also comes with material questions
                that are easy to miss at checkout: microfiber release, chemical
                finishes and long daily skin contact. Vyoma takes a practical
                position - reduce avoidable synthetic contact, test what we can,
                and explain the evidence plainly.
              </p>
              <div className={styles.actions}>
                <Link href="/#shop" className={styles.primaryCta}>
                  Shop the collection
                </Link>
                <Link href="/fabric" className={styles.secondaryCta}>
                  Read the fabric story
                </Link>
              </div>
            </div>

            <aside className={styles.proofPanel} aria-label="Research summary">
              <span>Evidence model</span>
              <strong>Reduce. Test. Publish.</strong>
              <p>
                A precautionary standard for activewear worn warm, tight and
                close to skin.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="evidence-heading">
        <div className={styles.shell}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>The evidence map</p>
            <h2 id="evidence-heading">Three material issues shape our standard.</h2>
            <p>
              This is not fear-based marketing. It is the reason we are building
              activewear with a higher burden of proof.
            </p>
          </div>

          <div className={styles.evidenceGrid}>
            {EVIDENCE.map((item) => (
              <article className={styles.evidenceCard} key={item.title}>
                <p className={styles.cardLabel}>{item.label}</p>
                <strong>{item.stat}</strong>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.source}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.standard} aria-labelledby="standard-heading">
        <div className={styles.shell}>
          <div className={styles.standardGrid}>
            <div className={styles.stickyIntro}>
              <p className={styles.eyebrow}>The Vyoma USP model</p>
              <h2 id="standard-heading">A cleaner material story people can inspect.</h2>
              <p>
                The USP is not simply "organic activewear." It is a visible
                system: natural fibre first, source-led manufacturing, small
                batches and batch-level proof.
              </p>
            </div>

            <div className={styles.standardList}>
              {STANDARD.map((item, index) => (
                <article className={styles.standardItem} key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="sources-heading">
        <div className={styles.shell}>
          <div className={styles.sourcesPanel}>
            <div>
              <p className={styles.eyebrow}>Sources</p>
              <h2 id="sources-heading">The reading behind this page.</h2>
              <p>
                We will keep expanding this page as supplier testing, batch
                certificates and product-specific documents are ready to publish.
              </p>
            </div>
            <ul>
              {SOURCES.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer">
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="closing-heading">
        <div className={styles.shell}>
          <p className={styles.eyebrow}>The simple choice</p>
          <h2 id="closing-heading">Less mystery in the layer you wear all day.</h2>
          <div className={styles.actions}>
            <Link href="/#shop" className={styles.inverseCta}>
              Shop Vyoma
            </Link>
            <Link href="/circle" className={styles.lightCta}>
              Join The Circle
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
