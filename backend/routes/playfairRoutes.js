import express from 'express';
import { encryptText, decryptText } from '../controllers/playfair/textController.js';
import { encryptFile, decryptFile, uploadFileMiddleware } from '../controllers/playfair/fileController.js';

const router = express.Router();

// Playfair Text
router.post('/text/encrypt', encryptText);
router.post('/text/decrypt', decryptText);

// Playfair File
router.post('/file/encrypt', uploadFileMiddleware, encryptFile);
router.post('/file/decrypt', decryptFile);

export default router;
