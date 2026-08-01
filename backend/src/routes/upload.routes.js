const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const uploadController = require("../controllers/upload.controller");

router.post(
    "/",
    protect,
    upload.single("file"),
    uploadController.upload
);

module.exports = router;