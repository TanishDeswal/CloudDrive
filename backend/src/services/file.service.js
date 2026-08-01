const prisma = require("../config/prisma");
const { containerClient } = require("../config/azure");

const getFiles = async (userId, folderId) => {

    const where = {
        ownerId: userId
    };

    if (folderId) {
        where.folderId = folderId;
    } else {
        where.folderId = null;
    }

    return await prisma.file.findMany({
        where,
        orderBy: {
            createdAt: "desc"
        }
    });

};

const getFile = async (fileId, userId) => {

    const file = await prisma.file.findFirst({
        where: {
            id: fileId,
            ownerId: userId
        }
    });

    if (!file) {
        throw new Error("File not found");
    }

    return file;
};

const deleteFile = async (fileId, userId) => {

    const file = await prisma.file.findFirst({
        where: {
            id: fileId,
            ownerId: userId
        }
    });

    if (!file) {
        throw new Error("File not found");
    }

    const blobClient = containerClient.getBlockBlobClient(
        file.blobName
    );

    await blobClient.deleteIfExists();

    await prisma.file.delete({
        where: {
            id: file.id
        }
    });

    return {
        message: "File deleted successfully"
    };
};

module.exports = {
    getFiles,
    getFile,
    deleteFile
};