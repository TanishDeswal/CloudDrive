const express = require("express");
const cors = require("cors");
require("dotenv").config();

const prisma = require("./config/prisma");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.json({
            message: "CloudDrive API is running 🚀",
            database: "Connected"
        });
    } catch (error) {
        res.status(500).json({
            message: "Database connection failed",
            error: error.message
        });
    }
});

module.exports = app;