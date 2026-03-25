import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const valid = await verifySessionToken(token);
    if (!valid) {
      console.log("[middleware] Token verification failed for:", req.nextUrl.pathname);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (err) {
    console.error("[middleware] Token verification error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|_next/static|_next/image|favicon\\.ico|api/).*)"],
};
