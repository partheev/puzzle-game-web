import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authRoutes } from './routes/auth.js';
import { gameRoutes } from './routes/game.js';
import { connectDB } from './config.js';

dotenv.config();

await connectDB();

const app = express();

// CORS configuration
app.use(cors());
// JSON data parsing
app.use(express.json());
// Authentication routes
app.use('/api/auth', authRoutes);

// Game routes
app.use('/api/game', gameRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
});
