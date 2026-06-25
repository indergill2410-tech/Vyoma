import Link from "next/link";
import LandingSky from "@/components/LandingSky";
import Waitlist from "@/components/Waitlist";
import ShopGrid from "@/components/ShopGrid";
import styles from "./HomePage.module.css";

const MATERIAL_POINTS = [
  "Most performance wear leans heavily on polyester, nylon and elastane.",
  "Some chemical finishes are invisible at checkout, so the details matter.",
  "Tight, warm, high-friction layers deserve a higher material standard.",
  "We lead with natural fibres and stay honest about what's still being tested.",
];

const VYOMA_POINTS = [
  "Natural fibre first, chosen for breathability and softness.",
  "Cotton-led and cotton-modal fabrics that move with you.",
  "Made in India in small runs, with fewer untraceable assumptions.",
  "No big health claims — just clearer facts about what touches your skin.",
];

const RESEARCH_CARDS = [
  {
    title: "Synthetic fibres shed",
    body:
      "Studies show synthetic garments can release microfibres during washing. Fibre type, yarn structure and construction all matter — so the material you start with matters too.",
  },
  {
    title: "Finishes are worth a look",
    body:
      "PFAS and other finishing chemicals are studied because some can persist or migrate. We'd rather use fewer of them and say what we've verified.",
  },
  {
    title: "Proof over promises",
    body:
      "A premium claim should be backed by clear material composition and batch documentation as it becomes available — not vibes.",
  },
];

const PILLARS = [
  {
    mark: "01",
    title: "Made to move",
    body:
      "Buttery, supportive and opaque where it counts — built for the studio and the gym, finished for the rest of your day.",
  },
  {
    mark: "02",
    title: "Natural fibre first",
    body:
      "Breathable, cotton-led fabrics chosen for feel and comfort, with fewer synthetics sitting against your skin.",
  },
  {
    mark: "03",
    title: "Made in India",
    body:
      "Cut, sewn and checked by hand in small runs, in one of the great textile traditions on earth. Made to last.",
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
      "Cut, sewn and checked in India, with a supply base we can document rather than guess at.",
  },
  {
    num: "03",
    title: "Small-batch discipline",
    body:
      "Limited drops keep quality visible, reduce overproduction and make good documentation practical.",
  },
  {
    num: "04",
    title: "Claims we can stand behind",
    body:
      "No medical claims, no wellness theatre — just better materials, honest making and a calmer layer to live in.",
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
              <p className={styles.eyebrow}>Natural-fibre activewear · Made in India</p>
              <h1>
                Room to breathe.
                <span>Made to move.</span>
              </h1>
              <p className={styles.lead}>
                Vyoma is activewear with a yoga soul — natural-fibre first,
                beautifully made, and built to carry you from the mat to the gym
                to the rest of your day. A calmer, more considered layer against
                your skin.
              </p>
              <div className={styles.actions}>
                <Link href="/#shop" className={styles.primaryCta}>
                  Shop the collection
                </Link>
                <Link href="/circle" className={styles.secondaryCta}>
                  Join The Circle
                </Link>
                <Link href="/research" className={styles.textCta}>
                  Why natural fibre
                </Link>
              </div>
              <div className={styles.trustStrip} aria-label="The Vyoma promise">
                <span>Natural fibre first</span>
                <span>Studio to street</span>
                <span>Made in India</span>
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
          <span>Natural-fibre activewear</span>
          <span>Made in India</span>
          <span>Studio to street</span>
          <span>Small-batch first drop</span>
          <span>Built for practice, finished for life</span>
          <span>Natural-fibre activewear</span>
          <span>Made in India</span>
          <span>Studio to street</span>
          <span>Small-batch first drop</span>
          <span>Built for practice, finished for life</span>
        </div>
      </div>

      <section className={styles.section} aria-labelledby="materials-heading">
        <div className={styles.shell}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>The layer closest to you</p>
            <h2 id="materials-heading">
              Performance wear is usually mostly synthetic. Ours doesn&apos;t have to be.
            </h2>
            <p>
              We&apos;re not here to scare you out of your wardrobe. We just think
              the material choice should be easy to see — especially for clothes
              worn tight, warm and close to skin.
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
            Fewer assumptions. Better materials. A calmer layer to live in.
          </p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="why-heading">
        <div className={styles.shell}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>Why Vyomawear</p>
            <h2 id="why-heading">Built to move. Made to last.</h2>
            <p>
              Activewear you can practise in, train in and live in — made from
              better materials, with the proof to back it.
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

      <section id="shop" className={`${styles.section} ${styles.collection}`} aria-labelledby="collection-heading">
        <div className={styles.shell}>
          <div className={styles.collectionHead}>
            <div>
              <p className={styles.eyebrow}>The Collection</p>
              <h2 id="collection-heading">
                The first wardrobe of natural-fibre performance layers.
              </h2>
            </div>
            <Link href="/sky-series" className={styles.textCta}>
              See the Sky Series
            </Link>
          </div>
          <ShopGrid />
        </div>
      </section>

      <section className={styles.researchTeaser} aria-labelledby="research-heading">
        <div className={styles.shell}>
          <div className={styles.splitIntro}>
            <div>
              <p className={styles.eyebrow}>Why natural fibre</p>
              <h2 id="research-heading">A softer take on performance wear.</h2>
            </div>
            <p>
              Synthetics changed activewear — but the science on microfibres and
              chemical finishes is still developing. We take the practical route:
              lead with natural fibres, use fewer finishes, and explain what we
              know plainly. If you want the detail, we&apos;ve gathered it.
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
              Explore the research
            </Link>
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
                Wherever you practise or train, it reaches you the same way:
                made with care, carried with pride.
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
