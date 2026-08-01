const uploadService = require("../services/upload.service");

const upload = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const result = await uploadService.uploadFile(
            req.file,
            req.user.id,
            req.body.folderId
        );

        res.status(201).json(result);

    } catch (error) {

    console.error(error);

    res.status(500).json({
        message: error.message
    });

}

};

module.exports = {
    upload
};