import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authRoutes } from './routes/auth.js';
import { gameRoutes } from './routes/game.js';
import { connectDB } from './config.js';
import { validateAuth } from './middlewares/validateAuth.js';
import { userRoutes } from './routes/user.js';
import { HTTP_CODES } from './constants/httpCodes.js';
import { errorHandle } from './middlewares/errorHandle.js';
dotenv.config({
    path: '.env',
});

await connectDB();

const app = express();

// CORS configuration
app.use(cors());
// JSON data parsing
app.use(express.json());

//HEALTH CHECKING
app.get('/health', (req, res) => {
    res.send({
        message: 'Health is Good',
    });
});
app.get('/', (req, res) => {
    res.send({
        message: 'API is working. use /api/[routes] to access the services',
    });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// User routes
app.use('/api/user', userRoutes);

// Game routes
app.use('/api/game', validateAuth, gameRoutes);

app.all('*', (req, res) => {
    res.status(HTTP_CODES.NOT_FOUND);
    res.send({
        message: 'Invalid path',
    });
});

app.use(errorHandle);
app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
});

export default app;
