const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const fileController = require("../controllers/file.controller");

router.get("/", protect, fileController.getFiles);

router.get("/:id/download", protect, fileController.downloadFile);

router.delete("/:id", protect, fileController.deleteFile);

module.exports = router;