export const SESSION_COOKIE_NAME = "inslab_session";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";
const SESSION_SECRET = process.env.SESSION_SECRET || "inslab-dev-secret-change-me";

const encoder = new TextEncoder();

async function getKey() {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): Uint8Array {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export async function createSessionToken(password: string): Promise<string | null> {
  if (password !== ADMIN_PASSWORD) return null;

  const payload = JSON.stringify({ exp: Date.now() + 24 * 60 * 60 * 1000 });
  const payloadBytes = encoder.encode(payload);
  const payloadB64 = toBase64Url(payloadBytes);

  const key = await getKey();
  const sigBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64));
  const sigB64 = toBase64Url(new Uint8Array(sigBuffer));

  return `${payloadB64}.${sigB64}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const dotIdx = token.indexOf(".");
    if (dotIdx < 0) return false;

    const payloadB64 = token.slice(0, dotIdx);
    const sigB64 = token.slice(dotIdx + 1);
    if (!payloadB64 || !sigB64) return false;

    const key = await getKey();
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(sigB64),
      encoder.encode(payloadB64),
    );
    if (!valid) return false;

    const payloadStr = new TextDecoder().decode(fromBase64Url(payloadB64));
    const payload = JSON.parse(payloadStr);
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return false;

    return true;
  } catch {
    return false;
  }
}
