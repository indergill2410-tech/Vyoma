import Image from "next/image";

const SCENES = {
  home: {
    label: "Vyomawear warm copper product world with men's and women's activewear",
    badge: "Full-day activewear",
    title: "Train. Travel. Recover.",
    note: "Organic-material activewear in warm copper light.",
    images: [
      {
        src: "/editorial/mens-catalogue-hero.webp",
        alt: "Vyoma men's activewear lifestyle scene in warm copper studio light",
        tile: "hero",
      },
      {
        src: "/products/vyoma-the-set/model.webp",
        alt: "Vyoma women's activewear set",
        tile: "tall",
      },
      {
        src: "/products/vyoma-mat-bag/model.webp",
        alt: "Vyoma warm gym carry lifestyle image",
        tile: "small",
      },
      {
        src: "/products/vyoma-meditation-hoodie/model.webp",
        alt: "Vyoma men's recovery hoodie lifestyle image",
        tile: "wide",
      },
    ],
  },
  shop: {
    label: "Vyomawear catalogue shown as a warm 3D product wall",
    badge: "Shop by layer",
    title: "Choose the layer.",
    note: "Men, women, Pure and accessories stay together in one clear shop.",
    images: [
      {
        src: "/products/vyoma-high-rise-legging/model.webp",
        alt: "Vyoma high-rise legging",
        tile: "hero",
      },
      {
        src: "/products/vyoma-practice-tee/model.webp",
        alt: "Vyoma men's practice tee lifestyle image",
        tile: "tall",
      },
      {
        src: "/products/vyoma-organic-crew-sock/model.webp",
        alt: "Vyoma organic crew socks lifestyle image",
        tile: "small",
      },
      {
        src: "/products/vyoma-jogger/model.webp",
        alt: "Vyoma men's jogger lifestyle image",
        tile: "wide",
      },
    ],
  },
};

const TILE_STYLES = {
  hero: { inset: "3% 18% 19% 8%", zIndex: 2 },
  tall: { inset: "0 0 28% 62%", zIndex: 3 },
  small: { inset: "64% 6% 4% 58%", zIndex: 4 },
  wide: { inset: "68% 34% 2% 2%", zIndex: 3 },
};

export default function AmberProductStage({ variant = "home", className = "", priority = false }) {
  const scene = SCENES[variant] || SCENES.home;

  return (
    <figure
      className={`amber-stage amber-stage--${variant} ${className}`.trim()}
      aria-label={scene.label}
      style={{ position: "relative", overflow: "hidden", isolation: "isolate", minHeight: 560 }}
    >
      <div className="amber-stage-glow" aria-hidden="true" />
      <div className="amber-stage-grid" aria-hidden="true" style={{ position: "absolute", inset: 26 }}>
        {scene.images.map((image, index) => (
          <span
            className={`amber-stage-tile amber-stage-tile--${image.tile}`}
            key={`${image.src}-${image.tile}`}
            style={{
              position: "absolute",
              overflow: "hidden",
              borderRadius: 8,
              ...TILE_STYLES[image.tile],
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={priority && index === 0}
              sizes={
                image.tile === "hero"
                  ? "(min-width: 980px) 34vw, 90vw"
                  : "(min-width: 980px) 18vw, 44vw"
              }
              className="amber-stage-img"
            />
          </span>
        ))}
      </div>
      <figcaption className="amber-stage-caption">
        <span>{scene.badge}</span>
        <strong>{scene.title}</strong>
        <em>{scene.note}</em>
      </figcaption>
    </figure>
  );
}
