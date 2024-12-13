const { Users, Roles } = require("../models");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const errorHandler = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

//generate random password based on the length

const generateRandomPassword = async (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(charset.length);
        password += charset[randomIndex];
    }
    return password;
};

//hash the given password using bcrypt

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    return password_hash;
};

//add role

exports.addRole = catchAsyncErrors(async (req, res, next) => {
    const { role_name } = req.body;

    try {
        const role = role_name.toUpperCase();

        // Check if the role already exists
        const existingRole = await Roles.findOne({ where: { role_name: role } });

        //check whether the role already exists
        if (existingRole) {
            return next(new errorHandler(`${role} role already exists`, 400));
        }

        //create new role
        await Roles.create({
            role_name: role,
        });

        res.status(201).json({
            success: true,
            message: `${role} role created successfully`,
        });
    } catch (error) {
        return next(
            new errorHandler(
                `${process.env.NODE_ENV !== "production" ? error : "Something went wrong"}`,
                500
            )
        );
    }
});

//add user (pg resident)

exports.addUser = catchAsyncErrors(async (req, res, next) => {
    const { enrollment_id, name, email, role } = req.body;

    //validate the require fields
    if (!enrollment_id || !name || !email || !role) {
        return next(new errorHandler("Please provide all the required fields", 400));
    }

    try {
        const existingUser = await Users.findOne({ where: { email: email } });

        // check whether user is already exist with the provided email
        if (existingUser) {
            return next(new errorHandler("User with this email already exists", 400));
        }

        const role_name = role.toUpperCase();
        const existingRole = await Roles.findOne({ where: { role_name: role_name } });

        //validate whether the role provided is valid
        if (!existingRole) {
            return next(new errorHandler("Invalid role", 404));
        }

        //generate password and hash it
        const password = await generateRandomPassword(20);
        const hashed_password = await hashPassword(password);

        //create new user
        const user = await Users.create({
            enrollment_id: enrollment_id,
            name: name,
            email: email,
            password: hashed_password,
            role_id: existingRole.dataValues.id,
        });

        //user variable will be empty if no user is created
        if (!user) {
            return next(new errorHandler("User creation failed. Please try again", 400));
        }

        res.status(201).json({
            success: true,
            message: `User created successfully`,
            user: user.dataValues,
        });
    } catch (error) {
        return next(
            new errorHandler(
                `${process.env.NODE_ENV !== "production" ? error : "Something went wrong"}`,
                500
            )
        );
    }
});

//add admins

exports.addAdminUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, role } = req.body;

    //validate the require fields
    if (!name || !email || !role) {
        return next(new errorHandler("Please provide all the required fields", 400));
    }

    try {
        const existingUser = await Users.findOne({ where: { email: email } });

        // check whether user is already exist with the provided email
        if (existingUser) {
            return next(new errorHandler("User with this email already exists", 400));
        }

        const role_name = role.toUpperCase();
        const existingRole = await Roles.findOne({ where: { role_name: role_name } });

        //validate whether the role provided is valid
        if (!existingRole) {
            return next(new errorHandler("Invalid role", 404));
        }

        //generate password and hash it
        const password = await generateRandomPassword(20);
        const hashed_password = await hashPassword(password);

        //create new user
        const user = await Users.create({
            name: name,
            email: email,
            password: hashed_password,
            role_id: existingRole.dataValues.id,
        });

        //user variable will be empty if no user is created
        if (!user) {
            return next(new errorHandler("User creation failed. Please try again", 400));
        }

        res.status(201).json({
            success: true,
            message: `Admin user created successfully`,
            user: user.dataValues,
        });
    } catch (error) {
        return next(
            new errorHandler(
                `${process.env.NODE_ENV !== "production" ? error : "Something went wrong"}`,
                500
            )
        );
    }
});
