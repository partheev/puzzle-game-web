import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Backdrop, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { GameAPI } from './services/api/Game';
import {
    startUserLoading,
    stopUserLoading,
    updateLastGames,
    updateUserDetails,
} from './store/slices/userSlice';
import { UserAPI } from './services/api/User';
import {
    startAdminLoading,
    stopAdminLoading,
    updateAdminData,
} from './store/slices/adminSlice';
import {
    showResumeGamePopup,
    updateLeadershipBoard,
    updatePartialGame,
} from './store/slices/gameSlice';
import { ResumeGame } from './components/Popups/ResumeGame';

function App() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isLogin, isAdmin, isUserLoading, partialGame } = useAppSelector(
        (state) => state.user
    );
    const { isResumeGamePopUpOpen } = useAppSelector((state) => state.game);

    const fetchUserDetails = async () => {
        try {
            dispatch(startUserLoading());
            const userDetails = await UserAPI.getUserDetails();
            dispatch(updateUserDetails({ userDetails }));
            dispatch(stopUserLoading());
            if (userDetails.partialGame) {
                dispatch(
                    updatePartialGame({ partialGame: userDetails.partialGame })
                );
                dispatch(showResumeGamePopup(true));
            }
        } catch (err) {
            dispatch(stopUserLoading());
        }
    };

    const fetchLastPlayedGames = async () => {
        try {
            dispatch(startUserLoading());
            const lastPlayedGamesRes = await GameAPI.lastPlayedGames();
            dispatch(updateLastGames({ lastPlayedGames: lastPlayedGamesRes }));
            dispatch(stopUserLoading());
        } catch (err) {
            dispatch(stopUserLoading());
        }
    };
    const fetchAdminDetails = async () => {
        try {
            dispatch(startAdminLoading());
            const adminData = await UserAPI.getAdminData();
            dispatch(updateAdminData({ adminData }));
            dispatch(stopAdminLoading());
        } catch (err) {
            console.log(err);
            dispatch(stopAdminLoading());
        }
    };
    useEffect(() => {
        GameAPI.getLeaderboard().then((res) => {
            dispatch(updateLeadershipBoard(res));
        });
        if (!isLogin) {
            navigate('/');
        } else {
            if (isAdmin) {
                navigate('/admin');
                fetchAdminDetails();
            } else {
                navigate('/dashboard');
                fetchUserDetails();
            }
        }
    }, [isLogin, isAdmin]);

    return (
        <>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isUserLoading}
            >
                <CircularProgress color='inherit' />
            </Backdrop>
            {isResumeGamePopUpOpen && <ResumeGame />}
            <SnackbarProvider>
                <Outlet />
            </SnackbarProvider>
        </>
    );
}

export default App;
