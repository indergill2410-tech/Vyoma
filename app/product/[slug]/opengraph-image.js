import { ImageResponse } from "next/og";
import { getProduct, COLOURWAYS } from "@/lib/catalog";
import { SKY } from "@/lib/seo";

// Per-product social-share card, tinted with the product's first colourway so
// every shared product link looks composed and on-brand.
export const alt = "Vyomawear product";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default function ProductOpengraphImage({ params }) {
  const p = getProduct(params.slug);
  const c = (p && COLOURWAYS[p.colourways?.[0]]) || COLOURWAYS["night-sky-indigo"];

  const name = p?.name || "Vyomawear";
  const tagline = p?.tagline || "Made where yoga was born.";
  const category = p?.category || "Yoga wear";
  const price = p ? `A$${Math.round(p.priceAud / 100)}` : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px 84px",
          color: c.ink,
          fontFamily: "sans-serif",
          background: `radial-gradient(85% 85% at 78% 18%, ${c.accent} 0%, rgba(0,0,0,0) 60%), linear-gradient(150deg, ${c.base} 0%, ${c.weave} 100%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            letterSpacing: 3,
            opacity: 0.85,
          }}
        >
          ✦ VYOMAWEAR · {category.toUpperCase()}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: -2, lineHeight: 1.02 }}>
            {name}
          </div>
          <div style={{ display: "flex", fontSize: 40, marginTop: 18, opacity: 0.92 }}>
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 30,
          }}
        >
          <span style={{ opacity: 0.85 }}>Natural fibre first · made to order</span>
          {price ? <span style={{ fontSize: 44, fontWeight: 700 }}>{price}</span> : <span />}
        </div>
      </div>
    ),
    { ...size }
  );
}
