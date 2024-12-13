const { sequelize } = require("../config/sequelize");
const { DataTypes, Model } = require("sequelize");
const Roles = require("./Roles");

class Users extends Model {}

Users.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            validate: {
                isUUID: 4,
            },
        },
        enrollment_id: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate: {
                is: /^[A-Za-z\s-]+$/,
            },
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            validate: {
                len: [8, 100],
            },
        },
        role_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Roles,
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "Users",
        tableName: "users",
        timestamps: true,
    }
);

module.exports = Users;
