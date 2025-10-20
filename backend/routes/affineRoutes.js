// backend/routes/affineRoutes.js
import express from 'express';
import { encryptText, decryptText } from '../controllers/affine/textController.js';

const router = express.Router();

// Text encryption/decryption endpoints
router.post('/text/encrypt', encryptText);
router.post('/text/decrypt', decryptText);

export default router;