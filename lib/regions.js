// Region drives currency and shipping copy. Vyoma is launching AU-only.
// India (IN) is kept dormant below — re-enable it when the India market is ready
// (re-add the RegionToggle in the nav and a Shopify market/currency for INR).

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
    shipping: "Ships across Australia · 5–9 days · tracked courier",
    note: "Made in India, shipped with care to Australia.",
  },
  // IN: {  // dormant — re-enable for the India launch
  //   code: "IN",
  //   label: "India",
  //   flag: "🇮🇳",
  //   currency: "inr",
  //   currencySymbol: "₹",
  //   locale: "en-IN",
  //   priceKey: "priceInr",
  //   shippingCountries: ["IN"],
  //   shipping: "Ships across India · 5–9 days · tracked courier",
  //   note: "Made in India — activewear from the home of yoga.",
  // },
};

export const DEFAULT_REGION = "AU";

export function getRegion(code) {
  return REGIONS[code] || REGIONS[DEFAULT_REGION];
}

export function isRegion(code) {
  return Object.prototype.hasOwnProperty.call(REGIONS, code);
}
