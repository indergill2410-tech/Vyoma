import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getProduct, isValidColourway, COLOURWAYS } from "@/lib/catalog";
import { getRegion, isRegion } from "@/lib/regions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/checkout  { region, items: [{ slug, colour, size, quantity }] }
//
// SECURITY: prices, names and currency are resolved server-side from the catalog
// and region. The client only sends what was chosen — never a price.
export async function POST(req) {
  try {
    const { region: regionCode, items } = await req.json();

    if (!isRegion(regionCode)) {
      return NextResponse.json({ error: "Unknown region." }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
    }

    const region = getRegion(regionCode);
    const lineItems = [];
    const record = []; // compact record for the webhook to enrich

    for (const raw of items.slice(0, 20)) {
      const product = getProduct(raw.slug);
      if (!product) {
        return NextResponse.json({ error: `Unknown product: ${raw.slug}` }, { status: 400 });
      }
      if (!isValidColourway(product, raw.colour)) {
        return NextResponse.json({ error: `Pick a colour for ${product.name}.` }, { status: 400 });
      }
      if (!product.sizes.includes(raw.size)) {
        return NextResponse.json({ error: `Pick a size for ${product.name}.` }, { status: 400 });
      }
      const qty = Math.min(Math.max(parseInt(raw.quantity || 1, 10), 1), 10);
      const unitAmount = product[region.priceKey];
      const colourName = COLOURWAYS[raw.colour]?.name || raw.colour;

      lineItems.push({
        quantity: qty,
        price_data: {
          currency: region.currency,
          unit_amount: unitAmount,
          product_data: {
            name: `${product.name} — ${raw.size}`,
            description: `${colourName} · ${product.leadTime}`,
          },
        },
      });

      record.push({ slug: product.slug, colour: raw.colour, size: raw.size, quantity: qty, unitAmount });
    }

    const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: { allowed_countries: region.shippingCountries },
      phone_number_collection: { enabled: true },
      metadata: {
        region: region.code,
        items: JSON.stringify(record),
      },
      success_url: `${site}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("checkout error", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 }
    );
  }
}
