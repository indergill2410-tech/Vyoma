import { swatchStyle, COLOURWAYS } from "@/lib/catalog";

// A generated colourway swatch — no product photography needed pre-launch.
// `ratio` is a CSS aspect-ratio string. `mark` overlays the Sanskrit glyph.
export default function Swatch({ colourway, ratio = "4 / 3", mark = false, className = "" }) {
  const c = COLOURWAYS[colourway] || COLOURWAYS["night-sky-indigo"];
  return (
    <div
      className={`swatch ${className}`}
      style={{ ...swatchStyle(colourway), aspectRatio: ratio }}
      role="img"
      aria-label={c.name}
    >
      {mark && (
        <span className="swatch-mark" style={{ color: c.ink, opacity: 0.22 }}>
          व्योम
        </span>
      )}
    </div>
  );
}
