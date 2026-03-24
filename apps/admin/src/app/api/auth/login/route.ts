import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const token = await createSessionToken(password);

  if (!token) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return res;
}
