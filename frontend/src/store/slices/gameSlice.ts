import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { puzzleData } from '../../data/puzzleData';
import { generateScore } from '../../utils/generateScore';

export interface GameState {
    currentLevelIndex: number;
    currentImagesOrder: number[];
    timer: number;
    levelScore: number[];
    levelTimes: number[];
    attemptsLeft: number;
    isLastLevelFailed: boolean;
    isGameOver: boolean;
    isFailed: boolean;
    hintsUsed: number;
    isGameLoading: boolean;
    isGameSaving: boolean;
}

const initialState: GameState = {
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

export const counterSlice = createSlice({
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

            const totalScore = state.levelScore.reduce(
                (prev, curr) => prev + curr,
                0
            );
            if (totalScore < 200) state.isFailed = true;
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
                }
                if (state.currentLevelIndex === puzzleData.length - 1) {
                    state.isGameOver = true;
                } else {
                    state.hintsUsed = 0;
                    state.isLastLevelFailed = false;
                    state.attemptsLeft = 5;

                    const nextLevelIndex = state.currentLevelIndex + 1;
                    state.currentImagesOrder =
                        puzzleData[nextLevelIndex].initialImagesOrder;
                    state.currentLevelIndex = nextLevelIndex;
                    state.timer = puzzleData[nextLevelIndex].timeLimit;
                }
            }
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
    },
});

export const {
    updateLevelTime,
    unlockHint,
    startGameSaving,
    stopGameSaving,
    gameStart,
    nextLevel,
    startGameLoading,
    stopGameLoading,
    reduceAttempts,
    changeImageOrder,
} = counterSlice.actions;

export default counterSlice.reducer;
