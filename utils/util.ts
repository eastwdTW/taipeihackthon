import * as crypto from "crypto";

export function encryptWithPublicKey(message: string) {
  const RSA_PUBLIC_KEY = process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY;
  if (RSA_PUBLIC_KEY) {
    const bufferMessage = Buffer.from(message, "utf8");
    const encrypted = crypto.publicEncrypt(RSA_PUBLIC_KEY, bufferMessage);
    return encrypted.toString("base64");
  }
  throw new Error("");
}
