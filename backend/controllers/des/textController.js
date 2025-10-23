import { encryptDES, decryptDES } from "../../algorithms/desCipher.js";

export const encryptText = (req, res) => {
    try {
        const { text, key } = req.body;
        if (!text || !key) {
            return res.status(400).json({ error: "Text and key are required" });
        }

        const result = encryptDES(text, key);
        res.json({ result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const decryptText = (req, res) => {
    try {
        const { text, key } = req.body;
        if (!text || !key) {
            return res.status(400).json({ error: "Text and key are required" });
        }

        const result = decryptDES(text, key);
        res.json({ result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
