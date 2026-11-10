const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        res.status(400).json(Object.keys(err.errors));
    } else if (err.name === 'CastError') {
        res.status(400).json({ message: `Invalid value for field: ${err.path}` });
    } else {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

module.exports = errorHandler;