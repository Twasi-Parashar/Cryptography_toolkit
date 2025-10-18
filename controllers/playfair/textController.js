import { encrypt as playfairEncrypt, decrypt as playfairDecrypt } from '../../algorithms/playfairCipher.js';
import { sendResponse } from '../../utils/responseHandler.js';

export const encryptText = (req, res) => {
    try {
        const { text, key } = req.body;
        if (!text || !key) return sendResponse(res, 400, 'text and key are required');

        const encrypted = playfairEncrypt(text, key);
        return sendResponse(res, 200, 'Encrypted successfully', { encrypted });
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
};

export const decryptText = (req, res) => {
    try {
        const { text, key } = req.body;
        if (!text || !key) return sendResponse(res, 400, 'text and key are required');

        const decrypted = playfairDecrypt(text, key);
        return sendResponse(res, 200, 'Decrypted successfully', { decrypted });
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
};
