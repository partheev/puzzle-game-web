import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000,
});

instance.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem(
            'access_key'
        )}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const Axios = instance;
