const { sequelize } = require("../config/sequelize");
const { DataTypes, Model } = require("sequelize");
const Hostels = require("./Hostels");

class Blocks extends Model {}

Blocks.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        max_capacity_per_room: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        hostel_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Hostels,
                key: "id",
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: true,
        modelName: "Blocks",
        tableName: "blocks",
    }
);

module.exports = Blocks;
