import express from 'express';
import { encryptText, decryptText } from '../controllers/caesar/textController.js';
import { encryptFile, decryptFile, uploadFileMiddleware } from '../controllers/caesar/fileController.js';

const router = express.Router();

// Caesar Text
router.post('/text/encrypt', encryptText);
router.post('/text/decrypt', decryptText);

// Caesar File
router.post('/file/encrypt', uploadFileMiddleware, encryptFile);
router.post('/file/decrypt', decryptFile);

export default router;
