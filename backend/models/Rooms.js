const { sequelize } = require("../config/sequelize");
const { DataTypes, Model } = require("sequelize");
const Blocks = require("./Blocks");

class Rooms extends Model {}

Rooms.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        room_number: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        block_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Blocks,
                key: "id",
            },
        },
        max_capacity: {
            type: DataTypes.INTEGER(10),
            defaultValue: null,
        },
    },
    {
        sequelize,
        tableName: "rooms",
        modelName: "Rooms",
        timestamps: true,
    }
);

module.exports = Rooms;
