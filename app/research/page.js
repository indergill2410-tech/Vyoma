import Link from "next/link";
import styles from "./Research.module.css";

export const metadata = {
  title: "Research",
  description:
    "Why Vyomawear chooses natural-fibre activewear: less plastic against skin, clearer material standards and a softer daily layer.",
};

const EVIDENCE = [
  {
    label: "Microfibres",
    stat: "124-308 mg/kg",
    title: "Synthetic garments can shed.",
    body:
      "A 2019 Scientific Reports study measured microfiber release from synthetic garments and found that construction, yarn and fibre type all change how much is released.",
    source: "Scientific Reports, 2019",
    href: "https://www.nature.com/articles/s41598-019-43023-x",
  },
  {
    label: "PFAS",
    stat: "Slow to break down",
    title: "Some finishes are made to last.",
    body:
      "The US EPA notes that PFAS have been used in consumer products including stain- and water-resistant clothing, and that many PFAS break down slowly over time.",
    source: "US EPA, updated 2026",
    href: "https://www.epa.gov/pfas/our-current-understanding-human-health-and-environmental-risks-pfas",
  },
  {
    label: "Skin contact",
    stat: "Everyday exposure",
    title: "The closest layer deserves care.",
    body:
      "NIEHS explains that some endocrine-disrupting chemicals can be found in everyday products, with exposure possible through air, food, water and skin contact.",
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
    title: "Open material notes",
    body:
      "Share batch documentation as it arrives, and keep the product language tied to what has actually been verified.",
  },
  {
    title: "Designed with fewer unknowns",
    body:
      "Choose fewer finishes, clearer compositions and small-batch production so the material story stays easy to follow.",
  },
  {
    title: "Careful, not clinical",
    body:
      "Clothing does not treat or prevent disease. Vyoma is about a softer material choice, a clearer story and a calmer daily layer.",
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
              <p className={styles.eyebrow}>Why it matters</p>
              <h1>A gentler layer begins with better materials.</h1>
              <p className={styles.lead}>
                Synthetic activewear can perform beautifully, but the layer closest
                to your skin should not be a mystery. This page explains the choice
                behind Vyoma: less plastic where possible, clearer standards, and a
                softer feeling you can live in.
              </p>
              <div className={styles.actions}>
                <Link href="/#shop" className={styles.primaryCta}>
                  Shop the first drop
                </Link>
                <Link href="/fabric" className={styles.secondaryCta}>
                  Feel the fabric
                </Link>
              </div>
            </div>

            <aside className={styles.proofPanel} aria-label="Material promise summary">
              <span>Our promise</span>
              <strong>Less plastic. More care.</strong>
              <p>
                A thoughtful standard for activewear worn warm, tight and close
                to skin.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="evidence-heading">
        <div className={styles.shell}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>The material question</p>
            <h2 id="evidence-heading">What shaped the Vyoma standard.</h2>
            <p>
              This is not fear-based marketing. It is the quiet reason we choose
              softer natural fibres and keep our material promises visible.
            </p>
          </div>

          <div className={styles.evidenceGrid}>
            {EVIDENCE.map((item) => (
              <article className={styles.evidenceCard} key={item.title}>
                <p className={styles.cardLabel}>{item.label}</p>
                <strong>{item.stat}</strong>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
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
              <p className={styles.eyebrow}>The Vyoma standard</p>
              <h2 id="standard-heading">A softer choice with a clearer story.</h2>
              <p>
                The point is not to sound technical. The point is to make clothes
                you want to reach for, while being honest about what they are made
                from and how they are made.
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
              <h2 id="sources-heading">The reading we keep behind the scenes.</h2>
              <p>
                For customers who want the detail, these are part of the reading
                trail behind our material choices. We will keep expanding this as
                supplier testing and product-specific documents are ready to share.
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
          <h2 id="closing-heading">Wear the layer that lets you exhale.</h2>
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
