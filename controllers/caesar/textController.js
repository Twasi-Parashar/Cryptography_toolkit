import { encrypt as caesarEncrypt, decrypt as caesarDecrypt } from '../../algorithms/caesarCipher.js';
import { sendResponse } from '../../utils/responseHandler.js';

export const encryptText = (req, res) => {
    try {
        const { text, shift } = req.body;
        if (!text || shift == undefined) return sendResponse(res, 400, 'text and shift are required');

        const encrypted = caesarEncrypt(text, parseInt(shift));
        return sendResponse(res, 200, 'Encrypted successfully', { encrypted });
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
};

export const decryptText = (req, res) => {
    try {
        const { text, shift } = req.body;
        if (!text || shift == undefined) return sendResponse(res, 400, 'text and shift are required');

        const decrypted = caesarDecrypt(text, parseInt(shift));
        return sendResponse(res, 200, 'Decrypted successfully', { decrypted });
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
};
