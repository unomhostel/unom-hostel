const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncErrors");
const errorHandler = require("../utils/errorHandler");
const { Users, Roles } = require("../models");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { AUTHCOOKIE } = req.cookies;

    if (!AUTHCOOKIE) {
        return next(new errorHandler("You're not logged in", 401));
    }

    const decodedData = jwt.verify(AUTHCOOKIE, process.env.JWT_SECRET);

    const user = await Users.findOne({
        include: [
            {
                model: Roles,
                attributes: [["role_name", "role"]],
            },
        ],
        where: { id: decodedData.user_id },
        raw: true,
    });

    user.role = user["Role.role"];
    delete user["Role.role"];

    req.user = user;

    next();
});

exports.authorizeRoles = ([...roles]) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new errorHandler("Cannot access the resource", 403));
        }
        next();
    };
};
