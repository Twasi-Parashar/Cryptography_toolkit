// backend/controllers/hillController.js

import { encrypt as hillEncrypt, decrypt as hillDecrypt } from "../../algorithms/hillCipher.js";

// Encrypt text endpoint
export const encryptText = (req, res) => {
    try {
        const { text, key } = req.body;

        if (!text || !key) {
            return res.status(400).json({ error: "Text and key are required" });
        }

        const cipherText = hillEncrypt(text, key);
        res.json({ result: cipherText });
    } catch (error) {
        res.status(500).json({ error: "Encryption failed", details: error.message });
    }
};

// Decrypt text endpoint
export const decryptText = (req, res) => {
    try {
        const { text, key } = req.body;

        if (!text || !key) {
            return res.status(400).json({ error: "Text and key are required" });
        }

        const plainText = hillDecrypt(text, key);
        res.json({ result: plainText });
    } catch (error) {
        res.status(500).json({ error: "Decryption failed", details: error.message });
    }
};
