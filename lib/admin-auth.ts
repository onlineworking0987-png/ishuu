const COOKIE_NAME = "ishu_admin";

function base64UrlEncode(input: Uint8Array) {
  const bin = Array.from(input, (b) => String.fromCharCode(b)).join("");
  const b64 = Buffer.from(bin, "binary").toString("base64");
  return b64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function base64UrlDecodeToBytes(s: string) {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  return new Uint8Array(Buffer.from(b64, "base64"));
}

function utf8Bytes(s: string) {
  return new TextEncoder().encode(s);
}

async function hmacSign(secret: string, msg: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    utf8Bytes(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, utf8Bytes(msg));
  return new Uint8Array(sig);
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "",
    password: process.env.ADMIN_PASSWORD || "",
  };
}

export function getAuthSecret() {
  return process.env.AUTH_SECRET || "";
}

export async function createAdminSessionToken(username: string) {
  const secret = getAuthSecret();
  if (!secret) return "";

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7; // 7 days
  const payload = JSON.stringify({ u: username, iat, exp });
  const payloadB64 = base64UrlEncode(utf8Bytes(payload));
  const sig = await hmacSign(secret, payloadB64);
  const sigB64 = base64UrlEncode(sig);
  return `${payloadB64}.${sigB64}`;
}

export async function verifyAdminSessionToken(token: string) {
  const secret = getAuthSecret();
  if (!secret) return false;

  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) return false;

  const expectedSig = await hmacSign(secret, payloadB64);
  const expectedSigB64 = base64UrlEncode(expectedSig);
  if (expectedSigB64 !== sigB64) return false;

  try {
    const payloadBytes = base64UrlDecodeToBytes(payloadB64);
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as {
      u?: string;
      iat?: number;
      exp?: number;
    };
    if (!payload?.u || !payload?.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return now <= payload.exp;
  } catch {
    return false;
  }
}

