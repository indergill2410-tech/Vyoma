export default function BrandLogo({ className = "", compact = false }) {
  return (
    <span
      className={`brand-logo ${compact ? "compact" : ""} ${className}`.trim()}
      aria-label="Vyomawear"
      style={{ display: "inline-flex", alignItems: "center", gap: 10, lineHeight: 1 }}
    >
      <svg
        className="brand-logo-mark"
        viewBox="0 0 64 64"
        width="38"
        height="38"
        style={{ width: 38, height: 38, flex: "0 0 auto" }}
        aria-hidden="true"
        focusable="false"
      >
        <rect x="4" y="4" width="56" height="56" rx="18" fill="#fff8ed" />
        <path
          d="M14 49 32 15l18 34"
          fill="none"
          stroke="#9d4f24"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
        />
      </svg>
      <span
        className="brand-logo-text"
        style={{ display: "inline-flex", alignItems: "baseline", gap: 1, fontFamily: "var(--serif)" }}
      >
        <strong style={{ color: "var(--ink)", fontSize: 29, fontWeight: 650 }}>Vyoma</strong>
        {!compact && (
          <em style={{ color: "var(--dusk)", fontSize: 29, fontStyle: "normal", fontWeight: 360 }}>
            wear
          </em>
        )}
      </span>
    </span>
  );
}
