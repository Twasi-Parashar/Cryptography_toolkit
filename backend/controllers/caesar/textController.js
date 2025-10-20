// backend/controllers/caesar/textController.js
import { encrypt, decrypt } from "../../algorithms/caesarCipher.js";

export const caesarEncrypt = (req, res) => {
    try {
        const { text, shift } = req.body;

        if (!text || typeof shift !== "number") {
            return res.status(400).json({ error: "Invalid input data" });
        }

        const encryptedText = encrypt(text, shift);
        res.status(200).json({
            original: text,
            shift,
            encryptedText
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const caesarDecrypt = (req, res) => {
    try {
        const { text, shift } = req.body;

        if (!text || typeof shift !== "number") {
            return res.status(400).json({ error: "Invalid input data" });
        }

        const decryptedText = decrypt(text, shift);
        res.status(200).json({
            encrypted: text,
            shift,
            decryptedText
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
