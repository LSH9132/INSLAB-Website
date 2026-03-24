"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function loginAction(_prev: { error?: string }, formData: FormData) {
  const password = formData.get("password") as string;
  const token = await createSessionToken(password);

  if (!token) {
    return { error: "Invalid password" };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  redirect("/");
}
