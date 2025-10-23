// backend/routes/columnarRoutes.js
import express from 'express';
import { encryptColumnar, decryptColumnar } from '../controllers/columnarTransposition/textController.js';

const router = express.Router();

// Routes for encryption and decryption
router.post('/encrypt', encryptColumnar);
router.post('/decrypt', decryptColumnar);

export default router;
