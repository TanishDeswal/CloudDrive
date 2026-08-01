const folderService = require("../services/folder.service");

const createFolder = async (req, res) => {

    try {

        const { name } = req.body;

        const folder = await folderService.createFolder(
            name,
            req.user.id
        );

        res.status(201).json(folder);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

const getFolders = async (req, res) => {

    try {

        const folders = await folderService.getFolders(
            req.user.id
        );

        res.json(folders);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};


const deleteFolder = async (req, res) => {

    try {

        const result = await folderService.deleteFolder(
            req.params.id,
            req.user.id
        );

        res.json(result);

    } catch (err) {

        res.status(404).json({
            message: err.message
        });

    }

};

const renameFolder = async (req, res) => {

    try {

        const folder = await folderService.renameFolder(
            req.params.id,
            req.user.id,
            req.body.name
        );

        res.json(folder);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

};

module.exports = {
    createFolder,
    getFolders,
    deleteFolder,
    renameFolder
};