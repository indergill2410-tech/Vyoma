"use client";

import { useState } from "react";
import { swatchStyle, COLOURWAYS } from "@/lib/catalog";

// A product photo that gracefully falls back to the generated colourway swatch
// if the image is missing (e.g. before scripts/generate-images.mjs has run).
// Always renders inside a positioned, aspect-ratio'd parent.
export default function ProductImage({
  src,
  alt,
  colour,
  mark = false,
  className = "",
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`swatch-fallback ${className}`}
        style={swatchStyle(colour)}
        role="img"
        aria-label={alt}
      >
        {mark && (
          <span className="swatch-mark" style={{ color: COLOURWAYS[colour]?.ink, opacity: 0.22 }}>
            व्योम
          </span>
        )}
      </div>
    );
  }

  return (
    // Local product photos live in /public/products as pre-optimized WebP
    // (~20-230KB), rendered directly so the deploy-time image optimizer can't
    // hide committed assets behind fallbacks.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`product-img ${className}`}
      onError={() => setFailed(true)}
      loading="lazy"
      decoding="async"
    />
  );
}
