const express = require("express");
const {
    addRole,
    addUser,
    addAdminUser,
    addHostel,
    addHostelBlock,
    getAllHostels,
    getAllHostelBlocks,
    deleteHostel,
    getBlocksByHostelId,
    addRoom,
    getRoomsByBlockId,
} = require("../controllers/adminController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

const authorizedRoles = ["SUPER_ADMIN"];

//add roles
router.route("/add/role").post(isAuthenticated, authorizeRoles(authorizedRoles), addRole);

//add user (like students)
router.route("/add/user").post(isAuthenticated, authorizeRoles(authorizedRoles), addUser);

//add admin user
router.route("/add/admin").post(isAuthenticated, authorizeRoles(authorizedRoles), addAdminUser);

//add hostel
router.route("/add/hostel").post(isAuthenticated, authorizeRoles(authorizedRoles), addHostel);

//add hostel block
router
    .route("/add/hostel/block")
    .post(isAuthenticated, authorizeRoles(authorizedRoles), addHostelBlock);

//add room to block
router
    .route("/add/hostel/block/room")
    .post(isAuthenticated, authorizeRoles(authorizedRoles), addRoom);

//get all hostels
router
    .route("/get/hostels/all")
    .get(isAuthenticated, authorizeRoles(authorizedRoles), getAllHostels);

//get all hostel blocks
router
    .route("/get/blocks/all")
    .get(isAuthenticated, authorizeRoles(authorizedRoles), getAllHostelBlocks);

//delete hostel by hostel id
router
    .route("/delete/hostel/:hostel_id")
    .delete(isAuthenticated, authorizeRoles(authorizedRoles), deleteHostel);

//get blocks by hostel id
router
    .route("/get/blocks/:hostel_id")
    .get(isAuthenticated, authorizeRoles(authorizedRoles), getBlocksByHostelId);

//get rooms by block id
router
    .route("/get/rooms/:block_id")
    .get(isAuthenticated, authorizeRoles(authorizedRoles), getRoomsByBlockId);

module.exports = router;
