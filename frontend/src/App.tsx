import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Backdrop, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { GameAPI } from './services/api/Game';
import {
    startUserLoading,
    stopUserLoading,
    updateLastGames,
} from './store/slices/userSlice';

function App() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isLogin, isAdmin, isUserLoading } = useAppSelector(
        (state) => state.user
    );

    const fetchUserDetails = async () => {
        try {
            dispatch(startUserLoading());
            const lastPlayedGamesRes = await GameAPI.lastPlayedGames();
            dispatch(updateLastGames({ lastPlayedGames: lastPlayedGamesRes }));
            dispatch(stopUserLoading());
        } catch (err) {
            dispatch(stopUserLoading());
        }
    };
    useEffect(() => {
        if (!isLogin) {
            navigate('/');
        } else {
            if (isAdmin) {
                navigate('/admin');
            } else {
                fetchUserDetails();
                navigate('/dashboard');
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
            <SnackbarProvider>
                <Outlet />
            </SnackbarProvider>
        </>
    );
}

export default App;
