"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_ALGORITHM, getSessionSecret } from "@/lib/auth/session";

async function createSessionToken(): Promise<string> {
  return new SignJWT({ admin: true })
    .setProtectedHeader({ alg: SESSION_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSessionSecret());
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSessionSecret());
    return true;
  } catch {
    return false;
  }
}

export async function login(password: string): Promise<{ error?: string }> {
  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Invalid credentials." };
  }
  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  redirect("/admin");
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}
