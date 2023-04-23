import { createSlice } from '@reduxjs/toolkit';

export interface AdminState {
    attemptsPassed: number;
    attemptsFailed: number;
    avgGameDetails: {
        level: number;
        details: {
            avgScore: number;
            avgTime: number;
        };
    }[];
    totalAttempts: number;
    totalUsersPlayed: number;
    registeredUser: number;
    isAdminDataLoading: boolean;
}

let initialState: AdminState = {
    avgGameDetails: [],
    isAdminDataLoading: false,
    attemptsFailed: 0,
    attemptsPassed: 0,
    totalAttempts: 0,
    totalUsersPlayed: 0,
    registeredUser: 0,
};

export const adminSlice = createSlice({
    name: 'adminUser',
    initialState,
    reducers: {
        updateAdminData: (state, action) => {
            const adminData = action.payload.adminData as AdminState;
            state.attemptsFailed = adminData.attemptsFailed;
            state.attemptsPassed = adminData.attemptsPassed;
            state.avgGameDetails = adminData.avgGameDetails;
            state.registeredUser = adminData.registeredUser;
            state.totalUsersPlayed = adminData.totalUsersPlayed;
            state.totalAttempts = adminData.totalAttempts;
        },

        startAdminLoading(state) {
            state.isAdminDataLoading = true;
        },
        stopAdminLoading(state) {
            state.isAdminDataLoading = false;
        },
    },
});

export const { updateAdminData, startAdminLoading, stopAdminLoading } =
    adminSlice.actions;

export default adminSlice.reducer;
