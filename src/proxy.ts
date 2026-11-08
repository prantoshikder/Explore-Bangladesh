/**
 * Language routing.
 *  - /bn/...           → Bangla pages (served as is)
 *  - /en/...           → 308 redirect to the clean English URL (/en/explore → /explore)
 *  - everything else   → internally rewritten to /en/... (English stays at the root),
 *                        unless the visitor picked Bangla before (`lang=bn` cookie
 *                        set by the language switcher) → redirect to /bn/...
 */
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/bn" || pathname.startsWith("/bn/")) return NextResponse.next();
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  const url = request.nextUrl.clone();
  if (request.cookies.get("lang")?.value === "bn") {
    url.pathname = `/bn${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url, 307);
  }
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes, images and any file with an extension (icons, sitemap.xml…)
  matcher: ["/((?!_next/|images/|api/|manifest\\.webmanifest|.*\\.[a-zA-Z0-9]+$).*)"],
};
