import crypto from "crypto";

const algorithm = "aes-256-cbc";

const key = crypto
  .createHash("sha256")
  .update(process.env.BVN_SECRET_KEY)
  .digest();

export const encryptBVN = (bvn) => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(bvn, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
};