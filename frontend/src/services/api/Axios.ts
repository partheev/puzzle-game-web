import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3005/api/',
    timeout: 2000,
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
