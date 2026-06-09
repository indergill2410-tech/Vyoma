import { getRegion } from "./regions";

// Format a minor-unit amount (cents / paise) for a given region.
export function formatMoney(minor, regionCode = "AU") {
  const region = getRegion(regionCode);
  return new Intl.NumberFormat(region.locale, {
    style: "currency",
    currency: region.currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(minor / 100);
}

// Given a product, return its minor-unit price for a region.
export function priceFor(product, regionCode = "AU") {
  const region = getRegion(regionCode);
  return product[region.priceKey];
}
