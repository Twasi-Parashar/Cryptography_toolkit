import express from 'express';
import { encryptText, decryptText } from '../controllers/affine/textController.js';
import { encryptFile, decryptFile, uploadFileMiddleware } from '../controllers/affine/fileController.js';

const router = express.Router();

// Affine Text
router.post('/text/encrypt', encryptText);
router.post('/text/decrypt', decryptText);

// Affine File
router.post('/file/encrypt', uploadFileMiddleware, encryptFile);
router.post('/file/decrypt', decryptFile);

export default router;
