const express = require("express");
const cors = require("cors");
require("dotenv").config();

const prisma = require("./config/prisma");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const folderRoutes = require("./routes/folder.routes");
const uploadRoutes = require("./routes/upload.routes");
const fileRoutes = require("./routes/file.routes");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/files", fileRoutes);

app.get("/", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.json({
            message: "CloudDrive API is running 🚀",
            message: "CloudDrive API Running",
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
