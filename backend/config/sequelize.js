const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
});

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("+ DB CONNECTED");
        await sequelize.sync();
        console.log("+ DB SYNCED");
    } catch (error) {
        console.error("- DB CONNECTION FAILED\n error: ", error);
    }
};

module.exports = { sequelize, dbConnection };
