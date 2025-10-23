// backend/routes/railFenceRoutes.js
import express from 'express';
import { encryptText, decryptText } from '../controllers/railFence/textController.js';

const router = express.Router();

// POST /api/railfence/encrypt
router.post('/encrypt', encryptText);

// POST /api/railfence/decrypt
router.post('/decrypt', decryptText);

export default router;
