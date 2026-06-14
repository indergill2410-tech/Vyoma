import Link from "next/link";
import Waitlist from "@/components/Waitlist";
import WaitlistCount from "@/components/WaitlistCount";
import CircleStatusCheck from "@/components/CircleStatusCheck";
import { TIERS } from "@/lib/circle-config";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "The Circle — join the founders",
  description:
    "The Circle is the founding list for Vyoma. Join before the first drop, bring your friends, and rise from early access to a numbered Founding-Member gift. Yoga wear, made where yoga was born.",
  alternates: { canonical: abs("/circle") },
  openGraph: {
    type: "website",
    url: abs("/circle"),
    title: "The Circle — join the founders · Vyomawear",
    description:
      "Join the founding list, bring your friends, and rise from early access to a numbered Founding-Member gift.",
  },
};

export default function CirclePage() {
  return (
    <main className="circle-page">
      <section className="circle-hero">
        <div className="container narrow">
          <span className="drop-label">✦ The Circle ✦</span>
          <h1>Be one of the founders.</h1>
          <p className="lead">
            Vyoma launches with a small first drop. The Circle is how the first few
            thousand people get in — early, together, and rewarded for bringing the
            ones they practise with. No paid ads. Just the list, growing itself.
          </p>
          <WaitlistCount className="big" />
          <div className="circle-join">
            <Waitlist source="circle" />
          </div>
          <p className="muted small">No spam, ever. Leave whenever you like.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="section-eyebrow">How it rises</span>
            <h2>Bring your circle. Climb the ladder.</h2>
            <p>
              Every friend who joins on your link moves you ten places up the line —
              and up this ladder of Founding-Member perks. The earlier and the more
              you share, the more you keep.
            </p>
          </div>
          <ol className="circle-ladder big">
            {TIERS.map((t) => (
              <li key={t.key} data-reveal>
                <span className="ladder-mark">{t.at === 0 ? "✦" : t.at}</span>
                <span className="ladder-body">
                  <strong>{t.label}</strong>
                  <span className="ladder-perk">{t.perk}</span>
                  <span className="ladder-req">
                    {t.at === 0 ? "The moment you join" : `${t.at} ${t.at === 1 ? "friend" : "friends"} joined`}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-light">
        <div className="container narrow">
          <div className="section-head" data-reveal>
            <span className="section-eyebrow">Already in?</span>
            <h2>Check your place in line.</h2>
            <p>Enter your code (starts with SKY-) to see your rank, your referrals, and what's next.</p>
          </div>
          <CircleStatusCheck />
          <p className="muted small center" style={{ marginTop: 18 }}>
            <Link href="/drops" className="link-btn">See the drops calendar →</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
