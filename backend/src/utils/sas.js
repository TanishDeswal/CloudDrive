const {
    BlobSASPermissions,
    generateBlobSASQueryParameters,
    StorageSharedKeyCredential
} = require("@azure/storage-blob");

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

const sharedKeyCredential =
    new StorageSharedKeyCredential(
        accountName,
        accountKey
    );

const generateSasUrl = (blobName) => {

    const expiresOn = new Date();

    expiresOn.setMinutes(
        expiresOn.getMinutes() + 10
    );

    const sasToken =
        generateBlobSASQueryParameters(
            {
                containerName,
                blobName,
                permissions: BlobSASPermissions.parse("r"),
                startsOn: new Date(),
                expiresOn
            },
            sharedKeyCredential
        ).toString();

    return `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;

};

module.exports = {
    generateSasUrl
};