import express from 'express';
import { UserModel } from '../models/User.js';
import {
    compareHashedPassword,
    generateJWT,
    hashPassword,
    someThingWentWrong,
} from '../utils.js';
import { OnlineModel } from '../models/OnlineStatus.js';
import { allowAdminUser, validateAuth } from '../middlewares/validateAuth.js';
import { GameModel } from '../models/Game.js';
import { HTTP_CODES } from '../constants/httpCodes.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            res.status(400);
            res.send({
                message: 'Invalid credentials',
            });
            return;
        }
        const isValidPassword = await compareHashedPassword(
            password,
            user.password
        );
        if (!isValidPassword) {
            res.status(400);
            res.send({
                message: 'Invalid credentials',
            });
            return;
        }
        const token = generateJWT(user.email);
        const response = {
            access_key: token,
            user_id: user._id,
            email,
            name: user.name,
            isAdmin: user.isAdmin,
        };

        const partialGame = await OnlineModel.findOne({ user_id: user._id });
        if (partialGame) {
            response.partialGame = partialGame;
        }

        res.send(response);
    } catch (err) {
        someThingWentWrong(res, err);
    }
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(HTTP_CODES.BAD_REQUEST);
            res.send({
                message: 'User already exist',
            });
            return;
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new UserModel({
            email,
            password: hashedPassword,
            name,
        });
        await newUser.save();

        const token = generateJWT(email);

        res.send({
            access_key: token,
            user_id: newUser._id,
            name,
            email,
            message: 'Registration completed',
        });
    } catch (err) {
        someThingWentWrong(res, err);
    }
});

export const authRoutes = router;
