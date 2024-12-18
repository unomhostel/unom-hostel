const Users = require("./Users");
const Roles = require("./Roles");
const Hostels = require("./Hostels");
const Blocks = require("./Blocks");
const Rooms = require("./Rooms");

//associations
Roles.hasMany(Users, { foreignKey: "role_id" });
Users.belongsTo(Roles, { foreignKey: "role_id" });

Hostels.hasMany(Blocks, { foreignKey: "hostel_id" });
Blocks.belongsTo(Hostels, { foreignKey: "hostel_id" });

Blocks.hasMany(Rooms, { foreignKey: "block_id" });
Rooms.belongsTo(Blocks, { foreignKey: "block_id" });

module.exports = { Users, Roles, Hostels, Blocks, Rooms };
