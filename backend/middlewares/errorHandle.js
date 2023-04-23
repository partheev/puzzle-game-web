export const errorHandle = (err, req, res, next) => {
    res.status(500);
    res.send({ message: 'Something went wrong', error: err });
};
