const Users = require("./Users");
const Roles = require("./Roles");

//associations
Roles.hasMany(Users, { foreignKey: "role_id" });
Users.belongsTo(Roles, { foreignKey: "role_id" });

module.exports = { Users, Roles };
