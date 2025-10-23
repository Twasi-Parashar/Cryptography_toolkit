import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import affineRoutes from './routes/affineRoutes.js';
import caesarRoutes from "./routes/caesarRoutes.js";
import playfairRoutes from "./routes/playfairRoutes.js";
import hillRoutes from "./routes/hillRoutes.js";
import vigenereRouter from './routes/vigenereRouter.js';
import railFenceRoutes from './routes/railFenceRoutes.js';
import columnarRoutes from "./routes/columnarTranspositionRoutes.js";
import desRoutes from "./routes/desRoutes.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/affine', affineRoutes);
app.use("/api/caesar", caesarRoutes);
app.use("/api/playfair", playfairRoutes);
app.use("/api/hill", hillRoutes);
app.use('/api/vigenere', vigenereRouter);
app.use('/api/railfence', railFenceRoutes);
app.use("/api/columnar", columnarRoutes);
app.use("/api/des", desRoutes);





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});