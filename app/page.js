import Link from "next/link";
import AmberProductStage from "@/components/AmberProductStage";
import LandingSky from "@/components/LandingSky";
import Waitlist from "@/components/Waitlist";
import ShopGrid from "@/components/ShopGrid";
import styles from "./HomePage.module.css";

const SHOP_LANES = [
  {
    title: "Men",
    href: "/men",
    body: "Training tee, jogger, trunk, hoodie, socks and the warm carry kit.",
  },
  {
    title: "Women",
    href: "/shop#collection",
    body: "Sculpted leggings, studio tops, bras, skorts and soft sets for movement and the hours after.",
  },
  {
    title: "Pure",
    href: "/pure",
    body: "Closest-to-skin cotton basics for the first layer of the day.",
  },
  {
    title: "Accessories",
    href: "/shop#collection",
    body: "Crew socks and carry pieces that finish the kit.",
  },
];

const DAY_SYSTEM = [
  {
    mark: "01",
    title: "Train",
    body: "Warm activewear that feels sharp on the gym floor and clean enough to keep on after.",
    image: "/products/vyoma-practice-tee/men-lifestyle.webp",
    alt: "Vyoma Practice Tee styled for training",
  },
  {
    mark: "02",
    title: "Travel",
    body: "Natural-fibre layers, carry pieces and easy silhouettes for movement between places.",
    image: "/products/vyoma-mat-bag/men-lifestyle.webp",
    alt: "Vyoma carry kit for travel and daily movement",
  },
  {
    mark: "03",
    title: "Recover",
    body: "Soft fleece, breathable bases and quieter textures for the part of the day when your body wants ease.",
    image: "/products/vyoma-meditation-hoodie/men-lifestyle.webp",
    alt: "Vyoma Recovery Hoodie lifestyle layer",
  },
  {
    mark: "04",
    title: "Live",
    body: "The layer your body lives in: calm on skin, polished in public and simple to trust.",
    image: "/products/vyoma-the-set/model.webp",
    alt: "Vyoma set for activewear and everyday life",
  },
];

const TRUST_POINTS = [
  {
    title: "Fit confidence",
    body: "Clear sizing, product-specific fit notes and an easy path to choose the right layer first.",
  },
  {
    title: "Material clarity",
    body: "Natural-fibre-first pieces with plain fabric and care language on every product page.",
  },
  {
    title: "Secure checkout",
    body: "Move from product page to payment with a protected checkout path.",
  },
];

