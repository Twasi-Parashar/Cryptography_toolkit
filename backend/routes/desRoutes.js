// routes/desRoutes.js
import express from "express";
import { encryptText, decryptText } from "../controllers/des/textController.js";

const router = express.Router();

router.post("/encrypt", encryptText);
router.post("/decrypt", decryptText);

export default router;
