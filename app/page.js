import Link from "next/link";
import LandingSky from "@/components/LandingSky";
import Waitlist from "@/components/Waitlist";
import ShopGrid from "@/components/ShopGrid";
import styles from "./HomePage.module.css";

const MATERIAL_POINTS = [
  "Polyester, nylon, acrylic and elastane are synthetic polymer fibres.",
  "Many performance finishes are invisible at checkout, so testing matters.",
  "Tight, warm, high-friction layers deserve a higher material standard.",
  "We publish the standard first, then verify each batch as certification arrives.",
];

const VYOMA_POINTS = [
  "Natural fibre first, chosen for breathability and softness.",
  "Organic and OEKO-TEX targets, published batch by batch.",
  "Made in India in small runs, with fewer untraceable assumptions.",
  "No health claims, just clearer facts about what touches your skin.",
];

const RESEARCH_CARDS = [
  {
    title: "Synthetic fibres shed",
    body:
      "Studies show synthetic garments can release large numbers of microfibres during washing. Fibre type, yarn structure and garment construction all matter.",
  },
  {
    title: "Finishes deserve scrutiny",
    body:
      "PFAS, BPA, phthalates and other chemical classes are studied because some can persist, migrate or interact with hormone systems.",
  },
  {
    title: "Certification beats promises",
    body:
      "A premium claim should be backed by batch-level documents, clear material composition and a willingness to say what is still being tested.",
  },
];

const PILLARS = [
  {
    mark: "01",
    title: "Designed for skin contact",
    body:
      "The closer a layer sits, the more its fibre, finish and feel matter. Vyoma starts with the material standard.",
  },
  {
    mark: "02",
    title: "Organic-first performance",
    body:
      "Movement, drape and breathability without treating petroleum-based synthetics as the only way to make activewear.",
  },
  {
    mark: "03",
    title: "Proof over persuasion",
    body:
      "We keep the language careful, publish the research trail and verify batches as certificates are issued.",
  },
];

const STANDARDS = [
  {
    num: "01",
    title: "Natural fibre first",
    body:
      "Cotton performance knits and cotton-modal jerseys selected for comfort, breathability and daily wear.",
  },
  {
    num: "02",
    title: "Made close to the source",
    body:
      "Cut, sewn and checked in India, with a supply base that can be documented rather than guessed.",
  },
  {
    num: "03",
    title: "Small-batch discipline",
    body:
      "Limited drops keep quality visible, reduce overproduction and make batch documentation practical.",
  },
  {
    num: "04",
    title: "Claims we can stand behind",
    body:
      "No medical claims. No vague wellness theatre. Just materials, testing and evidence shown plainly.",
  },
];

export default function Home() {
  return (
    <main className={styles.home}>
      <LandingSky className={styles.skyField} />

      <section id="top" className={styles.hero}>
        <div className={styles.shell}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Research-led organic activewear</p>
              <h1>
                Room to breathe.
                <span>Proof to move.</span>
              </h1>
              <p className={styles.lead}>
                Vyoma is activewear for the layer closest to your skin: natural
                fibre first, transparent testing, and a calmer alternative to
                plastic-first performance wear.
              </p>
              <div className={styles.actions}>
                <Link href="/research" className={styles.primaryCta}>
                  Read the research
                </Link>
                <Link href="/#shop" className={styles.secondaryCta}>
                  Shop the collection
                </Link>
                <Link href="/circle" className={styles.textCta}>
                  Join The Circle
                </Link>
              </div>
              <div className={styles.trustStrip} aria-label="Material promise">
                <span>Natural fibre first</span>
                <span>Batch proof</span>
                <span>No medical claims</span>
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
                <strong>First drop</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          <span>Research-led materials</span>
          <span>Made in India</span>
          <span>Small-batch first drop</span>
          <span>Certified batch by batch</span>
          <span>Built for practice, finished for life</span>
          <span>Research-led materials</span>
          <span>Made in India</span>
          <span>Small-batch first drop</span>
          <span>Certified batch by batch</span>
          <span>Built for practice, finished for life</span>
        </div>
      </div>

      <section className={styles.researchTeaser} aria-labelledby="research-heading">
        <div className={styles.shell}>
          <div className={styles.splitIntro}>
            <div>
              <p className={styles.eyebrow}>The research behind the standard</p>
              <h2 id="research-heading">Plastic-first clothing is convenient. It is not neutral.</h2>
            </div>
            <p>
              Synthetic fibres changed activewear, but the science around microfibres,
              chemical finishes and long-term exposure is still developing. Vyoma takes
              the practical route: reduce avoidable synthetic contact, test what we can,
              and explain the evidence plainly.
            </p>
          </div>

          <div className={styles.researchGrid}>
            {RESEARCH_CARDS.map((card) => (
              <article key={card.title} className={styles.researchCard}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>

          <div className={styles.centerAction}>
            <Link href="/research" className={styles.primaryCta}>
              Explore the evidence
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="materials-heading">
        <div className={styles.shell}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>The layer closest to you</p>
            <h2 id="materials-heading">
              Most activewear starts with synthetic plastic. Yours does not have to.
            </h2>
            <p>
              We are not here to scare you out of your wardrobe. We are here to
              make the material choice visible, especially for garments worn tight,
              warm and close to skin.
            </p>
          </div>

          <div className={styles.compareGrid}>
            <div className={styles.compareCard}>
              <h3>What the category often relies on</h3>
              <ul>
                {MATERIAL_POINTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={`${styles.compareCard} ${styles.compareDark}`}>
              <h3>What Vyoma is building instead</h3>
              <ul>
                {VYOMA_POINTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href="/fabric" className={styles.inverseCta}>
                Read the fabric story
              </Link>
            </div>
          </div>

          <p className={styles.pullQuote}>
            Fewer assumptions. Better evidence. A calmer layer against the skin.
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
              it. The things a serious activewear house should make clear from day one.
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
                <span>More accountable.</span>
              </h2>
              <p>
                Enduring brands are built on standards people can understand.
                Ours is simple: make the layer beautiful, make it functional,
                and make the material facts easy to inspect.
              </p>
              <Link href="/research" className={styles.inverseCta}>
                Read the research
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
