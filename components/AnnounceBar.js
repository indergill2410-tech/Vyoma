// Slim top bar — pride + reassurance, no claims we can't keep.
export default function AnnounceBar() {
  const items = [
    "✦ Made in India — the birthplace of yoga",
    "Shipping to 🇮🇳 India & 🇦🇺 Australia",
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
