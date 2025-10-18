import { encrypt as affineEncrypt, decrypt as affineDecrypt } from '../../algorithms/affineCipher.js';
import { sendResponse } from '../../utils/responseHandler.js';

export const encryptText = (req, res) => {
    try {
        const { text, a, b } = req.body;
        if (!text || a == undefined || b == undefined) return sendResponse(res, 400, 'text, a, and b are required');

        const encrypted = affineEncrypt(text, parseInt(a), parseInt(b));
        return sendResponse(res, 200, 'Encrypted successfully', { encrypted });
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
};

export const decryptText = (req, res) => {
    try {
        const { text, a, b } = req.body;
        if (!text || a == undefined || b == undefined) return sendResponse(res, 400, 'text, a, and b are required');

        const decrypted = affineDecrypt(text, parseInt(a), parseInt(b));
        return sendResponse(res, 200, 'Decrypted successfully', { decrypted });
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
};
