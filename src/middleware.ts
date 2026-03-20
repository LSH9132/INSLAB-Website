import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, isValidLocale } from "@/lib/i18n/i18n-config";

// Paths that should never be rewritten (static files, Next.js internals)
const EXCLUDED_PREFIXES = ["/_next", "/images", "/favicon.ico", "/api"];

function getPreferredLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return defaultLocale;

  const parts = acceptLanguage.split(",");
  for (const part of parts) {
    const tag = part.split(";")[0].trim().toLowerCase();
    if (tag.startsWith("ko")) return "ko";
    if (tag.startsWith("en")) return "en";
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip excluded paths
  if (EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Extract the first segment of the path
  const segments = pathname.split("/");
  const firstSegment = segments[1];

  // If the path already starts with a valid locale, rewrite transparently
  if (isValidLocale(firstSegment)) {
    return NextResponse.next();
  }

  // Otherwise, determine the preferred locale and rewrite the URL
  const preferredLocale = getPreferredLocale(
    request.headers.get("accept-language"),
  );

  // For the default locale (en), rewrite internally — no redirect needed,
  // the URL stays clean (e.g. "/" stays "/" but resolves to "/en/…")
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|api).*)",
  ],
};
