import express from 'express';
import { OnlineModel } from '../models/OnlineStatus.js';
import { someThingWentWrong } from '../utils.js';
import { GameModel } from '../models/Game.js';
import { validateAuth } from '../middlewares/validateAuth.js';

const router = express.Router();

router.post('/save-partial-result', async (req, res) => {
    try {
        const { level, score, time, timeLeft, imageOrder, hintsUsed } =
            req.body;
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
                timeLeft,
                imageOrder,
                hintsUsed,
                user_id: req.user._id,
            });

            await newPartialResult.save();
            res.send({
                message: 'Partial result saved',
            });
            return;
        }
        partialResult.hintsUsed = hintsUsed;
        partialResult.timeLeft = timeLeft;
        partialResult.currentLevel = level;
        partialResult.scores.set(String(level), {
            score,
            time,
        });
        partialResult.imageOrder = imageOrder;
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

        const totalScore = gameScores.reduce(
            (prev, curr) => prev + curr.score,
            0
        );
        const totalTime = gameScores.reduce(
            (prev, curr) => prev + curr.time,
            0
        );
        const game = new GameModel({
            gameScores,
            isPassed,
            totalScore,
            totalTime,
            user_id: req.user._id,
        });

        await game.save();

        res.send({
            ...game,
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

router.get('/leaderboard', validateAuth, async (req, res) => {
    try {
        let leaderboardRes = await GameModel.find(
            { isPassed: true },
            {},
            {
                sort: {
                    totalScore: -1,
                },
            }
        ).populate('user_id');
        let leaderboard = [];
        leaderboardRes
            .filter((_, idx) => idx < 10)
            .forEach((game) => {
                const result = {
                    user_id: game.user_id._id,
                    username: game.user_id.name,
                    score: game.totalScore,
                    time: game.totalTime,
                };
                leaderboard.push(result);
            });
        let rank = null;
        for (let i = 0; i < leaderboard.length; i++) {
            if (String(leaderboard[i].user_id) === String(req.user._id)) {
                rank = i + 1;
                break;
            }
        }
        let user_position = null;
        if (rank !== null) {
            user_position = { ...leaderboard[rank - 1], rank };
        }

        res.send({
            leaderboard,
            user_position,
        });
    } catch (err) {
        someThingWentWrong(res, err);
    }
});
export const gameRoutes = router;
