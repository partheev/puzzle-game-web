import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
    name: string;
    email: string;
    isLogin: boolean;
    user_id: string;
    isAdmin: boolean;
    isUserLoading: boolean;
    partialGame: {
        currentLevel: number;
        imageOrder: number[];
        scores: any;
    } | null;
    lastPlayedGames: { score: number; timeSpent: number; result: string }[];
}

let initialState: UserState = {
    lastPlayedGames: [],
    partialGame: null,
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

export const userSlice = createSlice({
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
        updateUserDetails(state, action) {
            const userDetails = action.payload.userDetails;
            state.partialGame = userDetails.partialGame || null;
            state.lastPlayedGames = userDetails.lastPlayedGames;
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
    updateUserDetails,
    updateLastGames,
    stopUserLoading,
    startUserLoading,
    loggedIn,
    logout,
} = userSlice.actions;

export default userSlice.reducer;
