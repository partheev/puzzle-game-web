import express from 'express';
import { OnlineModel } from '../models/OnlineStatus.js';
import { someThingWentWrong } from '../utils.js';
import { GameModel } from '../models/Game.js';
import { validateAuth } from '../middlewares/validateAuth.js';

const router = express.Router();

const RESULT_PASS = 'Pass';
const RESULT_FAIL = 'Fail';

router.post('/save-partial-result', async (req, res) => {
    try {
        const { level, score, time } = req.body;
        const partialResult = await OnlineModel.findOne({
            user_id: req.user._id,
        });
        if (!partialResult) {
            const scores = new Map();

            scores.set(String(level), {
                score,
                time,
            });
            const newPartialResult = new OnlineModel({
                currentLevel: level,
                scores,
                user_id: req.user._id,
            });

            await newPartialResult.save();
            res.send({
                message: 'Partial result saved',
            });
            return;
        }
        partialResult.currentLevel = level;
        partialResult.scores.set(String(level), {
            score,
            time,
        });
        await partialResult.save();

        res.send({
            message: 'Partial result saved',
        });
    } catch (err) {
        someThingWentWrong(res, err);
    }
});

router.post('/save-result', async (req, res) => {
    try {
        const { gameScores, isPassed } = req.body;

        await OnlineModel.findOneAndDelete({ user_id: req.user._id });

        const game = new GameModel({
            gameScores,
            isPassed,
            user_id: req.user._id,
        });

        await game.save();

        res.send({
            message: 'Game result saved.',
        });
    } catch (err) {
        someThingWentWrong(res, err);
    }
});

router.post('/last-played-games', validateAuth, async (req, res) => {
    try {
        const games = await GameModel.find({ user_id: req.user._id });

        const response = games.map((game) => {
            const totalScore = game.gameScores.reduce(
                (prev, curr) => prev + curr.score,
                0
            );
            const totalTime = game.gameScores.reduce(
                (prev, curr) => prev + curr.time,
                0
            );

            const result = totalScore >= 200 ? RESULT_PASS : RESULT_FAIL;

            return {
                score: totalScore,
                timeSpent: totalTime,
                result,
            };
        });

        res.send(response);
    } catch (err) {
        someThingWentWrong(res, err);
    }
});
export const gameRoutes = router;
