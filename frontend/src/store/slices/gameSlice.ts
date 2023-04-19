import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { puzzleData } from '../../data/puzzleData';

export interface GameState {
    currentLevelIndex: number;
    currentImagesOrder: number[];
    timer: number;
    levelScore: number[];
    attemptsLeft: number;
    isLastLevelFailed: boolean;
    isGameOver: boolean;
    isFailed: boolean;
    hintsUsed: number;
}

const initialState: GameState = {
    hintsUsed: 0,
    isGameOver: false,
    isFailed: false,
    currentLevelIndex: 0,
    attemptsLeft: 5,
    isLastLevelFailed: false,
    currentImagesOrder: puzzleData[0].initialImagesOrder,
    timer: puzzleData[0].timeLimit,
    levelScore: Array.from(new Array(puzzleData.length)).map(() => 0),
};

export const counterSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
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

            if (failed && state.isLastLevelFailed === true) {
                state.isGameOver = true;
                state.isFailed = true;
            } else {
                // Level Passed
                if (!failed)
                    state.levelScore[state.currentLevelIndex] =
                        puzzleData[state.currentLevelIndex].points;
                if (state.currentLevelIndex === puzzleData.length - 1) {
                    state.isGameOver = true;
                } else {
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
        reduceAttempts(state) {
            state.attemptsLeft = state.attemptsLeft - 1;
        },
        unlockHint(state) {
            state.hintsUsed += 1;
        },
    },
});

export const { nextLevel, reduceAttempts, decrementTimer, changeImageOrder } =
    counterSlice.actions;

export default counterSlice.reducer;
