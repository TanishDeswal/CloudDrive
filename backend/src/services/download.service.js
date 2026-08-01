const prisma = require("../config/prisma");
const { generateSasUrl } = require("../utils/sas");

const downloadFile = async (id, userId) => {

    const file = await prisma.file.findFirst({
        where: {
            id,
            ownerId: userId
        }
    });

    if (!file) {
        throw new Error("File not found");
    }

    return {
        downloadUrl: generateSasUrl(file.blobName)
    };

};

module.exports = {
    downloadFile
};