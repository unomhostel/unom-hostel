const { sequelize } = require("../config/sequelize");
const { DataTypes, Model } = require("sequelize");

class Hostels extends Model {}

Hostels.init(
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
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: true,
        modelName: "Hostels",
        tableName: "hostels",
    }
);

module.exports = Hostels;
