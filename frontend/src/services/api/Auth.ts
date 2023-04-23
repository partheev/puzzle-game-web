import { Axios } from './Axios';
import { ENDPOINTS } from './endpoints';

interface LoginResponse {
    email: string;
    name: string;
    access_key: string;
    user_id: string;
    isAdmin: boolean;
}

async function login({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<LoginResponse> {
    const res = await Axios.post(ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
    });

    return res.data;
}

const signup = async ({
    email,
    password,
    name,
}: {
    email: string;
    password: string;
    name: string;
}) => {
    const res = await Axios.post(ENDPOINTS.AUTH.SIGNUP, {
        email,
        password,
        name,
    });

    return res.data;
};

export const AuthAPI = {
    login,
    signup,
};
