"use client";

import { useState } from "react";
import Image from "next/image";
import { swatchStyle, COLOURWAYS } from "@/lib/catalog";

// A product photo that gracefully falls back to the generated colourway swatch
// if the image is missing (e.g. before scripts/generate-images.mjs has run).
// Always renders inside a positioned, aspect-ratio'd parent (uses `fill`).
export default function ProductImage({
  src,
  alt,
  colour,
  sizes = "100vw",
  priority = false,
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
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`product-img ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