const BODY_NOTICES = [
  {
    mark: "Feel clean",
    title: "Softer first touch.",
    body: "Start the day with layers that feel calm against skin instead of loud, slick or overbuilt.",
  },
  {
    mark: "Move freely",
    title: "Ready for more than the workout.",
    body: "Pieces move from the mat to errands, flights and recovery without making you feel half dressed.",
  },
  {
    mark: "Stay ready",
    title: "Less changing, less thinking.",
    body: "A clean activewear kit reduces the small decisions between training, travel and the hours after.",
  },
  {
    mark: "Choose better",
    title: "Natural-fibre first where it matters.",
    body: "Fabric language stays clear and evidence-led, so comfort feels practical rather than performative.",
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
              <p className={styles.eyebrow}>Vyomawear lifestyle activewear</p>
              <h1>
                Organic-first activewear.
                <span>For the body you live in all day.</span>
              </h1>
              <p className={styles.lead}>
                Your body notices what touches it all day. Vyoma makes warm natural-fibre
                layers for training, travel, recovery and everything after.
              </p>
              <div className={styles.actions}>
                <Link href="/shop" className={styles.primaryCta}>
                  Shop the catalogue
                </Link>
                <Link href="/men" className={styles.secondaryCta}>
                  Men
                </Link>
                <Link href="/shop#collection" className={styles.secondaryCta}>
                  Women
                </Link>
                <Link href="/pure" className={styles.textCta}>
                  Pure
                </Link>
              </div>
              <div className={styles.trustStrip} aria-label="Shopping promises">
                <span>Train to travel</span>
                <span>Natural-fibre first</span>
                <span>Secure checkout</span>
              </div>
            </div>

            <AmberProductStage variant="home" priority className={styles.heroStage} />
          </div>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          <span>Warm copper activewear</span>
          <span>Training</span>
          <span>Travel</span>
          <span>Recovery</span>
          <span>Closest-to-skin comfort</span>
          <span>Warm copper activewear</span>
          <span>Training</span>
          <span>Travel</span>
          <span>Recovery</span>
          <span>Closest-to-skin comfort</span>
        </div>
      </div>

      <section className={styles.shopLanes} aria-labelledby="shop-lanes-heading">
        <div className={styles.shell}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>Shop by wardrobe moment</p>
            <h2 id="shop-lanes-heading">The right path to the layer your day needs.</h2>
            <p>
              Men, Women, Pure and accessories stay connected under one calm activewear system.
            </p>
          </div>
          <div className={styles.laneGrid}>
            {SHOP_LANES.map((lane) => (
              <Link href={lane.href} className={styles.laneCard} key={lane.title}>
                <strong>{lane.title}</strong>
                <span>{lane.body}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.systemSection} aria-labelledby="system-heading">
        <div className={styles.shell}>
          <div className={styles.systemGrid}>
            <div className={styles.stickyCopy}>
              <p className={styles.eyebrow}>Built around your day</p>
              <h2 id="system-heading">Dress for the whole day, not one hour.</h2>
              <p>
                The closest layer matters because it stays with you: while you train, while you
                travel, while you recover and while you get on with life.
              </p>
              <Link href="/shop" className={styles.inverseCta}>
                Browse all products
              </Link>
            </div>
            <div className={styles.systemCards}>
              {DAY_SYSTEM.map((item) => (
                <article className={styles.systemCard} key={item.title}>
                  <figure className={styles.systemVisual}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                  </figure>
                  <div className={styles.systemText}>
                    <span>{item.mark}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.colourSection} aria-labelledby="body-notices-heading">
        <div className={styles.shell}>
          <div className={styles.collectionHead}>
            <div>
              <p className={styles.eyebrow}>Your body notices</p>
              <h2 id="body-notices-heading">The layer sets the tone for the day.</h2>
            </div>
            <p>
              Vyoma is not only about looking dressed for movement. It is about feeling
              cleaner, calmer and more ready inside the clothes you keep on.
            </p>
          </div>
          <div className={styles.colourGrid}>
            {BODY_NOTICES.map((point) => (
              <article className={styles.colourCard} key={point.title}>
                <span>{point.mark}</span>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="shop" className={`${styles.section} ${styles.collection}`} aria-labelledby="collection-heading">
        <div className={styles.shell}>
          <div className={styles.collectionHead}>
            <div>
              <p className={styles.eyebrow}>The catalogue</p>
              <h2 id="collection-heading">All the pieces in one place.</h2>
            </div>
            <Link href="/shop" className={styles.textCta}>
              Open the full shop
            </Link>
          </div>
          <ShopGrid />
        </div>
      </section>

      <section className={styles.confidenceSection} aria-labelledby="confidence-heading">
        <div className={styles.shell}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>Buy with clarity</p>
            <h2 id="confidence-heading">Confidence beats hype.</h2>
            <p>
              We do not use fear. We use evidence, restraint and better material choices,
              then keep fit, fabric and checkout details easy to find.
            </p>
          </div>
          <div className={styles.proofGrid}>
            {TRUST_POINTS.map((point) => (
              <article className={styles.proofCard} key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="circle" className={styles.circle} aria-labelledby="circle-heading">
        <div className={styles.circleInner}>
          <p className={styles.eyebrow}>The Circle</p>
          <h2 id="circle-heading">A quieter way to follow what comes next.</h2>
          <p>
            Join for product notes, restock signals and useful material updates. No pressure,
            no noisy campaign language.
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
