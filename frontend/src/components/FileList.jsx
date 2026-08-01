import {
    downloadFile,
    deleteFile
} from "../services/dashboard";

export default function FileList({ files, refreshFiles }) {

    const handleDownload = async (id) => {

        try {

            const file = await downloadFile(id);

            window.open(file.downloadUrl, "_blank");

        } catch (err) {

            console.error(err);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this file?"
        );

        if (!confirmDelete) return;

        try {

            await deleteFile(id);

            await refreshFiles();

        } catch (err) {

            console.error(err);

            alert("Unable to delete file");

        }

    };

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-xl font-bold mb-5">
                Files
            </h2>

            {
                files.length === 0
                    ? (
                        <p>No files uploaded</p>
                    )
                    : (
                        files.map(file => (

                            <div
                                key={file.id}
                                className="flex justify-between items-center border-b py-3"
                            >

                                <span>

                                    📄 {file.name}

                                </span>

                                <div className="space-x-2">

                                    <button
                                        onClick={() => handleDownload(file.id)}
                                        className="bg-green-500 text-white px-3 py-1 rounded"
                                    >
                                        Download
                                    </button>

                                    <button
                                        onClick={() => handleDelete(file.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))
                    )
            }

        </div>

    );

}