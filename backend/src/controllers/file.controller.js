const fileService = require("../services/file.service");
const { generateSasUrl } = require("../utils/sas");

const getFiles = async (req, res) => {

    try {

        const files = await fileService.getFiles(
            req.user.id,
            req.query.folderId
        );

        res.json(files);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

const downloadFile = async (req, res) => {

    try {

        const file = await fileService.getFile(
            req.params.id,
            req.user.id
        );

        const downloadUrl = generateSasUrl(file.blobName);

        res.json({
            downloadUrl
        });

    } catch (err) {

        res.status(404).json({
            message: err.message
        });

    }

};

const deleteFile = async (req, res) => {

    try {

        const result = await fileService.deleteFile(
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

module.exports = {
    getFiles,
    downloadFile,
    deleteFile
};