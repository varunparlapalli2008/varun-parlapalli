import crypto from "crypto";
import { NextRequest } from "next/server";

export const STUDIO_COOKIE_NAME = "pv_studio_session";
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

export interface SessionPayload {
  role: "studio_owner";
  iat: number;
  exp: number;
}

export interface VerifyPasswordResult {
  valid: boolean;
  missingConfig?: boolean;
  error?: string;
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

/**
 * Verifies the studio password against the server-side environment variable.
 * Checks STUDIO_ADMIN_PASSWORD first (primary), then ADMIN_PASSWORD or ADMIN_PASSWORD_HASH as fallback.
 * Uses timing-safe constant-time SHA-256 buffer equality.
 */
export function verifyStudioPassword(passwordAttempt: string): VerifyPasswordResult {
  const adminPassword = (process.env.STUDIO_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD)?.trim();
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH?.trim();

  if (!adminPassword && !adminPasswordHash) {
    console.error("Studio Auth Error: STUDIO_ADMIN_PASSWORD is not configured in Vercel environment variables.");
    return {
      valid: false,
      missingConfig: true,
      error: "Server configuration error: STUDIO_ADMIN_PASSWORD environment variable is not configured in Vercel Production Environment Variables."
    };
  }

  const cleanAttempt = (passwordAttempt || "").trim();
  if (!cleanAttempt) {
    return {
      valid: false,
      error: "Password is required to access Studio."
    };
  }

  // 1. Primary verification: STUDIO_ADMIN_PASSWORD (supports scrypt hash or plain password)
  if (adminPassword) {
    if (adminPassword.startsWith("scrypt:") && verifyPasswordHash(cleanAttempt, adminPassword)) {
      return { valid: true };
    }

    const attemptHash = crypto.createHash("sha256").update(cleanAttempt).digest();
    const targetHash = crypto.createHash("sha256").update(adminPassword).digest();
    if (crypto.timingSafeEqual(attemptHash, targetHash)) {
      return { valid: true };
    }
  }

  // 2. Fallback verification: scrypt hash if configured
  if (adminPasswordHash) {
    if (verifyPasswordHash(cleanAttempt, adminPasswordHash)) {
      return { valid: true };
    }
  }

  return {
    valid: false,
    error: "Incorrect password. Please try again."
  };
}

// Backwards-compatible wrapper
export function verifyAdminCredentials(_emailAttempt: string, passwordAttempt: string): VerifyPasswordResult {
  return verifyStudioPassword(passwordAttempt);
}

/**
 * Generates an HMAC-signed session token.
 */
export function createSessionToken(): string {
  const secret = process.env.SESSION_SECRET || "pv-studio-session-production-key-fallback";
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    role: "studio_owner",
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

    if (payload.role !== "studio_owner") {
      return null;
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
