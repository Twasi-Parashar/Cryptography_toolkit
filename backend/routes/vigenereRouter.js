// backend/routes/vigenereRouter.js
import express from 'express';
import { encryptText, decryptText } from '../controllers/vigenere/vigenereController.js';

const router = express.Router();

router.post('/encrypt', encryptText);
router.post('/decrypt', decryptText);

export default router;
