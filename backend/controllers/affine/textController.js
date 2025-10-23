// backend/controllers/affine/textController.js
import { encrypt as affineEncrypt, decrypt as affineDecrypt } from "../../algorithms/affineCipher.js";

// Encrypt text endpoint
export const encryptText = (req, res) => {
    try {
        const { text, a, b } = req.body;

        // Input validation - CHANGED to use 'error' for consistency
        if (!text || a === undefined || b === undefined) {
            return res.status(400).json({ error: "Missing required fields: text, a, and b" });
        }

        const aNum = parseInt(a);
        const bNum = parseInt(b);

        if (isNaN(aNum) || isNaN(bNum)) {
            return res.status(400).json({ error: "Parameters a and b must be valid numbers" });
        }

        const encryptedText = affineEncrypt(text, aNum, bNum);
        res.status(200).json({ result: encryptedText });
    } catch (error) {
        res.status(500).json({ error: "Error in processing." }); // CHANGED to 'error'
    }
};

// Decrypt text endpoint
export const decryptText = (req, res) => {
    try {
        const { text, a, b } = req.body;

        // Input validation - CHANGED to use 'error' for consistency
        if (!text || a === undefined || b === undefined) {
            return res.status(400).json({ error: "Missing required fields: text, a, and b" });
        }

        const aNum = parseInt(a);
        const bNum = parseInt(b);

        if (isNaN(aNum) || isNaN(bNum)) {
            return res.status(400).json({ error: "Parameters a and b must be valid numbers" });
        }

        const decryptedText = affineDecrypt(text, aNum, bNum);
        res.status(200).json({ result: decryptedText });
    } catch (error) {
        res.status(500).json({ error: "Error in processing." }); // CHANGED to 'error'
    }
};