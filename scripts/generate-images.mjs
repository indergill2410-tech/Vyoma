// Generate the 2 product photos (on-model + fabric detail) for every product.
//
// Usage:
//   IMAGE_PROVIDER=pollinations  node scripts/generate-images.mjs     # FREE, no key
//   IMAGE_PROVIDER=gemini GEMINI_API_KEY=xxx node scripts/generate-images.mjs
//
// Options (env):
//   IMAGE_PROVIDER      "gemini" (default), "pollinations" (free, no key),
//                       or "cloudflare" (Workers AI free tier; needs account+token)
//   GEMINI_API_KEY      free key from https://aistudio.google.com/apikey
//   GEMINI_IMAGE_MODEL  default "gemini-2.5-flash-image"
//   FORCE=1             regenerate even if a file already exists
//
// Files are written to /public/products/<slug>/model.png and detail.png.
// Until they exist, the site falls back to the generated colourway swatch.

import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PRODUCTS, COLOURWAYS } from "../lib/catalog.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "public", "products");

const PROVIDER = process.env.IMAGE_PROVIDER || "gemini";
const FORCE = process.env.FORCE === "1";
const GEMINI_MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";

const STYLE =
  "Editorial e-commerce photography for Vyoma, a premium yoga-wear brand. " +
  "Soft natural studio light, minimalist seamless warm off-white backdrop, calm airy mood, " +
  "photorealistic, sharp detail, true-to-life colour.";

function prompts(product) {
  const colour = COLOURWAYS[product.colourways[0]];
  const c = `${colour?.name} (${colour?.base})`;
  return {
    model:
      `${STYLE} A female model wearing the ${product.name} — a ${c} ${product.category} piece — ` +
      `in a serene yoga studio. Full-body, three-quarter pose, natural and relaxed, calm expression. ` +
      `The garment is the clear hero and fits beautifully. Vertical 3:4 framing.`,
    detail:
      `${STYLE} Close-up detail of the same ${product.name} in ${c}: fabric texture, waistband and ` +
      `stitching, worn on the same model, soft directional light. Vertical 3:4 framing.`,
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

// ── Providers ─────────────────────────────────────────────────────────────────
async function viaPollinations(prompt, seed) {
  const url =
    `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}` +
    `?width=1024&height=1365&nologo=true&seed=${seed}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Pollinations ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function viaGemini(prompt, referenceB64) {
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!key) throw new Error("Set GEMINI_API_KEY (free at https://aistudio.google.com/apikey)");
  const parts = [{ text: prompt }];
  if (referenceB64) {
    parts.push({ inline_data: { mime_type: "image/png", data: referenceB64 } });
  }
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts }],
        generationConfig: { responseModalities: ["IMAGE"] },
      }),
    }
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const out = data?.candidates?.[0]?.content?.parts?.find((p) => p.inlineData || p.inline_data);
  const b64 = out?.inlineData?.data || out?.inline_data?.data;
  if (!b64) throw new Error("Gemini returned no image");
  return Buffer.from(b64, "base64");
}

async function viaCloudflare(prompt) {
  const acct = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!acct || !token) throw new Error("Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN");
  const model = process.env.CLOUDFLARE_IMAGE_MODEL || "@cf/black-forest-labs/flux-1-schnell";
  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${acct}/ai/run/${model}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error(`Cloudflare ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const b64 = data?.result?.image;
  if (!b64) throw new Error("Cloudflare returned no image");
  return Buffer.from(b64, "base64");
}

async function main() {
  console.log(`▶ Generating product images via "${PROVIDER}"…\n`);
  let made = 0;
  let skipped = 0;

  for (let i = 0; i < PRODUCTS.length; i++) {
    const product = PRODUCTS[i];
    const dir = join(OUT, product.slug);
    await mkdir(dir, { recursive: true });
    const p = prompts(product);

    // On-model first; reuse it as a reference so the detail shot keeps the same
    // model + garment (Gemini only).
    let modelBuf = null;
    const shots = [
      { slot: "model", prompt: p.model },
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
        let buf;
        if (PROVIDER === "pollinations") {
          buf = await viaPollinations(shot.prompt, i * 10 + (shot.slot === "model" ? 1 : 2));
        } else if (PROVIDER === "cloudflare") {
          buf = await viaCloudflare(shot.prompt);
        } else {
          buf = await viaGemini(shot.prompt, shot.slot === "detail" ? modelBuf?.toString("base64") : null);
        }
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
