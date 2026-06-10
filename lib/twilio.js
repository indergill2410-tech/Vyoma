// Twilio SMS / WhatsApp sender (env-gated, dependency-free REST).
// Used for drop alerts, order updates and one-off notifications. No-ops cleanly
// when the env vars are absent, so the app never breaks without Twilio set up.
//
// Env:
//   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN
//   TWILIO_FROM            e.g. +61400000000        (SMS sender)
//   TWILIO_WHATSAPP_FROM   e.g. +14155238886        (WhatsApp sender; sandbox ok)

const sid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

export function twilioConfigured() {
  return Boolean(sid && authToken && (process.env.TWILIO_FROM || process.env.TWILIO_WHATSAPP_FROM));
}

// send({ to:"+61...", body:"...", channel:"sms"|"whatsapp" })
export async function send({ to, body, channel = "sms" }) {
  if (!twilioConfigured()) return { skipped: true, reason: "twilio-not-configured" };
  if (!to || !body) throw new Error("twilio send: 'to' and 'body' are required");

  const whatsapp = channel === "whatsapp";
  const fromRaw = whatsapp ? process.env.TWILIO_WHATSAPP_FROM : process.env.TWILIO_FROM;
  if (!fromRaw) throw new Error(`twilio send: no sender set for channel "${channel}"`);

  // Twilio requires E.164 (+ and digits only) — strip spaces/dashes/parens.
  const e164 = (n) => n.replace(/^whatsapp:/, "").replace(/[^\d+]/g, "");
  const From = whatsapp ? `whatsapp:${e164(fromRaw)}` : e164(fromRaw);
  const To = whatsapp ? `whatsapp:${e164(to)}` : e164(to);

  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${sid}:${authToken}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ From, To, Body: body }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Twilio ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

// Ready-made message templates — keep brand voice in one place.
export const messages = {
  orderPlaced: (orderNumber) =>
    `✦ Vyoma — your order ${orderNumber} is being crafted in India with care. We'll text you when it ships. Room to grow.`,
  shipped: (orderNumber, tracking) =>
    `✦ Vyoma — ${orderNumber} has shipped${tracking ? ` (tracking: ${tracking})` : ""}. Almost yours.`,
  dropLive: (name) =>
    `✦ The ${name} drop is live. The list hears first — shop before it's gone: `,
};
