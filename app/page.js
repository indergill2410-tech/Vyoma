import Link from "next/link";
import LandingSky from "@/components/LandingSky";
import Waitlist from "@/components/Waitlist";
import ShopGrid from "@/components/ShopGrid";
import styles from "./HomePage.module.css";

const MATERIAL_POINTS = [
  "Most leggings are built on polyester, nylon and elastane - plastic-based fibres.",
  "Finishes can be hard to see, but you still feel the fabric all day.",
  "Tight, warm layers should feel soft, breathable and considered.",
  "A better wardrobe starts with knowing what sits against your skin.",
];

const VYOMA_POINTS = [
  "Natural fibre first, chosen for softness, breathability and ease.",
  "Organic and OEKO-TEX targets as each batch is documented.",
  "Made in India in smaller runs, with care visible in the finish.",
  "No scare tactics. Just better-feeling clothes with a clearer story.",
];

const CARE_CARDS = [
  {
    title: "Less plastic against skin",
    body:
      "Your activewear is one of the closest layers you own. Vyoma starts by reducing avoidable synthetic contact where softness matters most.",
  },
  {
    title: "Breathes through movement",
    body:
      "Made for heat, stretch, stillness and the long hours after practice. The feeling should stay calm, not clingy.",
  },
  {
    title: "A clearer promise",
    body:
      "The fabric story is part of the product, not an afterthought. We keep the claims simple and the standards visible.",
  },
];

const PILLARS = [
  {
    mark: "01",
    title: "Close-to-skin comfort",
    body:
      "Soft where it touches, supportive where you move, breathable through the parts of the day you did not plan for.",
  },
  {
    mark: "02",
    title: "Made to move quietly",
    body:
      "Clean lines, easy stretch and a polished finish that belongs in practice, travel, errands and the pause after.",
  },
  {
    mark: "03",
    title: "Care you can feel",
    body:
      "Materials, making and batch notes kept clear, because trust should feel calm before you even put it on.",
  },
];

const STANDARDS = [
  {
    num: "01",
    title: "Soft natural fibres",
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
    title: "Small-batch care",
    body:
      "Limited drops keep quality visible, reduce overproduction and make each release feel considered.",
  },
  {
    num: "04",
    title: "Clear claims",
    body:
      "No medical claims. No vague wellness theatre. Just materials, making and standards shown plainly.",
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
              <p className={styles.eyebrow}>Organic activewear for softer days</p>
              <h1>
                Room to breathe.
                <span>Built to move.</span>
              </h1>
              <p className={styles.lead}>
                Vyoma is the layer you reach for when you want your body to feel
                calm: organic-first activewear, made close to the source, with
                less plastic against your skin.
              </p>
              <div className={styles.actions}>
                <Link href="/#shop" className={styles.primaryCta}>
                  Shop the first drop
                </Link>
                <Link href="/fabric" className={styles.textCta}>
                  See the fabric promise
                </Link>
                <Link href="/circle" className={styles.textCta}>
                  Join The Circle
                </Link>
              </div>
              <div className={styles.trustStrip} aria-label="Material promise">
                <span>Soft natural fibres</span>
                <span>Made in India</span>
                <span>Secure checkout</span>
              </div>
            </div>

            <div className={styles.heroVisual} aria-label="The Vyoma Set preview">
              <div className={styles.heroFrame}>
                <span className={styles.heroMark}>Vyoma</span>
                <span className={styles.heroCaption}>the first set</span>
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
          <span>Soft against skin</span>
          <span>Made in India</span>
          <span>Small-batch first drop</span>
          <span>Organic-first fibres</span>
          <span>Built for practice, finished for life</span>
          <span>Soft against skin</span>
          <span>Made in India</span>
          <span>Small-batch first drop</span>
          <span>Organic-first fibres</span>
          <span>Built for practice, finished for life</span>
        </div>
      </div>

      <section className={styles.researchTeaser} aria-labelledby="research-heading">
        <div className={styles.shell}>
          <div className={styles.splitIntro}>
            <div>
              <p className={styles.eyebrow}>Why plastic-free feels different</p>
              <h2 id="research-heading">The closest layer should feel like care, not compromise.</h2>
            </div>
            <p>
              The material story matters because you live in these clothes - in
              heat, stretch, sweat, stillness and the rush between places. Vyoma
              keeps the choice simple: softer natural fibres, fewer unknowns and
              a calmer feeling on skin.
            </p>
          </div>

          <div className={styles.researchGrid}>
            {CARE_CARDS.map((card) => (
              <article key={card.title} className={styles.researchCard}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>

          <div className={styles.centerAction}>
            <Link href="/research" className={styles.primaryCta}>
              Learn why it matters
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="materials-heading">
        <div className={styles.shell}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>The layer closest to you</p>
            <h2 id="materials-heading">
              Most activewear starts with plastic. Vyoma starts with how you want to feel.
            </h2>
            <p>
              No fear. No lecture. Just a more thoughtful choice for the pieces
              you wear tight, warm and often.
            </p>
          </div>

          <div className={styles.compareGrid}>
            <div className={styles.compareCard}>
              <h3>What the category often asks you to accept</h3>
              <ul>
                {MATERIAL_POINTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={`${styles.compareCard} ${styles.compareDark}`}>
              <h3>What Vyoma chooses instead</h3>
              <ul>
                {VYOMA_POINTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href="/fabric" className={styles.inverseCta}>
                Meet the fabric
              </Link>
            </div>
          </div>

          <p className={styles.pullQuote}>
            A calmer layer for practice, travel, errands and everything after.
          </p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="why-heading">
        <div className={styles.shell}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>Why Vyomawear</p>
            <h2 id="why-heading">Clothes that make space for your body.</h2>
            <p>
              The first feeling should be relief: nothing scratchy, nothing loud,
              nothing you have to fight. Just a soft, beautiful layer that moves
              with you.
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
                Soft first.
                <span>Clear always.</span>
              </h2>
              <p>
                A beautiful brand still needs a backbone. Ours is simple: make
                the layer feel incredible, make it useful beyond the mat, and
                keep the material story honest.
              </p>
              <Link href="/research" className={styles.inverseCta}>
                Why we choose this
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
                The first drop of soft organic movement layers.
              </h2>
            </div>
            <Link href="/sky-series" className={styles.textCta}>
              Explore the Sky Series
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
            Join for early access to the pieces, founder notes, and the quiet
            thrill of building a better wardrobe from the first drop.
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
