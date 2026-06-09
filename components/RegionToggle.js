"use client";

import { useRegion } from "./Providers";
import { REGIONS } from "@/lib/regions";

// Toggle the shopping market: Australia (AUD) ↔ India (INR).
export default function RegionToggle({ compact = false }) {
  const { region, setRegion } = useRegion();
  return (
    <div className={`region-toggle ${compact ? "compact" : ""}`} role="group" aria-label="Choose your region">
      {Object.values(REGIONS).map((r) => (
        <button
          key={r.code}
          type="button"
          className="region-btn"
          aria-pressed={region === r.code}
          onClick={() => setRegion(r.code)}
          title={`Shop in ${r.label} (${r.currencySymbol})`}
        >
          <span aria-hidden="true">{r.flag}</span>
          {!compact && <span className="region-name">{r.label}</span>}
          <span className="region-cur">{r.currencySymbol}</span>
        </button>
      ))}
    </div>
  );
}
