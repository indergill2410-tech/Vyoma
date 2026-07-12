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
    body: "Training tee, jogger, trunk, hoodie, socks and carry pieces that feel clean after the workout too.",
  },
  {
    title: "Women",
    href: "/women",
    body: "Leggings, bras, skorts, tops and soft sets for practice, warm days and the hours after.",
  },
  {
    title: "Pure",
    href: "/pure",
    body: "Soft cotton-led first layers for the skin that notices every seam.",
  },
  {
    title: "Accessories",
    href: "/accessories",
    body: "Crew socks and carry pieces that make the activewear kit feel complete.",
  },
];

const DAY_SYSTEM = [
  {
    mark: "01",
    title: "Train",
    body: "Soft structure for the session, with a clean finish you can keep wearing after.",
    image: "/products/vyoma-practice-tee/men-lifestyle.webp",
    alt: "Vyoma Practice Tee styled for training",
  },
  {
    mark: "02",
    title: "Travel",
    body: "Breathable layers and carry pieces for commutes, flights and the in-between parts of the day.",
    image: "/products/vyoma-mat-bag/men-lifestyle.webp",
    alt: "Vyoma carry kit for travel and daily movement",
  },
  {
    mark: "03",
    title: "Recover",
    body: "Fleece, cotton-rich bases and quieter textures for the hours when your body asks for ease.",
    image: "/products/vyoma-meditation-hoodie/men-lifestyle.webp",
    alt: "Vyoma Recovery Hoodie lifestyle layer",
  },
  {
    mark: "04",
    title: "Live",
    body: "Clothes that feel calm on skin, polished in public and easy to understand before you buy.",
    image: "/products/vyoma-the-set/model.webp",
    alt: "Vyoma set for activewear and everyday life",
  },
];

const TRUST_POINTS = [
  {
    title: "Fit confidence",
    body: "Fit notes, size help and clear next steps before you commit.",
  },
  {
    title: "Material clarity",
    body: "Natural-fibre-first pieces with fabric, care and claim language kept plain on every product page.",
  },
  {
    title: "Checkout confidence",
    body: "Hosted checkout, tracked dispatch and order timing shown before you pay.",
  },
];

const BODY_NOTICES = [
  {
    mark: "Feel clean",
    title: "Softer first touch.",
    body: "Start with layers that feel calm against skin instead of slick, loud or overbuilt.",
  },
  {
    mark: "Move freely",
    title: "Ready for more than the workout.",
    body: "Pieces move from practice to errands, flights and recovery without making you feel unfinished.",
  },
  {
    mark: "Stay ready",
    title: "Less changing, less thinking.",
    body: "A clear kit reduces the small decisions between movement, travel and the hours after.",
  },
  {
    mark: "Choose better",
    title: "Natural-fibre first where it matters.",
    body: "Fabric language stays clear and evidence-led, so comfort feels practical, not performative.",
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
                <span>Made for the body you live in all day.</span>
              </h1>
              <p className={styles.lead}>
                Your body notices what touches it all day. Vyoma makes soft natural-fibre
                layers with fit notes, material clarity and calm order details before you buy.
              </p>
              <div className={styles.actions}>
                <Link href="/shop" className={styles.primaryCta}>
                  Shop with clarity
                </Link>
                <Link href="/men" className={styles.secondaryCta}>
                  Men
                </Link>
                <Link href="/women" className={styles.secondaryCta}>
                  Women
                </Link>
                <Link href="/pure" className={styles.textCta}>
                  Pure
                </Link>
              </div>
              <div className={styles.trustStrip} aria-label="Shopping promises">
                <span>Fit notes first</span>
                <span>Natural-fibre first</span>
                <span>Tracked delivery</span>
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
            <p className={styles.eyebrow}>Shop by what your body needs</p>
            <h2 id="shop-lanes-heading">Start with the layer that solves the day.</h2>
            <p>
              Men, Women, Pure and accessories stay connected, so choosing feels simple instead of scattered.
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
              <h2 id="system-heading">Dress for the day you actually live.</h2>
              <p>
                The closest layer matters because it stays with you through movement,
                waiting, cooling down and getting on with life.
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
              <h2 id="body-notices-heading">Your first layer changes the day.</h2>
            </div>
            <p>
              Vyoma is not only about looking ready for movement. It is about feeling
              cleaner, calmer and more settled inside the clothes you keep on.
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
            <h2 id="confidence-heading">Feel sure before you buy.</h2>
            <p>
              No fear, no miracle claims. Just softer materials, specific fit notes,
              clear timing and checkout details that are easy to find.
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
          <h2 id="circle-heading">A calmer way to know what is coming.</h2>
          <p>
            Join for restock notes, fit updates and material news when they are actually useful.
            No pressure and no noisy campaign language.
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
