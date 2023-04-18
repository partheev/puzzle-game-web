import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/layout/Header';
import { Home } from './pages/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <div>login</div>,
    },
    {
        path: '/registration',
        element: <div>Hello world!</div>,
    },
    {
        path: '/game',
        element: <div>Hello world!</div>,
    },
]);

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Header />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
