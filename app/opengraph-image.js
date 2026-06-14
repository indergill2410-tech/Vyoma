import { ImageResponse } from "next/og";
import { SKY } from "@/lib/seo";

// Default social-share card. Shown when a page has no card of its own — link
// previews on WhatsApp, X, iMessage, Slack, etc.
export const alt = "Vyomawear — Yoga wear, made where yoga was born";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          color: SKY.ink,
          fontFamily: "sans-serif",
          background: `radial-gradient(60% 80% at 82% 8%, ${SKY.marigoldDeep} 0%, rgba(201,138,34,0) 55%), linear-gradient(155deg, ${SKY.night} 0%, ${SKY.indigo} 58%, #1a1d3a 100%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 30,
            letterSpacing: 3,
            color: SKY.marigold,
          }}
        >
          ✦ MADE IN INDIA · INDIA & AUSTRALIA
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: 138,
              fontWeight: 700,
              letterSpacing: -3,
            }}
          >
            <span>Vyoma</span>
            <span style={{ fontWeight: 200, color: SKY.muted }}>wear</span>
          </div>
          <div style={{ display: "flex", fontSize: 44, color: SKY.ether, marginTop: 14 }}>
            Yoga wear, made where yoga was born.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            color: SKY.muted,
          }}
        >
          <span>vee-OH-ma · Sanskrit for sky, ether, infinite space</span>
          <span style={{ color: SKY.marigold, letterSpacing: 6 }}>✦ ✦ ✦</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
