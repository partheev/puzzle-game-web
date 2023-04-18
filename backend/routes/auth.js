import express from 'express';
import { UserModel } from '../models/User.js';
import { someThingWentWrong } from '../utils.js';

const router = express.Router();

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

        res.send({
            user_id: user._id,
            email,
            name: user.name,
            isAdmin: user.isAdmin,
        });
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

        res.send({
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
