import crypto from "crypto";
import { NextRequest } from "next/server";

export const STUDIO_COOKIE_NAME = "pv_studio_session";
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

interface SessionPayload {
  email: string;
  iat: number;
  exp: number;
}

/**
 * Validates plain password against stored scrypt hash.
 * Stored format: scrypt:<salt_hex>:<derived_key_hex>
 */
export function verifyPasswordHash(password: string, storedHash: string): boolean {
  try {
    if (!password || !storedHash) return false;
    const parts = storedHash.split(":");
    if (parts.length !== 3 || parts[0] !== "scrypt") return false;

    const [, saltHex, expectedKeyHex] = parts;
    const derivedKey = crypto.scryptSync(password, saltHex, 64);
    const expectedKey = Buffer.from(expectedKeyHex, "hex");

    if (derivedKey.length !== expectedKey.length) return false;
    return crypto.timingSafeEqual(derivedKey, expectedKey);
  } catch (error) {
    console.error("Password verification error:", error);
    return false;
  }
}

/**
 * Creates an scrypt hash from a plain password.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${derivedKey}`;
}

export interface VerifyCredentialsResult {
  valid: boolean;
  missingConfig?: boolean;
  error?: string;
}

/**
 * Verifies email and password against server environment variables.
 * Checks ADMIN_PASSWORD first, then ADMIN_PASSWORD_HASH as fallback.
 */
export function verifyAdminCredentials(emailAttempt: string, passwordAttempt: string): VerifyCredentialsResult {
  const adminEmail = (process.env.ADMIN_EMAIL?.trim() || "varunparlapalli2008@gmail.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH?.trim();

  if (!adminPassword && !adminPasswordHash) {
    console.error("Studio Auth Error: Neither ADMIN_PASSWORD nor ADMIN_PASSWORD_HASH environment variable is configured.");
    return {
      valid: false,
      missingConfig: true,
      error: "Server configuration error: ADMIN_PASSWORD environment variable is not configured in Vercel Production Environment Variables."
    };
  }

  const cleanEmail = (emailAttempt || "").trim().toLowerCase();
  if (cleanEmail !== adminEmail) {
    return {
      valid: false,
      error: "Incorrect email or password. Access is restricted to the verified portfolio owner."
    };
  }

  // 1. If plain ADMIN_PASSWORD is set, verify with constant-time equality
  if (adminPassword) {
    const attemptBuf = Buffer.from(passwordAttempt || "", "utf-8");
    const targetBuf = Buffer.from(adminPassword, "utf-8");
    if (attemptBuf.length === targetBuf.length && crypto.timingSafeEqual(attemptBuf, targetBuf)) {
      return { valid: true };
    }
  }

  // 2. If ADMIN_PASSWORD_HASH is set, verify with scrypt hash
  if (adminPasswordHash) {
    if (verifyPasswordHash(passwordAttempt, adminPasswordHash)) {
      return { valid: true };
    }
  }

  return {
    valid: false,
    error: "Incorrect email or password. Access is restricted to the verified portfolio owner."
  };
}

/**
 * Generates an HMAC-signed session token.
 */
export function createSessionToken(email: string): string {
  const secret = process.env.SESSION_SECRET || "default-unsecure-fallback-secret";
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    email: email.trim().toLowerCase(),
    iat: now,
    exp: now + SESSION_MAX_AGE_SECONDS
  };

  const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payloadEncoded)
    .digest("base64url");

  return `${payloadEncoded}.${signature}`;
}

/**
 * Verifies an HMAC-signed session token and checks expiry.
 */
export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadEncoded, signature] = parts;
  const secret = process.env.SESSION_SECRET || "default-unsecure-fallback-secret";

  try {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payloadEncoded)
      .digest("base64url");

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSignature);

    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(
      Buffer.from(payloadEncoded, "base64url").toString("utf-8")
    );

    const now = Math.floor(Date.now() / 1000);
    if (!payload.exp || payload.exp < now) {
      return null; // Expired
    }

    const adminEmail = (process.env.ADMIN_EMAIL?.trim() || "varunparlapalli2008@gmail.com").toLowerCase();
    if (payload.email !== adminEmail) {
      return null; // Mismatched owner
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Extracts and verifies the studio session from a NextRequest.
 */
export function getStudioSessionFromRequest(req: NextRequest): SessionPayload | null {
  const cookie = req.cookies.get(STUDIO_COOKIE_NAME);
  if (!cookie?.value) return null;
  return verifySessionToken(cookie.value);
}

/**
 * Cookie options for the HttpOnly session cookie.
 */
export function getSessionCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    name: STUDIO_COOKIE_NAME,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS
  };
}
