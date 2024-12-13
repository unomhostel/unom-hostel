const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware");

//.env config

dotenv.config({
    path: "./config/config.env",
});

app.use(
    cors({ origin: `${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`, credentials: true })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const user = require("./routes/userRoutes");
const admin = require("./routes/adminRoutes");

app.use(`${process.env.API_BASE_URL}/user`, user);
app.use(`${process.env.API_BASE_URL}/admin`, admin);

//middleware for errors

app.use(errorHandlingMiddleware);

module.exports = app;
