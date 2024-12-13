const app = require("./app");
const dotenv = require("dotenv");
const { dbConnection } = require("./config/sequelize");
const path = require("path");
const express = require("express");

//.env config

dotenv.config({
    path: "./config/config.env",
});

// Serve static files from the Vite 'dist' directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Handle any other routes and serve the index.html file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const startServer = async () => {
    try {
        await dbConnection();

        app.listen(process.env.PORT, () => {
            console.log(`+ SERVER IS RUNNING AT ${process.env.HOST}:${process.env.PORT}/`);
        });
    } catch (error) {
        console.error("- FAILED TO START THE SERVER: ", error);
    }
};

//running the server

startServer();

//handling uncaught exception

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}\n`);
    console.log(`Shutting down the server due to uncaught Exception `);
    process.exit(1);
});

//unhandled promise rejection

process.on("unhandledRejection", (err) => {
    console.log(`- Error : ${err.message}`);
    console.log(`\n- Shutting down the server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    });
});
