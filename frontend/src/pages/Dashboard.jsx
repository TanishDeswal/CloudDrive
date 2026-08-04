import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import FolderList from "../components/FolderList";
import FileList from "../components/FileList";
import UploadButton from "../components/UploadButton";
import UploadProgress from "../components/UploadProgress";

import {
    getUser,
    getFolders,
    getFiles,
    createFolder,
    deleteFolder,
    renameFolder
} from "../services/dashboard";

export default function Dashboard() {

    const [user, setUser] = useState(null);
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);

    const [loading, setLoading] = useState(true);

    const [currentFolder, setCurrentFolder] = useState(null);
    const [currentFolderName, setCurrentFolderName] = useState("Home");

    const [newFolderName, setNewFolderName] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const [userData, folderData, fileData] =
                await Promise.all([
                    getUser(),
                    getFolders(),
                    getFiles()
                ]);

            setUser(userData);
            setFolders(folderData);
            setFiles(fileData);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    const refreshFiles = async () => {

        try {

            const fileData = await getFiles(currentFolder);

            setFiles(fileData);

        } catch (err) {

            console.error(err);

        }

    };

    const handleCreateFolder = async () => {

        if (!newFolderName.trim()) return;

        try {

            await createFolder(newFolderName);

            setNewFolderName("");

            const folderData = await getFolders();

            setFolders(folderData);

        } catch (err) {

            console.error(err);

        }

    };

    const openFolder = async (folder) => {

        try {

            setCurrentFolder(folder.id);
            setCurrentFolderName(folder.name);

            const fileData = await getFiles(folder.id);

            setFiles(fileData);

        } catch (err) {

            console.error(err);

        }

    };

    const openRoot = async () => {

        try {

            setCurrentFolder(null);
            setCurrentFolderName("Home");

            const fileData = await getFiles();

            setFiles(fileData);

        } catch (err) {

            console.error(err);

        }

    };

    const filteredFiles = files.filter((file) =>
        file.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const handleDeleteFolder = async (id) => {

        if (!window.confirm("Delete this folder?")) {
            return;
        }

        try {

            await deleteFolder(id);

            const updatedFolders = await getFolders();

            setFolders(updatedFolders);

            if (currentFolder === id) {
                await openRoot();
            }

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Failed to delete folder."
            );

        }

    };

    const handleRenameFolder = async (
        id,
        currentName
    ) => {

        const newName = prompt(
            "Enter new folder name:",
            currentName
        );

        if (!newName || !newName.trim()) {
            return;
        }

        try {

            await renameFolder(
                id,
                newName.trim()
            );

            const updatedFolders = await getFolders();

            setFolders(updatedFolders);

            if (
                currentFolderName === currentName
            ) {
                setCurrentFolderName(newName.trim());
            }

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Rename failed"
            );

        }

    };

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center bg-slate-100">

                <div className="text-center">

                    <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-600 mx-auto"></div>

                    <h2 className="mt-6 text-xl font-semibold">
                        Loading CloudDrive...
                    </h2>

                </div>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <div className="max-w-7xl mx-auto px-8 py-8">

                {/* Header */}

                <div className="mb-10">

                    <h1 className="text-4xl font-bold text-slate-900">
                        Welcome back, {user?.name} 👋
                    </h1>

                    <p className="mt-3 text-lg text-slate-500">
                        Store, organize and access your files securely.
                    </p>

                    <div className="flex items-center gap-6 mt-6 text-sm text-gray-500">

                        <span>
                            📁 {folders.length} Folder{folders.length !== 1 ? "s" : ""}
                        </span>

                        <span>
                            📄 {files.length} File{files.length !== 1 ? "s" : ""}
                        </span>

                    </div>

                </div>

                {/* Main Grid */}

                <div className="grid grid-cols-12 gap-6 items-stretch">

                    {/* Sidebar */}

                    <div className="col-span-3 flex">

                        <div className="bg-white rounded-xl border shadow-sm p-6 flex flex-col w-full">

                            <div className="flex justify-between items-center mb-6">

                                <h2 className="text-2xl font-bold">
                                    📁 Folders
                                </h2>

                                <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                                    {folders.length}
                                </span>

                            </div>

                            <FolderList
                                folders={folders}
                                currentFolder={currentFolder}
                                onSelect={openFolder}
                                onDelete={handleDeleteFolder}
                                onRename={handleRenameFolder}

                            />

                            <div className="mt-auto">

                                <hr className="my-6" />

                                <h3 className="font-semibold">
                                    Storage Usage
                                </h3>

                                <div className="w-full h-2 bg-gray-200 rounded-full mt-4">

                                    <div
                                        className="h-2 bg-blue-600 rounded-full"
                                        style={{
                                            width: "24%"
                                        }}
                                    />

                                </div>

                                <p className="mt-3 text-sm text-gray-500">
                                    1.2 GB used of 5 GB
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Main Content */}

                    <div className="col-span-9 flex">

                        <div className="bg-white rounded-xl border shadow-sm p-6 flex flex-col w-full">
                                                        {/* Breadcrumb */}

                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">

                                <button
                                    onClick={openRoot}
                                    className="hover:text-blue-600 transition"
                                >
                                    🏠 Home
                                </button>

                                <span>›</span>

                                <span className="font-semibold text-slate-700">
                                    {currentFolderName}
                                </span>

                            </div>

                            {/* Toolbar */}

                            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">

                                {/* Search */}

                                <div className="relative w-full max-w-sm">

                                    <input
                                        type="text"
                                        placeholder="Search files..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <span className="absolute left-3 top-3 text-gray-400">
                                        🔍
                                    </span>

                                </div>

                                {/* Actions */}

                                <div className="flex flex-wrap items-center gap-3">

                                    <input
                                        type="text"
                                        placeholder="Folder name"
                                        value={newFolderName}
                                        onChange={(e) =>
                                            setNewFolderName(e.target.value)
                                        }
                                        className="w-44 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />

                                    <button
                                        onClick={handleCreateFolder}
                                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg transition"
                                    >
                                        + Folder
                                    </button>

                                    <UploadButton
                                        currentFolder={currentFolder}
                                        onUpload={refreshFiles}
                                    />

                                </div>

                            </div>

                            {/* Divider */}

                            <div className="border-b mb-6"></div>

                            {/* Files */}

                            {

                                filteredFiles.length === 0 ? (

                                    <div className="flex-1 flex flex-col items-center justify-center">

                                        <div className="text-7xl mb-6">

                                            📂

                                        </div>

                                        <h2 className="text-3xl font-bold text-gray-700">

                                            This folder is empty

                                        </h2>

                                        <p className="text-gray-500 mt-3 text-lg">

                                            Upload your first file to get started.

                                        </p>

                                    </div>

                                ) : (

                                    <div>

                                        <div className="flex justify-between text-sm text-gray-500 font-semibold border-b pb-3 mb-4">

                                            <span>
                                                Name
                                            </span>

                                            <span>
                                                Actions
                                            </span>

                                        </div>

                                        <FileList
                                            files={filteredFiles}
                                            refreshFiles={refreshFiles}
                                        />

                                    </div>

                                )

                            }

                        </div>

                    </div>

                </div>

            </div>
            <UploadProgress />

        </div>

    );

}