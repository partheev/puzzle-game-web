import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    name: string;
    email: string;
    isLogin: boolean;
    user_id: string;
    isAdmin: boolean;
    isUserLoading: boolean;
    lastPlayedGames: { score: number; timeSpent: number; result: string }[];
}

let initialState: UserState = {
    lastPlayedGames: [],
    name: '',
    email: '',
    isLogin: false,
    user_id: '',
    isAdmin: false,
    isUserLoading: false,
};

const cachedUser = localStorage.getItem('user_details');
if (cachedUser) {
    const user = cachedUser ? JSON.parse(cachedUser) : null;
    initialState = {
        ...initialState,
        ...user,
    };
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loggedIn: (state, action) => {
            const userData = action.payload;
            state.name = userData.name;
            state.email = userData.email;
            state.isLogin = true;
            state.user_id = userData.user_id;
            state.isAdmin = userData.isAdmin;

            localStorage.setItem('access_key', userData.access_key);
            localStorage.setItem(
                'user_details',
                JSON.stringify({ ...userData, isLogin: true })
            );
        },
        logout: (state) => {
            localStorage.clear();
            state.isLogin = false;
        },
        startUserLoading(state) {
            state.isUserLoading = true;
        },
        stopUserLoading(state) {
            state.isUserLoading = false;
        },
        updateLastGames(state, action) {
            state.lastPlayedGames = action.payload.lastPlayedGames;
        },
    },
});

export const {
    updateLastGames,
    stopUserLoading,
    startUserLoading,
    loggedIn,
    logout,
} = counterSlice.actions;

export default counterSlice.reducer;
