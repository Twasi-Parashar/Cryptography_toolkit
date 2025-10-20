import { encrypt as playfairEncrypt, decrypt as playfairDecrypt } from '../../algorithms/playfairCipher.js';
import { uploadToCloudinary } from '../../config/cloudinaryConfig.js';
import { sendResponse } from '../../utils/responseHandler.js';
import fs from 'fs';
import fetch from 'node-fetch';
import multer from 'multer';

// File upload middleware
export const uploadFileMiddleware = multer({ storage: multer.diskStorage({}) }).single('file');

export const encryptFile = async (req, res) => {
    try {
        const key = req.body.key;
        if (!req.file || !key) return sendResponse(res, 400, 'File and key are required');

        const data = fs.readFileSync(req.file.path, 'utf-8');
        const encrypted = playfairEncrypt(data, key);

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
        const { fileUrl, key } = req.body;
        if (!fileUrl || !key) return sendResponse(res, 400, 'fileUrl and key are required');

        const response = await fetch(fileUrl);
        const data = await response.text();

        const decrypted = playfairDecrypt(data, key);
        return sendResponse(res, 200, 'File decrypted successfully', { decrypted });
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
};
