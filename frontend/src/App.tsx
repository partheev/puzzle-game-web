import { useEffect } from 'react';
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    useNavigate,
} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import { useAppSelector } from './hooks/redux';

function App() {
    const navigate = useNavigate();
    const { isLogin, isAdmin } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (!isLogin) {
            navigate('/');
        } else {
            if (isAdmin) {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        }
    }, [isLogin, isAdmin]);

    return (
        <>
            <SnackbarProvider>
                <Outlet />
            </SnackbarProvider>
        </>
    );
}

export default App;
