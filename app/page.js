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
    body: "Training tee, jogger, trunk, hoodie, socks and the saffron carry.",
  },
  {
    title: "Women",
    href: "/shop#collection",
    body: "Sculpted leggings, studio tops, bras, skorts and soft sets.",
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
    body: "Pieces that feel sharp enough for the gym floor and clean enough to keep on after.",
  },
  {
    mark: "02",
    title: "Move",
    body: "Layering, carry and colour built for errands, travel and the hours between plans.",
  },
  {
    mark: "03",
    title: "Recover",
    body: "Soft fleece, breathable bases and calmer textures for the part of the day when your body wants ease.",
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

const COLOUR_STORY = [
  { name: "Amber heat", tone: "#d9902f", body: "Warmth and energy for the pieces that should feel most alive." },
  { name: "Graphite hold", tone: "#17191f", body: "A premium base that makes product colour feel richer." },
  { name: "Cobalt charge", tone: "#1557c0", body: "A sharper athletic signal for men's and activewear moments." },
  { name: "Eucalyptus calm", tone: "#24695f", body: "A quiet counterweight so the brand stays natural, not loud." },
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
                Activewear for the full day.
                <span>Warm, sharp, ready.</span>
              </h1>
              <p className={styles.lead}>
                Premium natural-fibre layers for training, travel, street plans and recovery.
                Warm colour, clean detail and the pieces you can already shop.
              </p>
              <div className={styles.actions}>
                <Link href="/shop" className={styles.primaryCta}>
                  Shop the catalogue
                </Link>
                <Link href="/men" className={styles.secondaryCta}>
                  Shop men
                </Link>
                <Link href="/pure" className={styles.textCta}>
                  Start with Pure
                </Link>
              </div>
              <div className={styles.trustStrip} aria-label="Shopping promises">
                <span>Gym to street</span>
                <span>Natural-fibre feel</span>
                <span>Secure checkout</span>
              </div>
            </div>

            <AmberProductStage variant="home" priority className={styles.heroStage} />
          </div>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          <span>Warm amber activewear</span>
          <span>Gym to street</span>
          <span>Men's lifestyle kit</span>
          <span>Women's movement layers</span>
          <span>Pure cotton bases</span>
          <span>Warm amber activewear</span>
          <span>Gym to street</span>
          <span>Men's lifestyle kit</span>
          <span>Women's movement layers</span>
          <span>Pure cotton bases</span>
        </div>
      </div>

      <section className={styles.shopLanes} aria-labelledby="shop-lanes-heading">
        <div className={styles.shell}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>Shop by wardrobe moment</p>
            <h2 id="shop-lanes-heading">The right path to the right layer.</h2>
            <p>
              Move from Men, Women, Pure and accessories into the pieces that fit the way your
              day actually moves.
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
                Every product should answer the same desire quickly: look sharper, move easier
                and feel comfortable longer.
              </p>
              <Link href="/shop" className={styles.inverseCta}>
                Browse all products
              </Link>
            </div>
            <div className={styles.systemCards}>
              {DAY_SYSTEM.map((item) => (
                <article className={styles.systemCard} key={item.title}>
                  <span>{item.mark}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.colourSection} aria-labelledby="colour-heading">
        <div className={styles.shell}>
          <div className={styles.collectionHead}>
            <div>
              <p className={styles.eyebrow}>The colour story</p>
              <h2 id="colour-heading">Warmth with athletic contrast.</h2>
            </div>
            <p>
              Amber brings heat. Graphite adds polish. Cobalt and eucalyptus keep the brand
              athletic, fresh and alive.
            </p>
          </div>
          <div className={styles.colourGrid}>
            {COLOUR_STORY.map((colour) => (
              <article className={styles.colourCard} key={colour.name}>
                <span style={{ background: colour.tone }} />
                <h3>{colour.name}</h3>
                <p>{colour.body}</p>
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
              Clear fit, fabric and use-case details help you choose faster, then move naturally
              into product pages and checkout.
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
          <h2 id="circle-heading">Get early notes when the next layer lands.</h2>
          <p>
            Join for product notes, restock signals and first access to future colour moments.
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
