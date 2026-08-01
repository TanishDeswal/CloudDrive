const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const folderController = require("../controllers/folder.controller");

router.post("/", protect, folderController.createFolder);

router.get("/", protect, folderController.getFolders);

router.delete("/:id", protect, folderController.deleteFolder);

router.patch(
    "/:id",
    protect,
    folderController.renameFolder
);

module.exports = router;