const { containerClient } = require("../config/azure");
const prisma = require("../config/prisma");
const { v4: uuidv4 } = require("uuid");

const uploadFile = async (file, userId, folderId = null) => {

    if (!file) {
        throw new Error("No file uploaded");
    }

    // If a folder is selected, verify it belongs to the user
    if (folderId) {

        const folder = await prisma.folder.findFirst({
            where: {
                id: folderId,
                ownerId: userId
            }
        });

        if (!folder) {
            throw new Error("Folder not found");
        }

    }

    // Generate a unique blob name
    const blobName = `${uuidv4()}-${file.originalname}`;

    // Upload to Azure Blob Storage
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file.buffer);

    // Save metadata to PostgreSQL
    const uploadedFile = await prisma.file.create({
        data: {
            name: file.originalname,
            blobName: blobName,
            url: blockBlobClient.url,
            mimeType: file.mimetype,
            size: file.size,
            ownerId: userId,
            folderId: folderId || null
        }
    });

    return uploadedFile;
};

module.exports = {
    uploadFile
};