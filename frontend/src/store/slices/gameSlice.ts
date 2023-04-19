import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { puzzleData } from '../../data/puzzleData';

export interface GameState {
    currentLevelIndex: number;
    currentImagesOrder: number[];
    timer: number;
    levelScore: number[];
    timeIntervalId?: number;
}

const initialState: GameState = {
    currentLevelIndex: 0,
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
        gameOver: (state) => {
            clearInterval(state.timeIntervalId);
        },
        changeImageOrder(state, action) {
            const src = action.payload.srcIndex;
            const dest = action.payload.destIndex;

            const temp = state.currentImagesOrder[src];
            state.currentImagesOrder[src] = state.currentImagesOrder[dest];
            state.currentImagesOrder[dest] = temp;
        },
    },
});

export const { decrementTimer, gameOver, changeImageOrder } =
    counterSlice.actions;

export default counterSlice.reducer;
