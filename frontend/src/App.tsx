import { useEffect } from 'react';
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    useNavigate,
} from 'react-router-dom';

import { useAppSelector } from './hooks/redux';

function App() {
    const navigate = useNavigate();
    const isLogin = useAppSelector((state) => state.user.isLogin);

    useEffect(() => {
        if (!isLogin) {
            // navigate('/');
        }
    }, [isLogin]);

    return (
        <>
            <Outlet />
        </>
    );
}

export default App;
