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

export const generateJWT = () => {};
export const validateJWT = (token) => {};
