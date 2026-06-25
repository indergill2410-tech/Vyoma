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
    // Local product photos live in /public/products. Render them directly so
    // deployment image optimization cannot hide committed assets behind fallbacks.
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
