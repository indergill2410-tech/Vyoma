// Single source of truth for canonical URLs and brand metadata used across
// metadata, JSON-LD, sitemap and the generated social-share images.
//
// Kept dependency-free (no prisma, no next/server) so it is safe to import from
// edge/runtime-light routes such as the Open Graph image generators.

// Canonical host is the www subdomain because Render auto-redirects the apex
// (vyomawear.com.au) to www and that isn't configurable.
export const PRIMARY_DOMAIN = "www.vyomawear.com.au";
export const PRIMARY_SITE_URL = `https://${PRIMARY_DOMAIN}`;

const RENDER_SITE_URL = "https://vyoma-imsr.onrender.com";
const DEFAULT_SITE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : RENDER_SITE_URL;

// Set NEXT_PUBLIC_SITE_URL=https://www.vyomawear.com.au in Render once the custom
// domain is connected, so live canonicals/sitemap/OG use the real host.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");

// Absolute URL for a path. Pass-through for anything already absolute.
export function abs(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  return SITE_URL + (path.startsWith("/") ? path : `/${path}`);
}

export const BRAND = {
  name: "Vyomawear",
  legalName: "Vyomawear",
  slogan: "Lifestyle activewear for the full day.",
  description:
    "Premium natural-fibre activewear for training, travel, recovery and everyday life. Warm colour, clear fit notes and fewer synthetics against your skin.",
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
