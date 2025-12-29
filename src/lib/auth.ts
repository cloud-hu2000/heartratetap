import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SESSION_COOKIE_NAME = "hrt_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

export function signSession(payload: Record<string, any>) {
  const secret = process.env.NEXTAUTH_SECRET || "dev-secret";
  return jwt.sign(payload, secret, { expiresIn: `${SESSION_MAX_AGE}s` });
}

export function verifySession(token: string) {
  const secret = process.env.NEXTAUTH_SECRET || "dev-secret";
  try {
    return jwt.verify(token, secret) as Record<string, any>;
  } catch {
    return null;
  }
}

export function makeSessionCookie(token: string, secure = false) {
  const parts = [
    `${SESSION_COOKIE_NAME}=${token}`,
    `Path=/`,
    `HttpOnly`,
    `Max-Age=${SESSION_MAX_AGE}`,
    `SameSite=Lax`
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

export function clearSessionCookie() {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`;
}

export function readSessionFromHeader(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const match = cookieHeader.split(";").map((p) => p.trim()).find((p) => p.startsWith(`${SESSION_COOKIE_NAME}=`));
  if (!match) return null;
  return match.split("=")[1];
}


