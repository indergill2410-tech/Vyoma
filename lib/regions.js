// Vyomawear serves two markets from one Indian supply base (business plan §1).
// Region drives currency, shipping copy, and which countries Stripe will collect.
//
//  AU — Australia. 0% duty under the Australia–India ECTA trade agreement.
//  IN — India. Domestic, made-to-order from Tiruppur, Tamil Nadu.

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
    shipping: "Ships to Australia · 7–12 days · 0% duty under India–Australia ECTA",
    note: "Made for you in India, shipped duty-free to Australia under the ECTA trade agreement.",
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
    note: "Made for you in Tiruppur, Tamil Nadu — yoga wear from the birthplace of yoga.",
  },
};

export const DEFAULT_REGION = "AU";

export function getRegion(code) {
  return REGIONS[code] || REGIONS[DEFAULT_REGION];
}

export function isRegion(code) {
  return Object.prototype.hasOwnProperty.call(REGIONS, code);
}
