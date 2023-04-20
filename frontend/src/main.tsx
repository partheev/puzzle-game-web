import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { store } from './store/store';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { Game } from './pages/Game';
import { Dashboard } from './pages/Dashboard';
import { Result } from './pages/Result';
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
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
