import { puzzleData } from '../data/puzzleData';

interface LevelDetails {
    time: number;
    currentLevelIndex: number;
    hintsUsed: number;
}
export const generateScore = (levelDetails: LevelDetails) => {
    const levelScore = puzzleData[levelDetails.currentLevelIndex].points;
    if (levelScore === 0) return 0;
    const minusPoints =
        puzzleData[levelDetails.currentLevelIndex].points *
        0.1 *
        levelDetails.hintsUsed;
    const bonusPoints =
        (puzzleData[levelDetails.currentLevelIndex].timeLimit -
            levelDetails.time) *
        0.25;

    return levelScore - minusPoints + bonusPoints;
};
