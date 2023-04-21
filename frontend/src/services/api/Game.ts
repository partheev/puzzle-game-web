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

export const GameAPI = {
    updateGameProgress,
};
