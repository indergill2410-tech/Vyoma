// Simple admin gate via shared token header. Good enough for a lean launch;
// move admin behind real auth (e.g. NextAuth) when the team grows.
export function isAdmin(req) {
  const token = req.headers.get("x-admin-token");
  return Boolean(token) && token === process.env.ADMIN_TOKEN;
}
