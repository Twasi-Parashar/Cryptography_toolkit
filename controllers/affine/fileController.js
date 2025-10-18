import { encrypt as affineEncrypt, decrypt as affineDecrypt } from '../../algorithms/affineCipher.js';
import { uploadToCloudinary } from '../../config/cloudinaryConfig.js';
import { sendResponse } from '../../utils/responseHandler.js';
import fs from 'fs';
// For Node 18+, you can remove node-fetch and use built-in fetch
// import fetch from 'node-fetch';
import multer from 'multer';

// --- ADD THIS: file upload middleware ---
const storage = multer.diskStorage({});
export const uploadFileMiddleware = multer({ storage }).single('file');
// --- END middleware ---

export const encryptFile = async (req, res) => {
    try {
        const a = parseInt(req.body.a);
        const b = parseInt(req.body.b);
        if (!req.file || a == undefined || b == undefined)
            return sendResponse(res, 400, 'File, a, and b are required');

        const data = fs.readFileSync(req.file.path, 'utf-8');
        const encrypted = affineEncrypt(data, a, b);

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
        const { fileUrl, a, b } = req.body;
        if (!fileUrl || a == undefined || b == undefined)
            return sendResponse(res, 400, 'fileUrl, a, and b are required');

        const response = await fetch(fileUrl);
        const data = await response.text();

        const decrypted = affineDecrypt(data, a, b);
        return sendResponse(res, 200, 'File decrypted successfully', { decrypted });
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
};
