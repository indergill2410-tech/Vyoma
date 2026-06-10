import Link from "next/link";
import { DROPS, STATUS_LABEL } from "@/lib/drops";
import { COLOURWAYS } from "@/lib/catalog";
import Countdown from "@/components/Countdown";
import Waitlist from "@/components/Waitlist";

export const metadata = {
  title: "The Drops",
  description:
    "Small, considered runs made in India. See what's launching and what's on the horizon.",
};

function Dots({ colourways }) {
  return (
    <div className="drop-dots" aria-hidden="true">
      {colourways.map((k) => (
        <span key={k} style={{ background: COLOURWAYS[k]?.base }} title={COLOURWAYS[k]?.name} />
      ))}
    </div>
  );
}

export default function DropsPage() {
  const dropDate = process.env.NEXT_PUBLIC_DROP_DATE;
  const featured = DROPS.find((d) => d.featured) || DROPS[0];
  const rest = DROPS.filter((d) => d !== featured);

  return (
    <main className="drops">
      <section className="drops-intro">
        <span className="section-eyebrow">The Drops</span>
        <h1>We don't do seasons. We do skies.</h1>
        <p>
          Small, considered runs — each a moment in the sky, made in India.
          Join the list to be the first to know.
        </p>
      </section>

      <section className="drop-feature">
        <div className="drop-feature-card">
          <span className="drop-status upcoming">{STATUS_LABEL[featured.status]}</span>
          <p className="drop-edition">{featured.edition}</p>
          <h2>{featured.name}</h2>
          <p className="drop-blurb">{featured.blurb}</p>
          <Dots colourways={featured.colourways} />
          <Countdown date={dropDate} />
          <div className="drop-feature-wait">
            <Waitlist source="drops" />
            <p className="muted small">Be first in line. No spam, leave whenever you like.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="section-eyebrow">On the horizon</span>
            <h2>What's coming next.</h2>
            <p>A rough sky map. Dates land on the list before they land here.</p>
          </div>
          <div className="drops-grid">
            {rest.map((d) => (
              <article className="drop-card" key={d.key} data-reveal>
                <div className="drop-card-top">
                  <span className="drop-status planned">{STATUS_LABEL[d.status]}</span>
                  <span className="drop-when">{d.when}</span>
                </div>
                <p className="drop-edition">{d.edition}</p>
                <h3>{d.name}</h3>
                <p className="drop-blurb">{d.blurb}</p>
                <Dots colourways={d.colourways} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light drops-outro" data-reveal>
        <div className="container" style={{ maxWidth: 620, textAlign: "center" }}>
          <h2>One list. Every drop.</h2>
          <p className="muted" style={{ margin: "10px auto 24px" }}>
            Join once and you'll hear about every sky before anyone else.
          </p>
          <Waitlist source="drops-outro" />
        </div>
      </section>
    </main>
  );
}
