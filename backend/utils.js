import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const someThingWentWrong = (res, err) => {
    res.status(500);
    res.send({
        message: 'Something went wrong',
        error: err,
    });
};

export const unAuthorizedRequest = (res) => {
    res.status(401);
    res.send({ message: 'Unauthorized request.' });
};
export const adminAuthorizationRequired = (res) => {
    res.status(401);
    res.send({ message: 'Unauthorized access. Login with admin credentials' });
};

export const generateJWT = (email) => {
    const token = jwt.sign({ email }, process.env.JWT_KEY);

    return token;
};
export const validateJWT = (token) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_KEY);
        return {
            error: false,
            payload,
        };
    } catch (e) {
        return {
            error: true,
            payload: null,
        };
    }
};

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);
    return hash;
};

export const compareHashedPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};
