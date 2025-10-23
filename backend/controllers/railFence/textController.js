// backend/controllers/railFenceController.js
import { encrypt, decrypt } from '../../algorithms/railFenceCipher.js';

export const encryptText = (req, res) => {
    try {
        const { text, key } = req.body;
        if (!text || !key) {
            return res.status(400).json({ error: 'Text and key are required' });
        }
        const keyNum = Number(key);
        if (isNaN(keyNum) || keyNum < 2) {
            return res.status(400).json({ error: 'Key must be a number greater than 1' });
        }
        const result = encrypt(text, keyNum);
        res.json({ result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const decryptText = (req, res) => {
    try {
        const { text, key } = req.body;
        if (!text || !key) {
            return res.status(400).json({ error: 'Text and key are required' });
        }
        const keyNum = Number(key);
        if (isNaN(keyNum) || keyNum < 2) {
            return res.status(400).json({ error: 'Key must be a number greater than 1' });
        }
        const result = decrypt(text, keyNum);
        res.json({ result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
