const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const errorHandler = require("../utils/errorHandler");
const { sendToken } = require("../utils/jwtToken");
const { Users, Roles } = require("../models");
const bcrypt = require("bcryptjs");

// login using email and password

exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return next(new errorHandler("Invalid email or password", 400));
        }

        //fetch the user using email
        const user = await Users.findOne({
            include: [{ model: Roles, attributes: ["role_name"] }],
            where: { email: email },
            raw: true,
        });

        user.role = user["Role.role_name"];
        delete user["Role.role_name"];

        console.log(user);

        //return message if no user found
        if (!user) {
            return next(new errorHandler("Invalid email or password", 400));
        }

        //compare provided and hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        //check for password validity and send token if valid
        if (isPasswordMatch) {
            sendToken(user, 201, res);
        } else {
            return next(new errorHandler(`Invalid email or password`, 400));
        }
    } catch (error) {
        return next(
            new errorHandler(
                `${process.env.NODE_ENV !== "production" ? error : "Something went wrong"}`,
                500
            )
        );
    }
});

//logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("AUTHCOOKIE", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out Successfully",
    });
});

//user dashboard

exports.getuserdetails = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.user;

    try {
        const user = await Users.findOne({
            include: [{ model: Roles, attributes: ["role_name"] }],
            where: { id: id },
            raw: true,
        });

        user.role = user["Role.role_name"];
        delete user["Role.role_name"];

        if (user) {
            res.status(200).json({
                success: true,
                user: user,
            });
        } else {
            return next(new errorHandler("Student not found", 404));
        }
    } catch (error) {
        return next(
            new errorHandler(
                `${process.env.NODE_ENV !== "production" ? error : "Something went wrong"}`,
                500
            )
        );
    }
});
