import { LeaderBoard } from '../../types/types';
import { Axios } from './Axios';
import { ENDPOINTS } from './endpoints';

const updateGameProgress = async ({
    time,
    score,
    level,
    timeLeft,
    imageOrder,
    hintsUsed,
}: {
    time: number;
    score: number;
    timeLeft: number;
    level: number;
    imageOrder: number[];
    hintsUsed: number;
}) => {
    const res = await Axios.post(ENDPOINTS.GAME.UPDATE_PROGRESS, {
        time,
        score,
        timeLeft,
        level,
        imageOrder,
        hintsUsed,
    });

    return res.data;
};
const saveGameResult = async ({
    gameScores,
    isPassed,
}: {
    gameScores: { time: number; score: number }[];
    isPassed: boolean;
}) => {
    const res = await Axios.post(ENDPOINTS.GAME.SAVE_RESULT, {
        gameScores,
        isPassed,
    });

    return res.data;
};
const lastPlayedGames = async () => {
    const res = await Axios.post(ENDPOINTS.GAME.LAST_PLAYED_GAMES);
    return res.data;
};

const getLeaderboard = async (): Promise<LeaderBoard> => {
    const res = await Axios.get(ENDPOINTS.GAME.LEADERBOARD);
    return res.data;
};
export const GameAPI = {
    getLeaderboard,
    lastPlayedGames,
    updateGameProgress,
    saveGameResult,
};
