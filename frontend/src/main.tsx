import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import './index.css';
import { store } from './store/store';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { Game } from './pages/Game';
import { Dashboard } from './pages/Dashboard';
import { Result } from './pages/Result';
import { AdminPage } from './pages/Admin';

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/auth',
                element: <Auth />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/game',
                element: <Game />,
            },
            {
                path: '/result',
                element: <Result />,
            },
            {
                path: '/admin',
                element: <AdminPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
    // </React.StrictMode>
);
