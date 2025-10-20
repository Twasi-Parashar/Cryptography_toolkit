import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import affineRoutes from './routes/affineRoutes.js';
import playfairRoutes from './routes/playfairRoutes.js';
import caesarRoutes from "./routes/caesarRoutes.js";

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
app.use('/api/playfair', playfairRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});