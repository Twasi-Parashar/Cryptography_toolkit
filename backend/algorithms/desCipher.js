import crypto from "crypto";

export function encryptDES(plaintextHex, keyHex) {
    try {
        const key = Buffer.from(keyHex, "hex");
        const plaintext = Buffer.from(plaintextHex, "hex");

        const cipher = crypto.createCipheriv("DES-ECB", key, null);
        cipher.setAutoPadding(false);
        const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);

        return encrypted.toString("hex").toUpperCase();
    } catch (err) {
        throw new Error("Encryption failed: " + err.message);
    }
}

export function decryptDES(cipherHex, keyHex) {
    try {
        const key = Buffer.from(keyHex, "hex");
        const cipherText = Buffer.from(cipherHex, "hex");

        const decipher = crypto.createDecipheriv("DES-ECB", key, null);
        decipher.setAutoPadding(false);
        const decrypted = Buffer.concat([decipher.update(cipherText), decipher.final()]);

        return decrypted.toString("hex").toUpperCase();
    } catch (err) {
        throw new Error("Decryption failed: " + err.message);
    }
}
