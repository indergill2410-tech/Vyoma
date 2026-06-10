// Region drives currency, shipping copy, and which countries checkout collects.
//  AU — Australia.   IN — India.

export const REGIONS = {
  AU: {
    code: "AU",
    label: "Australia",
    flag: "🇦🇺",
    currency: "aud",
    currencySymbol: "A$",
    locale: "en-AU",
    priceKey: "priceAud",
    shippingCountries: ["AU"],
    shipping: "Ships to Australia · 7–12 days · tracked courier",
    note: "Made in India, shipped with care to Australia.",
  },
  IN: {
    code: "IN",
    label: "India",
    flag: "🇮🇳",
    currency: "inr",
    currencySymbol: "₹",
    locale: "en-IN",
    priceKey: "priceInr",
    shippingCountries: ["IN"],
    shipping: "Ships across India · 5–9 days · tracked courier",
    note: "Made in India — yoga wear from the birthplace of yoga.",
  },
};

export const DEFAULT_REGION = "AU";

export function getRegion(code) {
  return REGIONS[code] || REGIONS[DEFAULT_REGION];
}

export function isRegion(code) {
  return Object.prototype.hasOwnProperty.call(REGIONS, code);
}
