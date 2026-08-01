const prisma = require("../config/prisma");

const createFolder = async (name, userId) => {

    return await prisma.folder.create({
        data: {
            name,
            ownerId: userId
        }
    });

};

const getFolders = async (userId) => {

    return await prisma.folder.findMany({
        where: {
            ownerId: userId
        }
    });

};


const deleteFolder = async (folderId, userId) => {

    const folder = await prisma.folder.findFirst({
        where: {
            id: folderId,
            ownerId: userId
        },
        include: {
            files: true
        }
    });

    if (!folder) {
        throw new Error("Folder not found");
    }

    if (folder.files.length > 0) {
        throw new Error(
            "Folder is not empty"
        );
    }

    await prisma.folder.delete({
        where: {
            id: folderId
        }
    });

    return {
        message: "Folder deleted"
    };

};

const renameFolder = async (
    folderId,
    userId,
    name
) => {

    const folder = await prisma.folder.findFirst({
        where: {
            id: folderId,
            ownerId: userId
        }
    });

    if (!folder) {
        throw new Error("Folder not found");
    }

    return await prisma.folder.update({
        where: {
            id: folderId
        },
        data: {
            name
        }
    });

};

module.exports = {
    createFolder,
    getFolders,
    deleteFolder,
    renameFolder
};