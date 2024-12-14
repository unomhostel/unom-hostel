const express = require("express");
const { addRole, addUser, addAdminUser } = require("../controllers/adminController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

const authorizedRoles = ["SUPER_ADMIN"];

//add roles
router.route("/add/role").post(isAuthenticated, authorizeRoles(authorizedRoles), addRole);

//add user (like students)
router.route("/add/user").post(isAuthenticated, authorizeRoles(authorizedRoles), addUser);

//add admin user
router.route("/add/admin").post(isAuthenticated, authorizeRoles(authorizedRoles), addAdminUser);

module.exports = router;
