const downloadService =
    require("../services/download.service");

const download = async (req, res) => {

    try {

        const result =
            await downloadService.downloadFile(
                req.params.id,
                req.user.id
            );

        res.json(result);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

};

module.exports = {
    download
};