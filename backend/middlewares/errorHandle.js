import { HTTP_CODES } from '../constants/httpCodes';

export const errorHandle = (req, res, next, err) => {
    res.status(500);
    res.send({ message: 'Something went wrong', error: err });
};
