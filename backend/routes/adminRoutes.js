const express = require("express");
const { addRole, addUser, addAdminUser } = require("../controllers/adminController");
const router = express.Router();

//add roles
router.route("/add/role").post(addRole);

//add user (like students)
router.route("/add/user").post(addUser);

//add admin user
router.route("/add/admin").post(addAdminUser);

module.exports = router;
