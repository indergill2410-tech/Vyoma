"use client";

import { useState } from "react";
import { swatchStyle, COLOURWAYS } from "@/lib/catalog";

// A product photo that gracefully falls back to another product image, then to
// the generated colourway swatch if no image is available.
// Always renders inside a positioned, aspect-ratio'd parent.
export default function ProductImage({
  src,
  fallbackSrc,
  alt,
  colour,
  mark = false,
  className = "",
  loading = "lazy",
  fetchPriority,
}) {
  const [failed, setFailed] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const activeSrc = usingFallback ? fallbackSrc : src;

  if (!activeSrc || failed) {
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
      src={activeSrc}
      alt={alt}
      className={`product-img ${className}`}
      onError={() => {
        if (!usingFallback && fallbackSrc) setUsingFallback(true);
        else setFailed(true);
      }}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
    />
  );
}
