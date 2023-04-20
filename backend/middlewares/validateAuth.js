import { UserModel } from '../models/User';
import { unAuthorizedRequest, validateJWT } from '../utils';

export const validateAuth = async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return unAuthorizedRequest(res);
    }
    const token = bearerToken.split(' ')[1];

    const { payload, error } = validateJWT(token);
    if (!error && payload) {
        const user = await UserModel.findOne(payload);
        req.user = user;
        next();
        return;
    }

    return unAuthorizedRequest(res);
};
