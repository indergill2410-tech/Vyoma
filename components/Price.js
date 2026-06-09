"use client";

import { useRegion } from "./Providers";
import { formatMoney, priceFor } from "@/lib/format";

// Region-aware price. Renders the right currency once hydrated; before that it
// shows the default-region price so SSR and first paint don't flicker oddly.
export default function Price({ product, className }) {
  const { region } = useRegion();
  return (
    <span className={className}>{formatMoney(priceFor(product, region), region)}</span>
  );
}

// For a raw minor-unit amount you already computed for the active region.
export function Amount({ minor, region, className }) {
  return <span className={className}>{formatMoney(minor, region)}</span>;
}
