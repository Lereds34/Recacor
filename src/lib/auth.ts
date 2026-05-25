import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET est manquant dans les variables d'environnement");
}
const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);
const COOKIE_NAME = "recacor_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 jours

export interface SessionPayload {
  user: string;
  iat?: number;
  exp?: number;
}

export async function createSession(user: string): Promise<string> {
  return new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(SECRET);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const c = await cookies();
  c.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSessionCookie() {
  const c = await cookies();
  c.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const c = await cookies();
  const token = c.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export const SESSION_COOKIE = COOKIE_NAME;

export function checkCredentials(user: string, pass: string): boolean {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPass = process.env.ADMIN_PASS;
  if (!expectedUser || !expectedPass) {
    throw new Error("ADMIN_USER ou ADMIN_PASS manquants dans les variables d'environnement");
  }
  return user === expectedUser && pass === expectedPass;
}
