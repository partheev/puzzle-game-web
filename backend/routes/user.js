import express from 'express';
import { allowAdminUser, validateAuth } from '../middlewares/validateAuth.js';
import { GameModel } from '../models/Game.js';
import { OnlineModel } from '../models/OnlineStatus.js';
import { someThingWentWrong } from '../utils.js';
import { UserModel } from '../models/User.js';
import { RESULT_FAIL, RESULT_PASS } from '../constants/game.js';

const router = express.Router();

router.get('/user-details', validateAuth, async (req, res) => {
    const response = {
        user_id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        isAdmin: req.user.isAdmin,
    };

    const [games, partialGame] = await Promise.all([
        GameModel.find({ user_id: req.user._id }),
        OnlineModel.findOne({ user_id: req.user._id }),
    ]);

    if (partialGame) {
        response.partialGame = partialGame;
    }

    const lastPlayedGames = games.map((game) => {
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

    response.lastPlayedGames = lastPlayedGames;

    res.send(response);
});

router.get('/admin-data', validateAuth, allowAdminUser, async (req, res) => {
    try {
        const [gamesData, users] = await Promise.all([
            GameModel.find({}),
            UserModel.find({ isAdmin: false }),
        ]);

        const totalAttempts = gamesData.length;
        const totalUsersPlayed = (() => {
            const tempUsers = [];

            gamesData.forEach((game) => {
                if (tempUsers.includes(game.user_id)) return;
                tempUsers.push(game.user_id);
            });

            return tempUsers.length;
        })();

        const avgGameDetails = (() => {
            const data = [];
            for (
                let i = 0;
                i <
                (gamesData.length > 0
                    ? gamesData[gamesData.length - 1].gameScores.length
                    : 0);
                i++
            ) {
                let totalTime = 0;
                let totalScore = 0;
                gamesData.forEach((game) => {
                    totalTime += game.gameScores[i]
                        ? game.gameScores[i].time
                        : 0;
                    totalScore += game.gameScores[i]
                        ? game.gameScores[i].score
                        : 0;
                });
                const totalLevels = gamesData[0].gameScores.length;
                const details = {
                    avgScore: totalScore / totalLevels,
                    avgTime: totalTime / totalLevels,
                };
                const levelVsDetails = {
                    level: i,
                    details,
                };
                data.push(levelVsDetails);
            }
            return data;
        })();

        let attemptsFailed = 0;
        let attemptsPassed = 0;
        gamesData.forEach((game) => {
            if (game.isPassed) attemptsPassed++;
            else attemptsFailed++;
        });

        const response = {
            attemptsPassed,
            attemptsFailed,
            avgGameDetails,
            totalAttempts,
            totalUsersPlayed,
            registeredUser: users.length,
        };

        res.send(response);
    } catch (err) {
        someThingWentWrong(res, err);
    }
});

export const userRoutes = router;
