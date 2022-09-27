"use strict";


module.exports = (capability) => (req, res, next) => {
    try {
        // We already add the user property in the bearer middlewares
        if (req.user.capabilities.includes(capability)) {
            return next();
        }
        next("Access Denied");

    } catch (error) {
        console.log(error);
        next("Invalid Login");
    }
}
