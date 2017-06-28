

module.exports.log = (err) => {
    console.log('error:\n ', err);
}

module.exports.errorHandler = (err, req, res, next) => {
    res.status(500);
    res.render('errors', { error: err });
};
