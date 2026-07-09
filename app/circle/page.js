import Link from "next/link";
import Waitlist from "@/components/Waitlist";
import WaitlistCount from "@/components/WaitlistCount";
import CircleStatusCheck from "@/components/CircleStatusCheck";
import EditorialImage from "@/components/EditorialImage";
import { TIERS } from "@/lib/circle-config";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "The Circle",
  description:
    "Join The Circle for Vyomawear restock notes, first access to considered releases and founder perks.",
  alternates: { canonical: abs("/circle") },
};

const BENEFITS = [
  {
    title: "Restocks first",
    body: "Hear when a size, colour or favourite piece returns before it goes to the wider list.",
  },
  {
    title: "Founder perks",
    body: "Bring friends, move up the line and unlock small thank-you moments without pressure.",
  },
  {
    title: "Quiet notes",
    body: "No spam, no noise, just early word on useful releases, fit updates and material notes.",
  },
];

export default function CirclePage() {
  return (
    <main className="commerce-page circle-redesign">
      <section className="commerce-hero circle-hero-redesign">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">The Circle</p>
            <h1>The store is open. The Circle keeps you close.</h1>
            <p className="commerce-lead">
              Join for restock notes, early access to considered releases and founder perks.
              It is a quiet line for people who want the useful details first.
            </p>
            <WaitlistCount className="big" />
            <Waitlist source="circle" />
            <p className="muted small">No spam. No pressure. Leave whenever you like.</p>
          </div>
          <EditorialImage
            name="circleDrops"
            alt="Founder drop invitation and fabric swatches in warm dusk light"
            className="circle-proof-orbit"
            priority
          />
        </div>
      </section>

      <section className="commerce-section commerce-section-tight">
        <div className="commerce-shell">
          <div className="commerce-card-grid three">
            {BENEFITS.map((benefit) => (
              <article className="commerce-card" key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="commerce-section circle-ladder-section" aria-labelledby="circle-ladder-heading">
        <div className="commerce-shell two-column-section">
          <div className="sticky-copy">
            <p className="commerce-eyebrow">How it rises</p>
            <h2 id="circle-ladder-heading">Share Vyoma when it feels right.</h2>
            <p>
              Every friend who joins through your link moves you up and unlocks the next founder perk.
              The goal is simple: grow through people who actually care about the clothes.
            </p>
            <Link href="/shop" className="btn ghost">Shop while you wait</Link>
          </div>

          <ol className="circle-ladder big redesigned">
            {TIERS.map((tier) => (
              <li key={tier.key}>
                <span className="ladder-mark">{tier.at === 0 ? "✦" : tier.at}</span>
                <span className="ladder-body">
                  <strong>{tier.label}</strong>
                  <span className="ladder-perk">{tier.perk}</span>
                  <span className="ladder-req">
                    {tier.at === 0 ? "The moment you join" : `${tier.at} ${tier.at === 1 ? "friend" : "friends"} joined`}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="commerce-section section-light" aria-labelledby="circle-status-heading">
        <div className="commerce-shell narrow-shell">
          <div className="commerce-section-head">
            <p className="commerce-eyebrow">Already in?</p>
            <h2 id="circle-status-heading">Check your place in line.</h2>
            <p>Enter your Circle code to see your rank, referrals and the next thank-you moment.</p>
          </div>
          <CircleStatusCheck />
        </div>
      </section>
    </main>
  );
}
