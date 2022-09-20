'use strict';

module.exports = (error, req, res, next) => res.status(500).json({
    code: 500,
    route: req.path,
    message: `Server Error: ${error.message || error}`
});