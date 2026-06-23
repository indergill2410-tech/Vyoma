export default function AnnounceBar() {
  const items = [
    "Soft natural fibres",
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
