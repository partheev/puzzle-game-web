import express from 'express';
import { UserModel } from '../models/User';
import { someThingWentWrong } from '../utils';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.find({ email, password });

        if (!user) {
            res.status(400);
            res.send({
                message: 'Invalid credentials',
            });
            return;
        }

        res.send({
            email,
            name: user.name,
        });
    } catch (err) {
        someThingWentWrong(res, err);
    }
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.find({ email });
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
            name,
            email,
            message: 'Registration completed',
        });
    } catch (err) {
        someThingWentWrong(res, err);
    }
});

const authRoutes = router;
