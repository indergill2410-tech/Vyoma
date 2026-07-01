"use client";

import { useState } from "react";
import { swatchStyle, COLOURWAYS } from "@/lib/catalog";
import { VYOMA_WORDMARK } from "@/lib/branding";

const LOGO_POSITIONS = {
  chest: { top: "40%", left: "56%", transform: "translate(-50%, -50%) rotate(-1deg)" },
  hem: { left: "50%", bottom: "18%", transform: "translateX(-50%) rotate(-1deg)" },
  waist: { left: "50%", bottom: "31%", transform: "translateX(-50%)" },
  underband: { left: "50%", bottom: "38%", transform: "translateX(-50%)" },
  cuff: { right: "12%", bottom: "20%", transform: "rotate(-1deg)" },
  detail: { left: "50%", top: "52%", transform: "translate(-50%, -50%)", scale: 1.12 },
  "back-neck": { left: "50%", top: "31%", transform: "translateX(-50%)" },
  "back-waist": { left: "50%", bottom: "33%", transform: "translateX(-50%)" },
  "back-hem": { left: "50%", bottom: "18%", transform: "translateX(-50%)" },
};

function LogoApplique({ placement = "hem" }) {
  const position = LOGO_POSITIONS[placement] || LOGO_POSITIONS.hem;
  const scale = position.scale || 1;

  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        zIndex: 4,
        pointerEvents: "none",
        display: "inline-flex",
        flexDirection: "column",
        gap: 2,
        minWidth: "82px",
        maxWidth: "min(58%, 172px)",
        padding: "6px 9px 5px",
        border: "1px solid rgba(247, 246, 242, 0.82)",
        borderRadius: 7,
        background: "rgba(247, 246, 242, 0.9)",
        color: "var(--ink)",
        boxShadow: "0 8px 22px rgba(20, 22, 46, 0.22)",
        backdropFilter: "blur(2px)",
        lineHeight: 1,
        ...position,
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "baseline", justifyContent: "center", gap: 5 }}>
        <span style={{ fontFamily: "var(--serif)", fontSize: `${13 * scale}px`, fontWeight: 600 }}>
          {VYOMA_WORDMARK.devanagari}
        </span>
        <span style={{ fontFamily: "var(--serif)", fontSize: `${13 * scale}px`, fontWeight: 600, letterSpacing: ".02em" }}>
          {VYOMA_WORDMARK.latin}
        </span>
      </span>
      <span
        style={{
          display: "block",
          textAlign: "center",
          fontSize: `${6.5 * scale}px`,
          fontWeight: 700,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color: "var(--dusk)",
          whiteSpace: "nowrap",
        }}
      >
        {VYOMA_WORDMARK.descriptor}
      </span>
    </span>
  );
}

// A product photo that gracefully falls back to the generated colourway swatch
// if the image is missing (e.g. before scripts/generate-images.mjs has run).
// Always renders inside a positioned, aspect-ratio'd parent.
export default function ProductImage({
  src,
  fallbackSrc,
  alt,
  colour,
  mark = false,
  logoPlacement = "hem",
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
          <>
            <span className="swatch-mark" style={{ color: COLOURWAYS[colour]?.ink, opacity: 0.22 }}>
              व्योम
            </span>
            <LogoApplique placement={logoPlacement} />
          </>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Local product photos live in /public/products as pre-optimized WebP
          (~20-230KB), rendered directly so the deploy-time image optimizer can't
          hide committed assets behind fallbacks. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
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
      {mark && <LogoApplique placement={logoPlacement} />}
    </>
  );
}
