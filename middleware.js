import { NextResponse } from "next/server";

const PRIMARY_HOST = "vyomawear.com.au";
const REDIRECT_HOSTS = new Set([
  "www.vyomawear.com.au",
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
