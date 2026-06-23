import Link from "next/link";
import Waitlist from "@/components/Waitlist";
import ShopGrid from "@/components/ShopGrid";
import styles from "./HomePage.module.css";

const PLASTIC_POINTS = [
  "Polyester, nylon, elastane and spandex",
  "Petroleum-based plastic, not plant fibre",
  "Sheds tiny fibres as you move and wash",
  "Traps heat, sweat and odour against the skin",
];

const VYOMA_POINTS = [
  "Organic-first cotton and cotton-modal blends",
  "Plant-grown fibre chosen for breathability",
  "Soft structure for practice, travel and rest",
  "Certificates published batch by batch as issued",
];

const PILLARS = [
  {
    mark: "01",
    title: "Kind to the skin",
    body:
      "Soft, breathable natural fibre, designed for the layer that stays closest to you.",
  },
  {
    mark: "02",
    title: "Organic, and it performs",
    body:
      "Plant-grown yarns engineered for movement, drape and everyday wear without the petroleum-first default.",
  },
  {
    mark: "03",
    title: "Proof, not promises",
    body:
      "We publish the material standard, hold back unearned claims, and let the product convince.",
  },
];

const STANDARDS = [
  {
    num: "01",
    title: "Organic-first",
    body:
      "Cotton performance knits and cotton-modal jerseys, chosen for breathability, softness and natural movement.",
  },
  {
    num: "02",
    title: "Made in India",
    body:
      "Cut, sewn and checked close to the textile traditions that shaped the practice itself.",
  },
  {
    num: "03",
    title: "Small-batch discipline",
    body:
      "Drops stay considered, traceable and limited enough to protect quality.",
  },
  {
    num: "04",
    title: "Certified as issued",
    body:
      "GOTS and OEKO-TEX documents are published batch by batch as they arrive.",
  },
];

export default function Home() {
  return (
    <main className={styles.home}>
      <section id="top" className={styles.hero}>
        <div className={styles.shell}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Organic-first activewear</p>
              <h1>
                Room to breathe.
                <span>Built to move.</span>
              </h1>
              <p className={styles.lead}>
                <strong>Vyoma</strong> (vee-OH-ma) is Sanskrit for sky. We make
                yoga wear from natural fibre, not the petroleum-first fabrics
                activewear has treated as inevitable.
              </p>
              <div className={styles.actions}>
                <Link href="/fabric" className={styles.primaryCta}>
                  See what it is made of
                </Link>
                <Link href="/#shop" className={styles.textCta}>
                  Shop the collection
                </Link>
              </div>
              <div className={styles.trustStrip} aria-label="Material promise">
                <span>Organic-first</span>
                <span>Made in India</span>
                <span>Small-batch drops</span>
              </div>
            </div>

            <div className={styles.heroVisual} aria-label="The Vyoma Set preview">
              <div className={styles.heroFrame}>
                <span className={styles.heroMark}>Vyoma</span>
                <span className={styles.heroCaption}>model - the vyoma set</span>
              </div>
              <div className={styles.swatchNote}>
                <span />
                Night-sky indigo
                <strong>New</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          <span>No polyester-first default</span>
          <span>Made in India</span>
          <span>Small-batch first drop</span>
          <span>Certified batch by batch</span>
          <span>Built for practice, finished for life</span>
          <span>No polyester-first default</span>
          <span>Made in India</span>
          <span>Small-batch first drop</span>
          <span>Certified batch by batch</span>
          <span>Built for practice, finished for life</span>
        </div>
      </div>

      <section className={styles.section} aria-labelledby="plastic-heading">
        <div className={styles.shell}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>The layer closest to you</p>
            <h2 id="plastic-heading">
              Most activewear starts as plastic. Yours does not have to.
            </h2>
            <p>
              Tight layers sit warm against skin for hours. Vyoma begins with a
              different standard: natural fibre first, transparent claims, and a
              material story you can actually read.
            </p>
          </div>

          <div className={styles.compareGrid}>
            <div className={styles.compareCard}>
              <h3>What you are probably wearing</h3>
              <ul>
                {PLASTIC_POINTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={`${styles.compareCard} ${styles.compareDark}`}>
              <h3>What Vyoma puts there instead</h3>
              <ul>
                {VYOMA_POINTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href="/fabric" className={styles.inverseCta}>
                Read the material standard
              </Link>
            </div>
          </div>

          <p className={styles.pullQuote}>
            Just plants, against your skin. Room to breathe.
          </p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="why-heading">
        <div className={styles.shell}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>Why Vyomawear</p>
            <h2 id="why-heading">A new standard for the layer closest to you.</h2>
            <p>
              What touches your skin, what it is made of, and the proof to back
              it. The things a serious activewear house should make clear from
              day one.
            </p>
          </div>

          <div className={styles.pillars}>
            {PILLARS.map((pillar) => (
              <article className={styles.pillar} key={pillar.title}>
                <span>{pillar.mark}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.standard} aria-labelledby="standard-heading">
        <div className={styles.shell}>
          <div className={styles.standardGrid}>
            <div className={styles.standardIntro}>
              <p className={styles.eyebrow}>The House Standard</p>
              <h2 id="standard-heading">
                Not just softer.
                <span>More considered.</span>
              </h2>
              <p>
                Enduring brands are built on recognisable standards. Ours is
                simple: activewear that feels alive on the body, with origin and
                certification treated as product facts, not theatre.
              </p>
              <Link href="/fabric" className={styles.inverseCta}>
                Read the standard
              </Link>
            </div>

            <div className={styles.standardList}>
              {STANDARDS.map((standard) => (
                <article className={styles.standardItem} key={standard.num}>
                  <span>{standard.num}</span>
                  <div>
                    <h3>{standard.title}</h3>
                    <p>{standard.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="shop" className={`${styles.section} ${styles.collection}`} aria-labelledby="collection-heading">
        <div className={styles.shell}>
          <div className={styles.collectionHead}>
            <div>
              <p className={styles.eyebrow}>The Collection</p>
              <h2 id="collection-heading">
                The first wardrobe of organic performance layers.
              </h2>
            </div>
            <Link href="/sky-series" className={styles.textCta}>
              See the Sky Series
            </Link>
          </div>
          <ShopGrid />
        </div>
      </section>

      <section className={styles.origin} aria-labelledby="origin-heading">
        <div className={styles.shell}>
          <div className={styles.originPanel}>
            <div className={styles.originArt}>
              <span>Vyoma</span>
            </div>
            <div className={styles.originCopy}>
              <p className={styles.eyebrow}>How it is made</p>
              <h2 id="origin-heading">Made slowly, by hands that care.</h2>
              <p>
                Everything is cut, sewn and checked in India, one of the great
                textile traditions on earth. Small batches, made without rushing,
                so nothing leaves until it earns the name.
              </p>
              <p>
                Whether you practise in Mumbai or Melbourne, it reaches you the
                same way: made with care, carried with pride.
              </p>
              <Link href="/making" className={styles.textCta}>
                Follow a piece from order to door
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="circle" className={styles.circle} aria-labelledby="circle-heading">
        <div className={styles.circleInner}>
          <p className={styles.eyebrow}>The First Drop</p>
          <h2 id="circle-heading">Small batch. The circle hears first.</h2>
          <p>
            The first circle is small. Join to be among the founders, and bring
            a friend to move up the line.
          </p>
          <Waitlist source="homepage" />
          <div className={styles.circleMeta}>
            <span>No spam, ever.</span>
            <span>Leave whenever you like.</span>
            <Link href="/circle">How The Circle works</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
