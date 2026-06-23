import Link from "next/link";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "Track your order",
  description:
    "How to follow your Vyomawear order from confirmation to tracked delivery.",
  alternates: { canonical: abs("/track") },
};

const STEPS = [
  {
    title: "Order confirmed",
    body: "Your confirmation email includes your order summary and the secure order-status link.",
  },
  {
    title: "Made or prepared",
    body: "First-drop pieces are prepared with care in India. If a piece is made for you, timing appears on the product page before checkout.",
  },
  {
    title: "Tracked delivery",
    body: "When your parcel is on the way, your tracking details arrive by email so you can follow it to your door.",
  },
];

export default function TrackPage() {
  return (
    <main className="commerce-page track-page">
      <section className="commerce-hero track-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">Track order</p>
            <h1>Your order has a quiet paper trail.</h1>
            <p className="commerce-lead">
              Use the secure order-status link in your confirmation email to follow your piece.
              If tracking is not visible yet, it usually means the order is still being prepared.
            </p>
            <div className="commerce-actions">
              <Link href="/shop" className="btn accent">Keep browsing</Link>
              <Link href="/making" className="btn ghost">See how it is made</Link>
            </div>
          </div>
          <div className="track-ticket" aria-label="Order status steps">
            <span>Confirmed</span>
            <span>Prepared</span>
            <span>Tracked</span>
          </div>
        </div>
      </section>

      <section className="commerce-section commerce-section-tight">
        <div className="commerce-shell narrow-shell">
          <div className="commerce-section-head">
            <p className="commerce-eyebrow">What to expect</p>
            <h2>From checkout to your door.</h2>
            <p>
              Vyoma uses secure hosted checkout and email updates for order status.
              Keep your confirmation email close; it is the fastest way back to tracking.
            </p>
          </div>
          <ol className="track-steps">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="commerce-section track-help-band">
        <div className="commerce-shell confidence-grid">
          <div>
            <p className="commerce-eyebrow">Need a hand?</p>
            <h2>Reply to your order email.</h2>
          </div>
          <p>
            That keeps your order number, email and purchase details in one place,
            so you do not have to repeat them when you need help.
          </p>
        </div>
      </section>
    </main>
  );
}
