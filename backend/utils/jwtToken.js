const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
    const id = user.id;

    const token = jwt.sign({ user_id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        SameSite: "Strict",
        secure: process.env.NODE_ENV !== "production" ? false : true,
    };

    res.status(statusCode).cookie("AUTHCOOKIE", token, options).json({
        success: true,
        user,
        token,
    });
};

module.exports = { sendToken };
