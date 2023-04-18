import { unAuthorizedRequest } from '../utils';

export const validateAuth = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return unAuthorizedRequest(res);
    }
    const token = bearerToken.split(' ')[1];

    if (!token) return unAuthorizedRequest(res);
};
