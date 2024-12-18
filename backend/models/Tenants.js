const { sequelize } = require("../config/sequelize");
const { DataTypes, Model } = require("sequelize");
const Users = require("./Users");
const Rooms = require("./Rooms");

class Tenants extends Model {}

Tenants.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Users,
                key: "id",
            },
        },
        room_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Rooms,
                key: "id",
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        modelName: "Tenants",
        tableName: "tenants",
    }
);

module.exports = Tenants;
