const { sequelize } = require("../config/sequelize");
const { DataTypes, Model } = require("sequelize");

class Roles extends Model {}

Roles.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        role_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: "Roles",
        tableName: "roles",
        timestamps: true,
    }
);

module.exports = Roles;
