const EDITORIAL_IMAGES = {
  homeHero: "/editorial/home-hero.svg",
  shopHero: "/editorial/shop-hero.svg",
  fabricMacro: "/editorial/fabric-macro.svg",
  pureStillLife: "/editorial/pure-still-life.svg",
  makingAtelier: "/editorial/making-atelier.svg",
  circleDrops: "/editorial/circle-drops-still-life.svg",
  fitPackaging: "/editorial/fit-packaging.svg",
  skySeries: "/editorial/sky-series-fabrics.svg",
};

export default function EditorialImage({
  name,
  alt = "",
  className = "",
  imageClassName = "",
  priority = false,
}) {
  const src = EDITORIAL_IMAGES[name];
  if (!src) return null;

  return (
    <figure className={`editorial-image ${className}`.trim()}>
      <img
        src={src}
        alt={alt}
        className={`editorial-image-img ${imageClassName}`.trim()}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
      />
    </figure>
  );
}
