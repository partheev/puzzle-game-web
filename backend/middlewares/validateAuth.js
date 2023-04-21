import { UserModel } from '../models/User.js';
import { unAuthorizedRequest, validateJWT } from '../utils.js';

export const validateAuth = async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return unAuthorizedRequest(res);
    }
    const token = bearerToken.split(' ')[1];

    const { payload, error } = validateJWT(token);
    if (!error && payload) {
        const user = await UserModel.findOne({ email: payload.email });
        req.user = user;
        next();
        return;
    }

    return unAuthorizedRequest(res);
};
