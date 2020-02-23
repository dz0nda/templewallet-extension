import { Buffer } from "buffer";

/**
 * password + salt => key
 * stuff + key => enc_stuff
 * enc_stuff + key => stuff
 *
 * Encrypt
 * 1) salt = generateSalt()
 * 2) passKey = generateKey(password*, salt)
 * 3) encryptedStuff = encrypt(stuff*, passKey)
 * 4) persist*(salt, encryptedStuff);
 *
 * Decrypt
 * 1) passKey = generateKey(password*, salt*)
 * 2) stuff = decrypt(encryptedStuff*, passKey)
 * 3) If not OK - password incorrect
 *
 */

export type EncryptedPayload = { dt: string; iv: string };

export async function encrypt(
  stuff: any,
  key: CryptoKey
): Promise<EncryptedPayload> {
  const stuffStr = JSON.stringify(stuff);
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const encryptedStuff = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv
    },
    key,
    Buffer.from(stuffStr)
  );

  return {
    dt: Buffer.from(encryptedStuff).toString("hex"),
    iv: Buffer.from(iv).toString("hex")
  };
}

export async function decrypt(
  { dt: encryptedStuffHex, iv: ivHex }: EncryptedPayload,
  key: CryptoKey
) {
  const stuffBuf = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: Buffer.from(ivHex, "hex") },
    key,
    Buffer.from(encryptedStuffHex, "hex")
  );
  const stuffStr = Buffer.from(stuffBuf).toString();
  return JSON.parse(stuffStr);
}

export async function generateKey(password: string, salt: Uint8Array) {
  const key = await crypto.subtle.importKey(
    "raw",
    Buffer.alloc(32, password),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 10000,
      hash: "SHA-256"
    },
    key,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export function generateSalt(byteCount = 32) {
  const view = new Uint8Array(byteCount);
  crypto.getRandomValues(view);
  return view;
}