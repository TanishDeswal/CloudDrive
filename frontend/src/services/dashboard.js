import api from "./api";

export const getUser = async () => {

    const response = await api.get("/users/me");

    return response.data;

};

export const getFolders = async () => {

    const response = await api.get("/folders");

    return response.data;

};

export const getFiles = async (folderId = null) => {

    const url = folderId
        ? `/files?folderId=${folderId}`
        : "/files";

    const response = await api.get(url);

    return response.data;

};

export const createFolder = async (name) => {

    const response = await api.post("/folders", {
        name
    });

    return response.data;

};

export const uploadFile = async (file, folderId = null) => {

    const formData = new FormData();

    formData.append("file", file);

    if (folderId) {
        formData.append("folderId", folderId);
    }

    const res = await api.post(
        "/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return res.data;

};

export const downloadFile = async (id) => {

    const response = await api.get(`/files/${id}/download`);

    return response.data;

};

export const deleteFile = async (id) => {

    const response = await api.delete(`/files/${id}`);

    return response.data;

};

export const deleteFolder = async (id) => {

    const res = await api.delete(
        `/folders/${id}`
    );

    return res.data;

};

export const renameFolder = async (
    id,
    name
) => {

    const res = await api.patch(
        `/folders/${id}`,
        { name }
    );

    return res.data;

};