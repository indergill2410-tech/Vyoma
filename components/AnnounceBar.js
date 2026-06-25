// Slim top bar - material promise, shipping reassurance, checkout confidence.
export default function AnnounceBar() {
  const items = [
    "Natural-fibre activewear — studio to street",
    "Made in India · Shipping across Australia",
    "Secure checkout",
  ];
  return (
    <div className="announce" role="region" aria-label="Announcements">
      <div className="announce-track">
        {items.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
