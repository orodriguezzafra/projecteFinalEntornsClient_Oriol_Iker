const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Validacio incorrecte
    if (err instanceof mongoose.Error.ValidationError) {
        const errors = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({
            message: 'Error de validació',
            errors,
        });
    }

    // Id incorrecte
    if (err instanceof mongoose.Error.CastError && err.kind === 'ObjectId') {
        return res.status(400).json({
            message: 'ID invàlid',
        });
    }

    // Error intern
    res.status(500).json({
        message: 'Error intern del servidor',
    });
};
module.exports = errorHandler;