import Image from "next/image";

const SCENES = {
  home: {
    label: "Vyomawear warm amber product world with men's and women's activewear",
    badge: "Full-day activewear",
    title: "Gym. Street. Recovery.",
    note: "A full-day wardrobe in warm amber light.",
    images: [
      {
        src: "/editorial/mens-catalogue-hero.png",
        alt: "Vyoma men's activewear lifestyle scene in warm amber studio light",
        tile: "hero",
      },
      {
        src: "/products/vyoma-the-set/model.webp",
        alt: "Vyoma women's activewear set",
        tile: "tall",
      },
      {
        src: "/products/vyoma-mat-bag/men-lifestyle.png",
        alt: "Vyoma saffron gym carry lifestyle image",
        tile: "small",
      },
      {
        src: "/products/vyoma-meditation-hoodie/men-lifestyle.png",
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
        src: "/products/vyoma-practice-tee/men-lifestyle.png",
        alt: "Vyoma men's practice tee lifestyle image",
        tile: "tall",
      },
      {
        src: "/products/vyoma-organic-crew-sock/men-lifestyle.png",
        alt: "Vyoma organic crew socks lifestyle image",
        tile: "small",
      },
      {
        src: "/products/vyoma-jogger/men-lifestyle.png",
        alt: "Vyoma men's jogger lifestyle image",
        tile: "wide",
      },
    ],
  },
};

export default function AmberProductStage({ variant = "home", className = "", priority = false }) {
  const scene = SCENES[variant] || SCENES.home;

  return (
    <figure className={`amber-stage amber-stage--${variant} ${className}`.trim()} aria-label={scene.label}>
      <div className="amber-stage-glow" aria-hidden="true" />
      <div className="amber-stage-grid" aria-hidden="true">
        {scene.images.map((image, index) => (
          <span className={`amber-stage-tile amber-stage-tile--${image.tile}`} key={`${image.src}-${image.tile}`}>
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
