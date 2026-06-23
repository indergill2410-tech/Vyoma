// Single source of truth for canonical URLs and brand metadata used across
// metadata, JSON-LD, sitemap and the generated social-share images.
//
// Kept dependency-free (no prisma, no next/server) so it is safe to import from
// edge/runtime-light routes such as the Open Graph image generators.

export const PRIMARY_DOMAIN = "vyomawear.com.au";
export const PRIMARY_SITE_URL = `https://${PRIMARY_DOMAIN}`;

const DEFAULT_SITE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : PRIMARY_SITE_URL;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");

// Absolute URL for a path. Pass-through for anything already absolute.
export function abs(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  return SITE_URL + (path.startsWith("/") ? path : `/${path}`);
}

export const BRAND = {
  name: "Vyomawear",
  legalName: "Vyomawear",
  slogan: "Yoga wear, made where yoga was born.",
  description:
    "Premium yoga wear, made in India - the birthplace of yoga. Shipping to India and Australia. Vyoma (vee-OH-ma): Sanskrit for sky, ether, infinite space.",
};

// Sky palette reused by the OG image generators so social cards match the site.
export const SKY = {
  night: "#14162E",
  indigo: "#262A4E",
  indigoSoft: "#3A3F66",
  marigold: "#E9AC3F",
  marigoldDeep: "#C98A22",
  ether: "#E7E3DA",
  ink: "#EDEFF3",
  muted: "#9AA3AE",
};