import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_VALUE,
} from "lib/admin-session";

export { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE };

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

export function verifyAdminPassword(password: string): boolean {
  const expected = getAdminPassword();
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}
