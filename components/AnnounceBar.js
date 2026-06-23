// Slim top bar - material promise, shipping reassurance, checkout confidence.
export default function AnnounceBar() {
  const items = [
    "Research-led activewear - natural fibre first",
    "Shipping to India & Australia",
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
