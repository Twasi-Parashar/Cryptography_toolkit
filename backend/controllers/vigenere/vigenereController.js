// backend/controllers/vigenereController.js
import { encrypt as vigenereEncrypt, decrypt as vigenereDecrypt } from '../../algorithms/vigenereCipher.js';

// Encrypt endpoint
export const encryptText = (req, res) => {
    const { text, key } = req.body;

    if (!text || !key) {
        return res.status(400).json({ error: 'Text and key are required.' });
    }

    try {
        const result = vigenereEncrypt(text, key);
        res.json({ result });
    } catch (err) {
        res.status(500).json({ error: 'Encryption failed.' });
    }
};

// Decrypt endpoint
export const decryptText = (req, res) => {
    const { text, key } = req.body;

    if (!text || !key) {
        return res.status(400).json({ error: 'Text and key are required.' });
    }

    try {
        const result = vigenereDecrypt(text, key);
        res.json({ result });
    } catch (err) {
        res.status(500).json({ error: 'Decryption failed.' });
    }
};
