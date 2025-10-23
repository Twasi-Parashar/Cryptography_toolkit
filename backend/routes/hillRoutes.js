// backend/routes/hillRoutes.js

import express from "express";
import { encryptText, decryptText } from "../controllers/hill/textController.js";

const router = express.Router();

// POST /api/hill/encrypt
router.post("/encrypt", encryptText);

// POST /api/hill/decrypt
router.post("/decrypt", decryptText);

export default router;
