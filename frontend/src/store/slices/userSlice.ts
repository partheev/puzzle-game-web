import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    name: string;
    email: string;
    isLogin: boolean;
    user_id: string;
    isAdmin: boolean;
}

const initialState: UserState = {
    name: '',
    email: '',
    isLogin: false,
    user_id: '',
    isAdmin: false,
};

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
        },
        logout: (state) => {
            state.isLogin = false;
        },
    },
});

export const { loggedIn, logout } = counterSlice.actions;

export default counterSlice.reducer;
