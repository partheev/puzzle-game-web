import express from 'express';
import { UserModel } from '../models/User.js';
import { generateJWT, someThingWentWrong } from '../utils.js';
import { OnlineModel } from '../models/OnlineStatus.js';

const router = express.Router();

router.get('/user-details', async (req, res) => {
    const response = {
        user_id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        isAdmin: req.user.isAdmin,
    };

    const partialGame = await OnlineModel.findOne({ user_id: req.user._id });
    if (partialGame) {
        response.partialGame = partialGame;
    }

    res.send(response);
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email, password });

        if (!user) {
            res.status(400);
            res.send({
                message: 'Invalid credentials',
            });
            return;
        }

        if (user.password !== password) {
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
            res.status(400);
            res.send({
                message: 'User already exist',
            });
            return;
        }

        const newUser = new UserModel({ email, password, name });
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
