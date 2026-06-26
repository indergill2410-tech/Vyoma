import { NextResponse } from "next/server";

// Render automatically redirects the apex (vyomawear.com.au) to the www
// subdomain and that isn't configurable — so www is the canonical host. The
// app must agree, otherwise apex→www (Render) + www→apex (app) is a loop.
const PRIMARY_HOST = "www.vyomawear.com.au";
const REDIRECT_HOSTS = new Set([
  "vyomawear.com.au",
  "vyomawear.com",
  "www.vyomawear.com",
]);

export function middleware(request) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (host && REDIRECT_HOSTS.has(host)) {
    const url = request.nextUrl.clone();
    url.protocol = "https";
    url.host = PRIMARY_HOST;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/|_next/|favicon.ico|icon.svg|manifest.webmanifest).*)"],
};
