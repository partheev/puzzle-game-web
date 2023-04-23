import { Axios } from './Axios';
import { ENDPOINTS } from './endpoints';

const getAdminData = async () => {
    const res = await Axios.get(ENDPOINTS.USER.ADMIN_DETAILS);
    return res.data;
};

const getUserDetails = async () => {
    const res = await Axios.get(ENDPOINTS.USER.USER_DETAILS);
    return res.data;
};

export const UserAPI = {
    getAdminData,
    getUserDetails,
};
