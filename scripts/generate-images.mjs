// Generate 3 product photos (on-model, back, detail) for every product, via
// Google's Gemini/Imagen image API.
//
// Usage:
//   GEMINI_API_KEY=xxx node scripts/generate-images.mjs
//
// Options (env):
//   IMAGE_PROVIDER       "gemini" (default) or "cloudflare" (Workers AI, FREE — no billing)
//   CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN   (for IMAGE_PROVIDER=cloudflare)
//   GEMINI_API_KEY       key from https://aistudio.google.com/apikey
//                        NOTE: image models require a BILLING-enabled project
//                        (the free tier returns quota 0 for image generation).
//   GEMINI_IMAGE_MODEL   default "gemini-2.5-flash-image"
//                        (e.g. "gemini-2.5-flash-image" for the Nano-Banana model)
//   FORCE=1              regenerate even if a file already exists
//
// Files are written to /public/products/<slug>/{model,back,detail}.png.
// Until they exist, the site falls back to the generated colourway swatch.

import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PRODUCTS, COLOURWAYS } from "../lib/catalog.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "public", "products");

const FORCE = process.env.FORCE === "1";
const PROVIDER = process.env.IMAGE_PROVIDER || "gemini"; // "gemini" | "cloudflare"
const GEMINI_MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
const CF_ACCT = process.env.CLOUDFLARE_ACCOUNT_ID;
const CF_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CF_MODEL = process.env.CLOUDFLARE_IMAGE_MODEL || "@cf/black-forest-labs/flux-1-schnell";

const STYLE =
  "Realistic studio product photograph for Vyoma, a premium India-made yoga-wear brand. " +
  "Soft natural studio light, minimalist seamless warm off-white backdrop, calm airy mood, " +
  "photorealistic, sharp detail, true-to-life colour, no graphic overlays.";

// Where the brand mark sits on each kind of garment. We carry BOTH the Sanskrit
// "व्योम" (the brand's USP) and the "Vyoma" wordmark.
const MARK = "the brand mark — the Sanskrit word 'व्योम' next to 'Vyoma', both spelled correctly";
function brandingFor(category) {
  const c = (category || "").toLowerCase();
  if (c.includes("bra")) return `${MARK} on the elastic underband`;
  if (c.includes("top")) return `${MARK} on a small woven label at the hem`;
  if (c.includes("layer")) return `${MARK} on a small woven label at the neckline`;
  if (c.includes("accessor")) return `${MARK} screen-printed on the front`;
  if (c.includes("set")) return `${MARK} on the legging waistband`;
  return `${MARK} on the waistband`; // bottoms / default
}

function prompts(product) {
  const colour = COLOURWAYS[product.colourways[0]];
  const c = `${colour?.name} (${colour?.base})`;
  const brand = brandingFor(product.category);
  return {
    model:
      `${STYLE} A female model wearing the ${product.name} — a ${c} ${product.category} piece — ` +
      `in a serene yoga studio. Full-body, three-quarter pose, natural and relaxed, calm expression. ` +
      `The actual garment is the clear hero, fits beautifully, and carries ${brand}, spelled correctly. ` +
      `Vertical 3:4 framing.`,
    back:
      `${STYLE} Back view of the same model wearing the ${product.name} in ${c}, same studio and styling. ` +
      `Full-body, showing the fit and lines from behind. Vertical 3:4 framing.`,
    detail:
      `${STYLE} Tight close-up of the same ${product.name} in ${c}: real fabric texture and stitching, ` +
      `clearly showing ${brand}, spelled correctly and crisp, worn on the same model, soft directional light. ` +
      `Vertical 3:4 framing.`,
  };
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function generate(prompt, referenceB64) {
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!key) throw new Error("Set GEMINI_API_KEY (https://aistudio.google.com/apikey)");
  const base = "https://generativelanguage.googleapis.com/v1beta/models";

  // Imagen models use the :predict endpoint (different payload + response).
  if (GEMINI_MODEL.startsWith("imagen")) {
    const res = await fetch(`${base}/${GEMINI_MODEL}:predict?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: { sampleCount: 1, aspectRatio: "3:4" },
      }),
    });
    if (!res.ok) throw new Error(`Imagen ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const data = await res.json();
    const b64 = data?.predictions?.[0]?.bytesBase64Encoded;
    if (!b64) throw new Error("Imagen returned no image");
    return Buffer.from(b64, "base64");
  }

  // Gemini image models (e.g. gemini-2.5-flash-image) use :generateContent and
  // can take a reference image for subject consistency.
  const parts = [{ text: prompt }];
  if (referenceB64) parts.push({ inline_data: { mime_type: "image/png", data: referenceB64 } });
  const res = await fetch(`${base}/${GEMINI_MODEL}:generateContent?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts }],
      generationConfig: { responseModalities: ["IMAGE"] },
    }),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const out = data?.candidates?.[0]?.content?.parts?.find((p) => p.inlineData || p.inline_data);
  const b64 = out?.inlineData?.data || out?.inline_data?.data;
  if (!b64) throw new Error("Gemini returned no image");
  return Buffer.from(b64, "base64");
}

// Cloudflare Workers AI — free tier, no billing. Flux returns JSON {result:{image}};
// other models stream raw PNG. Handle both.
async function viaCloudflare(prompt) {
  if (!CF_ACCT || !CF_TOKEN) throw new Error("Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN");
  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CF_ACCT}/ai/run/${CF_MODEL}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${CF_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error(`Cloudflare ${res.status}: ${(await res.text()).slice(0, 200)}`);
  if ((res.headers.get("content-type") || "").includes("application/json")) {
    const d = await res.json();
    const b64 = d?.result?.image;
    if (!b64) throw new Error("Cloudflare returned no image");
    return Buffer.from(b64, "base64");
  }
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  console.log(`▶ Generating product images via ${PROVIDER === "cloudflare" ? "Cloudflare Workers AI (" + CF_MODEL + ")" : "Gemini (" + GEMINI_MODEL + ")"}…\n`);
  let made = 0;
  let skipped = 0;

  for (const product of PRODUCTS) {
    const dir = join(OUT, product.slug);
    await mkdir(dir, { recursive: true });
    const p = prompts(product);

    let modelBuf = null; // reuse on-model shot as a reference for the others
    const shots = [
      { slot: "model", prompt: p.model },
      { slot: "back", prompt: p.back },
      { slot: "detail", prompt: p.detail },
    ];

    for (const shot of shots) {
      const file = join(dir, `${shot.slot}.png`);
      if (!FORCE && (await exists(file))) {
        skipped++;
        console.log(`  ⏭  ${product.slug}/${shot.slot}.png (exists)`);
        continue;
      }
      try {
        const buf =
          PROVIDER === "cloudflare"
            ? await viaCloudflare(shot.prompt)
            : await generate(shot.prompt, shot.slot !== "model" ? modelBuf?.toString("base64") : null);
        if (shot.slot === "model") modelBuf = buf;
        await writeFile(file, buf);
        made++;
        console.log(`  ✓  ${product.slug}/${shot.slot}.png`);
      } catch (err) {
        console.error(`  ✗  ${product.slug}/${shot.slot}.png — ${err.message}`);
      }
      await new Promise((r) => setTimeout(r, 1200)); // be gentle on rate limits
    }
  }

  console.log(`\n✦ Done. ${made} generated, ${skipped} skipped.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
