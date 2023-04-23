import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { puzzleData } from '../../data/puzzleData';
import { generateScore } from '../../utils/generateScore';
import { LeaderBoard } from '../../types/types';

export interface GameState {
    currentLevelIndex: number;
    currentImagesOrder: number[];
    timer: number;
    levelScore: number[];
    leadershipBoard: LeaderBoard;
    levelTimes: number[];
    attemptsLeft: number;
    isLastLevelFailed: boolean;
    isGameOver: boolean;
    isFailed: boolean;
    hintsUsed: number;
    isGameLoading: boolean;
    isGameSaving: boolean;
    isResumeGamePopUpOpen: boolean;
}

const initialState: GameState = {
    leadershipBoard: {
        leaderboard: [],
        user_position: null,
    },
    isResumeGamePopUpOpen: false,
    isGameLoading: false,
    hintsUsed: 0,
    isGameSaving: false,
    isGameOver: false,
    isFailed: false,
    currentLevelIndex: 0,
    attemptsLeft: 5,
    isLastLevelFailed: false,
    currentImagesOrder: puzzleData[0].initialImagesOrder,
    timer: puzzleData[0].timeLimit,
    levelScore: Array.from(new Array(puzzleData.length)).map(() => 0),
    levelTimes: Array.from(new Array(puzzleData.length)).map(() => 0),
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        gameStart(state) {
            state.hintsUsed = 0;
            state.isGameOver = false;
            state.isFailed = false;
            state.currentLevelIndex = 0;
            state.attemptsLeft = 5;
            state.isLastLevelFailed = false;
            state.currentImagesOrder = puzzleData[0].initialImagesOrder;
            state.timer = puzzleData[0].timeLimit;
            state.levelScore = Array.from(new Array(puzzleData.length)).map(
                () => 0
            );
        },
        decrementTimer: (state) => {
            state.timer = state.timer - 1;
        },

        changeImageOrder(state, action) {
            const src = action.payload.srcIndex;
            const dest = action.payload.destIndex;

            const temp = state.currentImagesOrder[src];
            state.currentImagesOrder[src] = state.currentImagesOrder[dest];
            state.currentImagesOrder[dest] = temp;
        },

        nextLevel(state, action) {
            const failed = action.payload.failed;
            console.log('failed', failed);
            const totalScore = state.levelScore.reduce(
                (prev, curr) => prev + curr,
                0
            );
            if (totalScore < 300) state.isFailed = true;
            else state.isFailed = false;

            if (failed && state.isLastLevelFailed === true) {
                state.isGameOver = true;
            } else {
                // Level Passed
                if (!failed) {
                    state.levelScore[state.currentLevelIndex] = generateScore({
                        time: state.timer,
                        currentLevelIndex: state.currentLevelIndex,
                        hintsUsed: state.hintsUsed,
                    });
                } else {
                    state.isLastLevelFailed = true;
                }

                //Game over
                if (state.currentLevelIndex === puzzleData.length - 1) {
                    state.isGameOver = true;
                }
                //Game still on
                else {
                    state.hintsUsed = 0;
                    state.attemptsLeft = 5;

                    const nextLevelIndex = state.currentLevelIndex + 1;
                    state.currentImagesOrder =
                        puzzleData[nextLevelIndex].initialImagesOrder;
                    state.currentLevelIndex = nextLevelIndex;
                    state.timer = puzzleData[nextLevelIndex].timeLimit;
                }
            }
        },
        updatePartialGame(state, action) {
            const partialGame = action.payload.partialGame as {
                currentLevel: number;

                imageOrder: number[];
                hintsUsed: number;
                scores: {
                    [key: number]: {
                        score: number;
                        time: number;
                    };
                };
            };
            state.currentLevelIndex = partialGame.currentLevel;
            state.currentImagesOrder = partialGame.imageOrder;
            const levelScores: number[] = [];
            const levelTimes: number[] = [];
            Object.entries(partialGame.scores).map((game) => {
                levelScores.push(game[1].score);
                levelTimes.push(game[1].time);
            });
            state.timer = partialGame.scores[partialGame.currentLevel].time;
            state.hintsUsed = partialGame.hintsUsed;
            state.levelScore = levelScores;
            state.levelTimes = levelTimes;
        },
        updateLeadershipBoard(state, action) {
            state.leadershipBoard = action.payload;
        },
        updateLevelTime(state, action) {
            state.levelTimes[state.currentLevelIndex] = action.payload.time;
        },
        reduceAttempts(state) {
            state.attemptsLeft = state.attemptsLeft - 1;
        },
        unlockHint(state) {
            state.hintsUsed += 1;
        },
        startGameLoading(state) {
            state.isGameLoading = true;
        },
        stopGameLoading(state) {
            state.isGameLoading = false;
        },
        startGameSaving(state) {
            state.isGameSaving = true;
        },
        stopGameSaving(state) {
            state.isGameSaving = false;
        },
        showResumeGamePopup(state, action) {
            state.isResumeGamePopUpOpen = action.payload;
        },
    },
});

export const {
    updateLeadershipBoard,
    updatePartialGame,
    updateLevelTime,
    unlockHint,
    startGameSaving,
    stopGameSaving,
    gameStart,
    nextLevel,
    startGameLoading,
    stopGameLoading,
    reduceAttempts,
    showResumeGamePopup,
    changeImageOrder,
} = gameSlice.actions;

export default gameSlice.reducer;
