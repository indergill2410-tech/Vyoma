import Image from "next/image";

const PRODUCT_PHOTOS = {
  akashaWrap: "/products/vyoma-akasha-wrap/model.png",
  cloudBra: "/products/vyoma-cloud-bra/model.png",
  highRise: "/products/vyoma-high-rise-legging/model.png",
  matBag: "/products/vyoma-mat-bag/model.png",
  pureBrief: "/products/vyoma-pure-brief-women/model.png",
  pureTrunk: "/products/vyoma-pure-trunk-men/model.png",
  studioTop: "/products/vyoma-studio-top/model.png",
  theSet: "/products/vyoma-the-set/model.png",
};

const EDITORIAL_SCENES = {
  homeHero: {
    variant: "home",
    images: [
      { src: PRODUCT_PHOTOS.theSet, tile: "primary" },
      { src: PRODUCT_PHOTOS.akashaWrap, tile: "secondary" },
      { src: PRODUCT_PHOTOS.pureTrunk, tile: "accent" },
    ],
  },
  shopHero: {
    variant: "shop",
    images: [
      { src: PRODUCT_PHOTOS.highRise, tile: "primary" },
      { src: PRODUCT_PHOTOS.studioTop, tile: "secondary" },
      { src: PRODUCT_PHOTOS.matBag, tile: "accent" },
      { src: PRODUCT_PHOTOS.akashaWrap, tile: "detail" },
    ],
  },
  fabricMacro: {
    variant: "fabric",
    images: [
      { src: PRODUCT_PHOTOS.pureTrunk, tile: "primary" },
      { src: PRODUCT_PHOTOS.pureBrief, tile: "secondary" },
      { src: PRODUCT_PHOTOS.highRise, tile: "accent" },
    ],
  },
  pureStillLife: {
    variant: "pure",
    images: [
      { src: PRODUCT_PHOTOS.pureBrief, tile: "primary" },
      { src: PRODUCT_PHOTOS.pureTrunk, tile: "secondary" },
      { src: PRODUCT_PHOTOS.cloudBra, tile: "accent" },
    ],
  },
  makingAtelier: {
    variant: "making",
    images: [
      { src: PRODUCT_PHOTOS.akashaWrap, tile: "primary" },
      { src: PRODUCT_PHOTOS.pureTrunk, tile: "secondary" },
      { src: PRODUCT_PHOTOS.highRise, tile: "accent" },
    ],
  },
  circleDrops: {
    variant: "circle",
    images: [
      { src: PRODUCT_PHOTOS.theSet, tile: "primary" },
      { src: PRODUCT_PHOTOS.matBag, tile: "secondary" },
      { src: PRODUCT_PHOTOS.pureBrief, tile: "accent" },
    ],
  },
  fitPackaging: {
    variant: "fit",
    images: [
      { src: PRODUCT_PHOTOS.highRise, tile: "primary" },
      { src: PRODUCT_PHOTOS.cloudBra, tile: "secondary" },
      { src: PRODUCT_PHOTOS.pureTrunk, tile: "accent" },
    ],
  },
  skySeries: {
    variant: "sky",
    images: [
      { src: PRODUCT_PHOTOS.studioTop, tile: "primary" },
      { src: PRODUCT_PHOTOS.theSet, tile: "secondary" },
      { src: PRODUCT_PHOTOS.akashaWrap, tile: "accent" },
    ],
  },
};

export default function EditorialImage({
  name,
  alt = "",
  className = "",
  imageClassName = "",
  priority = false,
}) {
  const scene = EDITORIAL_SCENES[name];
  if (!scene) return null;

  return (
    <figure
      className={`editorial-image editorial-photo-scene editorial-photo-scene--${scene.variant} ${className}`.trim()}
    >
      <div className="editorial-photo-glow" aria-hidden="true" />
      <div className="editorial-photo-collage">
        {scene.images.map((image, index) => (
          <span
            className={`editorial-photo-tile editorial-photo-tile--${image.tile}`}
            key={`${image.src}-${image.tile}`}
          >
            <Image
              src={image.src}
              alt={index === 0 ? alt : ""}
              fill
              priority={priority && index === 0}
              sizes="(max-width: 620px) 86vw, (max-width: 1100px) 46vw, 640px"
              quality={92}
              className={`editorial-image-img editorial-photo-img ${imageClassName}`.trim()}
            />
          </span>
        ))}
      </div>
    </figure>
  );
}
