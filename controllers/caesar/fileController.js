import { encrypt as caesarEncrypt, decrypt as caesarDecrypt } from '../../algorithms/caesarCipher.js';
import { uploadToCloudinary } from '../../config/cloudinaryConfig.js';
import { sendResponse } from '../../utils/responseHandler.js';
import fs from 'fs';

import multer from 'multer';

// File upload middleware (already exported inline)
export const uploadFileMiddleware = multer({ storage: multer.diskStorage({}) }).single('file');

export const encryptFile = async (req, res) => {
    try {
        const shift = parseInt(req.body.shift);
        if (!req.file || shift == undefined)
            return sendResponse(res, 400, 'File and shift are required');

        const data = fs.readFileSync(req.file.path, 'utf-8');
        const encrypted = caesarEncrypt(data, shift);

        fs.writeFileSync('encrypted.txt', encrypted);
        const result = await uploadToCloudinary('encrypted.txt', 'raw');
        fs.unlinkSync('encrypted.txt');

        return sendResponse(res, 200, 'File encrypted successfully', { url: result.secure_url });
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
};

export const decryptFile = async (req, res) => {
    try {
        const { fileUrl, shift } = req.body;
        if (!fileUrl || shift == undefined)
            return sendResponse(res, 400, 'fileUrl and shift are required');

        const response = await fetch(fileUrl);
        const data = await response.text();

        const decrypted = caesarDecrypt(data, parseInt(shift));
        return sendResponse(res, 200, 'File decrypted successfully', { decrypted });
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
};
