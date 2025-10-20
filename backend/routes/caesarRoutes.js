// backend/routes/caesarRoutes.js
import express from "express";
import { caesarEncrypt, caesarDecrypt } from "../controllers/caesar/textController.js";

const router = express.Router();

// Route for encryption
router.post("/text/encrypt", caesarEncrypt);

// Route for decryption
router.post("/text/decrypt", caesarDecrypt);

export default router;
