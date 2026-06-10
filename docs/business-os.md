# Vyoma Business OS

Run the whole business on connected platforms with minimal manual work. Every
integration is **env-gated**: paste keys to switch it on; without them the app
falls back gracefully and never breaks.

## One connector per department

| Connector | Department | Status in code |
| --- | --- | --- |
| **Shopify** | Storefront, checkout, payments, orders | ✅ wired (`lib/shopify.js`) — set 2 env vars |
| **Twilio** | SMS / WhatsApp comms | ✅ wired (`lib/twilio.js`, `/api/notify`) — set 4 env vars |
| **Cloudflare** | Image storage (R2) + DNS | optional |
| **GitHub Actions** | Scheduled automation | ✅ weekly report (`.github/workflows/weekly-report.yml`) |
| **Supabase** | Production Postgres | 📋 guided setup below (Prisma swap) |
| **Sentry** | Error monitoring | 📋 one-command setup below |
| **Linear** | Ops / project management | 📋 workflow below |
| **Figma** | Brand & creative | 📋 workflow below |

---

## Setup (≈10 min each)

### Shopify — already integrated
Set `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_TOKEN`. Products, photos and
checkout go live. See `docs/shopify-photos.md` for on-model photos.

### Twilio — SMS / WhatsApp
1. Create a Twilio account; get Account SID + Auth Token.
2. For WhatsApp, start with the Twilio Sandbox (instant) or apply for a sender.
3. Set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM`, `TWILIO_WHATSAPP_FROM`.
4. Test: `POST /api/notify` (admin token) `{ "to":"+61...", "body":"hi", "channel":"whatsapp" }`.
- *India tip:* WhatsApp is the channel — use it for drop alerts and order updates.

### Cloudflare — storage + DNS (optional)
1. Get `CLOUDFLARE_ACCOUNT_ID` and an API token with **R2** perms.
2. R2 for hosting assets (bucket can be created via the Cloudflare MCP).
3. Optional: host the site on Cloudflare Pages + put DNS for vyomawear.com here.

### Product photos
- Real on-model photos via a Shopify app (see `docs/ai-model-photos.md`), or
- `npm run images` (Gemini/Imagen — needs a billing-enabled Google project).

### Supabase — production database
Prisma already abstracts the DB; switch the managed Postgres in:
1. Create a Supabase project → copy the Postgres connection string.
2. In `prisma/schema.prisma` set `provider = "postgresql"`.
3. Set `DATABASE_URL` to the Supabase string, then `npx prisma db push`.
4. (Local dev stays on SQLite by keeping the sqlite provider + file URL.)
Supabase also gives you Auth (admin login) and Storage if you outgrow the token gate.

### Sentry — error monitoring
One command wires client + server + sourcemaps:
```bash
npx @sentry/wizard@latest -i nextjs
```
Then add `SENTRY_DSN` (and the auth token it sets up) to your env.

### Linear — run the business
- Create a **Vyoma** team with projects: *Drops*, *Content*, *Storefront*, *Ops*.
- Labels: `drop`, `bug`, `marketing`, `supplier`, `restock`.
- A Drop = a Linear project with a launch checklist (photos → publish → blast).
- Future automation: Sentry issue → Linear issue; Claude opens a GitHub PR for fixes.

### Figma — brand & creative
- Generate a design system + social/lookbook templates from the Sky Series palette.
- Use the Figma MCP to turn live pages into editable design files and back.

---

## Automation recipes (build next)

1. **Drop launch in one click** — Linear "Drop" done → GitHub Action flips a
   Cloudflare KV flag (site live) + Shopify publish + Twilio waitlist blast.
2. **Order → WhatsApp** — Shopify order webhook → `lib/twilio.js` "being made in
   Tiruppur ✦" + tracking link.
3. **Self-healing ops** — Sentry alert → Linear issue → Claude PR → you approve.
4. **Abandoned-cart rescue** — Shopify checkout-started → +1h Twilio nudge.
5. **Weekly autopilot** — `scripts/weekly-report.mjs` (already scheduled Mondays).

## What needs you vs. what's automated
- **You (one-time, ~10 min each):** create accounts, paste API keys/secrets,
  approve a WhatsApp sender. Nobody can do this on your behalf.
- **Automated:** all the code, webhooks, scheduled jobs and fallbacks above.
