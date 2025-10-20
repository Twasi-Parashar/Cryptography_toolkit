// backend/controllers/affine/textController.js
import { encrypt as affineEncrypt, decrypt as affineDecrypt } from "../../algorithms/affineCipher.js";

// Encrypt text endpoint
export const encryptText = (req, res) => {
    try {
        const { text, a, b } = req.body;

        // Input validation
        if (!text || a === undefined || b === undefined) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: text, a, and b are required"
            });
        }

        if (typeof text !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Text must be a string"
            });
        }

        const aNum = parseInt(a);
        const bNum = parseInt(b);

        if (isNaN(aNum) || isNaN(bNum)) {
            return res.status(400).json({
                success: false,
                message: "Parameters a and b must be valid numbers"
            });
        }

        // Perform encryption
        const result = affineEncrypt(text, aNum, bNum);

        return res.status(200).json({
            success: true,
            original: text,
            parameters: { a: aNum, b: bNum },
            result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Decrypt text endpoint
export const decryptText = (req, res) => {
    try {
        const { text, a, b } = req.body;

        // Input validation
        if (!text || a === undefined || b === undefined) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: text, a, and b are required"
            });
        }

        if (typeof text !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Text must be a string"
            });
        }

        const aNum = parseInt(a);
        const bNum = parseInt(b);

        if (isNaN(aNum) || isNaN(bNum)) {
            return res.status(400).json({
                success: false,
                message: "Parameters a and b must be valid numbers"
            });
        }

        // Perform decryption
        const result = affineDecrypt(text, aNum, bNum);

        return res.status(200).json({
            success: true,
            encrypted: text,
            parameters: { a: aNum, b: bNum },
            result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};