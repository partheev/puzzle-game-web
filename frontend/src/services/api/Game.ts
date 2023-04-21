import { Axios } from './Axios';
import { ENDPOINTS } from './endpoints';

const updateGameProgress = async ({
    time,
    score,
    level,
}: {
    time: number;
    score: number;
    level: number;
}) => {
    const res = await Axios.post(ENDPOINTS.GAME.UPDATE_PROGRESS, {
        time,
        score,
        level,
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
export const GameAPI = {
    lastPlayedGames,
    updateGameProgress,
    saveGameResult,
};
