import { cookies } from "next/headers";
import crypto from "crypto";

const JWT_SECRET = process.env.ADMIN_PASSWORD || "temporary-fallback-secret-password-shutter-wild-2027";

// In production, enforce HTTPS-strict __Host- prefix. 
// In development, fall back to standard session name since local host does not run HTTPS.
const COOKIE_NAME = process.env.NODE_ENV === "production" 
  ? "__Host-shutter-wild-admin-session" 
  : "shutter-wild-admin-session";

export async function createSession() {
  const cookieStore = await cookies();
  const sessionData = JSON.stringify({
    admin: true,
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  });
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(sessionData)
    .digest("hex");
  const token = `${Buffer.from(sessionData).toString("base64")}.${signature}`;

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie) return null;

  try {
    const [encodedPayload, signature] = cookie.value.split(".");
    if (!encodedPayload || !signature) return null;

    const payloadStr = Buffer.from(encodedPayload, "base64").toString("utf-8");
    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(payloadStr)
      .digest("hex");

    if (signature !== expectedSignature) return null;

    const payload = JSON.parse(payloadStr);
    if (payload.expires < Date.now()) return null;

    return payload;
  } catch (err) {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
