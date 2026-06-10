// Shopify Storefront API client (headless).
// Products, prices and checkout live in Shopify; this app is the custom front end.
// When the env vars are absent, the app falls back to the local catalog — so the
// site keeps working in dev/preview without a store connected.

const domain = process.env.SHOPIFY_STORE_DOMAIN; // e.g. vyomawear.myshopify.com
const token = process.env.SHOPIFY_STOREFRONT_TOKEN; // Storefront API access token
const API_VERSION = "2024-07";

export function shopifyConfigured() {
  return Boolean(domain && token);
}

async function shopifyFetch(query, variables = {}) {
  if (!shopifyConfigured()) {
    throw new Error("Shopify env vars missing (SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_TOKEN).");
  }
  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    // Revalidate product data every 60s — fresh prices without hammering the API.
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`Shopify API bad response (${res.status}):`, text);
    throw new Error(`Shopify API error: ${res.status}`);
  }
  const json = await res.json();
  if (json.errors) {
    console.error("Shopify API errors:", JSON.stringify(json.errors));
    throw new Error("Shopify API error");
  }
  return json.data;
}

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  featuredImage { url altText width height }
  images(first: 8) { nodes { url altText width height } }
  priceRange { minVariantPrice { amount currencyCode } }
  options { name values }
  variants(first: 40) {
    nodes {
      id
      title
      availableForSale
      price { amount currencyCode }
      selectedOptions { name value }
    }
  }
`;

export async function getProducts() {
  const data = await shopifyFetch(`
    query Products {
      products(first: 24, sortKey: CREATED_AT, reverse: true) {
        nodes { ${PRODUCT_FIELDS} }
      }
    }
  `);
  return data.products.nodes;
}

export async function getProduct(handle) {
  const data = await shopifyFetch(
    `query Product($handle: String!) { product(handle: $handle) { ${PRODUCT_FIELDS} } }`,
    { handle }
  );
  return data.product;
}

// Creates a cart and returns Shopify's hosted checkout URL.
// `lines` is [{ merchandiseId, quantity }] — supports multi-item carts.
export async function createCheckout(lines) {
  const data = await shopifyFetch(
    `mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { checkoutUrl }
        userErrors { message }
      }
    }`,
    { lines }
  );
  const errs = data.cartCreate.userErrors;
  if (errs && errs.length) throw new Error(errs[0].message);
  return data.cartCreate.cart.checkoutUrl;
}

export function formatMoney({ amount, currencyCode }) {
  const currency = currencyCode || "AUD";
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-AU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}
