const { Users, Roles, Hostels, Blocks, Rooms } = require("../models");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const errorHandler = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sequelize } = require("../config/sequelize");
const { Op } = require("sequelize");

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

//add hostel

exports.addHostel = catchAsyncErrors(async (req, res, next) => {
    const { name, address, description } = req.body;

    if (!name || !address) {
        return next(new errorHandler(`Please provide all the required fields`, 400));
    }

    try {
        const existingHostel = await Hostels.findOne({
            where: sequelize.where(
                sequelize.fn("LOWER", sequelize.col("name")),
                name.toLowerCase()
            ),
        });

        if (existingHostel) {
            return next(new errorHandler("Hostel with this name already exists", 400));
        }

        const newHostel = await Hostels.create({
            name: name,
            address: address,
            description: description,
        });

        if (!newHostel) {
            return next(new errorHandler("Hostel creation failed. Please try again.", 400));
        }

        res.status(201).json({
            success: true,
            message: "Hostel created successfully",
            hostel: newHostel.dataValues,
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

//get all hostels

exports.getAllHostels = catchAsyncErrors(async (req, res, next) => {
    try {
        const allHostels = await Hostels.findAndCountAll();

        if (allHostels.count === 0) {
            return next(new errorHandler("No hostels found", 404));
        }

        res.status(200).json({
            success: true,
            allHostels: allHostels.rows,
            hostelsCount: allHostels.count,
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

//delete hostel

exports.deleteHostel = catchAsyncErrors(async (req, res, next) => {
    const { hostel_id } = req.params;

    if (!hostel_id) {
        return next(new errorHandler("Hostel id not provided", 400));
    }

    try {
        const existingHostel = await Hostels.findOne({ where: { id: hostel_id } });

        if (!existingHostel) {
            return next(new errorHandler("Hostel not found", 400));
        }
        const deletedHostel = await Hostels.destroy({ where: { id: hostel_id } });

        if (!deletedHostel) {
            return next(new errorHandler("Error deleting the hostel. Please try again.", 400));
        }

        res.status(200).json({
            success: true,
            message: "Hostel deleted successfully",
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

//add hostel block

exports.addHostelBlock = catchAsyncErrors(async (req, res, next) => {
    const { hostel_id, name, description, max_capacity_per_room } = req.body;

    if (!hostel_id || !name || !max_capacity_per_room) {
        return next(new errorHandler(`Please provide all the required fields`, 400));
    }

    if (Number(max_capacity_per_room) <= 0) {
        return next(new errorHandler("Max capacity per room should be atleast 1", 400));
    }

    try {
        const existingHostel = await Hostels.findOne({
            where: { id: hostel_id },
        });

        if (!existingHostel) {
            return next(new errorHandler("Hostel not found", 400));
        }

        const existingBlock = await Blocks.findOne({
            where: {
                [Op.and]: [
                    sequelize.where(
                        sequelize.fn("LOWER", sequelize.col("name")),
                        name.toLowerCase()
                    ),
                    { hostel_id: hostel_id },
                ],
            },
        });

        if (existingBlock) {
            return next(
                new errorHandler(`Block with this name already exists in this hostel`, 400)
            );
        }

        const newBlock = await Blocks.create({
            name: name,
            hostel_id: hostel_id,
            description: description,
            max_capacity_per_room: max_capacity_per_room,
        });

        if (!newBlock) {
            return next(new errorHandler("Block creation failed. Please try again.", 400));
        }

        res.status(201).json({
            success: true,
            message: "Block created successfully",
            hostel: newBlock.dataValues,
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

//get all hostel blocks

exports.getAllHostelBlocks = catchAsyncErrors(async (req, res, next) => {
    try {
        const allHostelBlocks = await Blocks.findAndCountAll();

        if (allHostelBlocks.count === 0) {
            return next(new errorHandler("No hostels found", 404));
        }

        res.status(200).json({
            success: true,
            allHostelBlocks: allHostelBlocks.rows,
            blocksCount: allHostelBlocks.count,
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

//get blocks by hostel id

exports.getBlocksByHostelId = catchAsyncErrors(async (req, res, next) => {
    const { hostel_id } = req.params;

    if (!hostel_id) {
        return next(new errorHandler("Hostel id not provided", 400));
    }

    try {
        const hostelWithBlocks = await Hostels.findOne({
            include: [
                {
                    model: Blocks,
                },
            ],
            where: { id: hostel_id },
            // raw: true,
        });

        if (!hostelWithBlocks) {
            return next(
                new errorHandler("Error fetching hostel with blocks. Please try again.", 400)
            );
        }

        const blocks = hostelWithBlocks.Blocks;

        delete hostelWithBlocks.dataValues.Blocks;

        res.status(200).json({
            success: true,
            hostelInfo: hostelWithBlocks,
            blocks: blocks,
            blocksCount: blocks.length,
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

//add room to block

exports.addRoom = catchAsyncErrors(async (req, res, next) => {
    let { block_id, room_number, max_capacity } = req.body;

    if (!block_id || !room_number) {
        return next(new errorHandler(`Please provide all the required fields`, 400));
    }

    if (Number(max_capacity) <= 0 && Number(max_capacity)) {
        return next(new errorHandler("Room capacity should be atleast 1", 400));
    }

    try {
        const existingBlock = await Blocks.findOne({
            where: { id: block_id },
        });

        if (!existingBlock) {
            return next(new errorHandler("Block not found", 400));
        }

        const existingRoom = await Rooms.findOne({
            where: {
                room_number: room_number,
                block_id: block_id,
            },
        });

        if (existingRoom) {
            return next(
                new errorHandler(
                    `Room with number: ${room_number} already exists in this block`,
                    400
                )
            );
        }

        const newRoom = await Rooms.create({
            room_number: room_number,
            block_id: block_id,
            max_capacity: max_capacity,
        });

        if (!newRoom) {
            return next(new errorHandler("Room creation failed. Please try again.", 400));
        }

        res.status(201).json({
            success: true,
            message: "Room created successfully",
            hostel: newRoom.dataValues,
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

//get rooms by block id

exports.getRoomsByBlockId = catchAsyncErrors(async (req, res, next) => {
    const { block_id } = req.params;

    if (!block_id) {
        return next(new errorHandler("Block id not provided", 400));
    }

    try {
        const BlockWithRooms = await Blocks.findOne({
            include: [
                {
                    model: Rooms,
                },
            ],
            where: { id: block_id },
            // raw: true,
        });

        if (!BlockWithRooms) {
            return next(
                new errorHandler("Error fetching block with rooms. Please try again.", 400)
            );
        }

        const rooms = BlockWithRooms.Rooms;

        delete BlockWithRooms.dataValues.Rooms;

        res.status(200).json({
            success: true,
            blockInfo: BlockWithRooms,
            rooms: rooms,
            roomsCount: rooms.length,
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
