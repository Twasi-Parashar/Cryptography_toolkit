// backend/controllers/columnarController.js
import { encrypt, decrypt } from '../../algorithms/columnarTranspositionCipher.js';

export const encryptColumnar = (req, res) => {
    try {
        const { text, key } = req.body;
        if (!text || !key) {
            return res.status(400).json({ error: 'Text and key are required' });
        }
        const result = encrypt(text, key);
        res.json({ result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const decryptColumnar = (req, res) => {
    try {
        const { text, key } = req.body;
        if (!text || !key) {
            return res.status(400).json({ error: 'Text and key are required' });
        }
        const result = decrypt(text, key);
        res.json({ result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
