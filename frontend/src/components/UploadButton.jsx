import { useState } from "react";
import { uploadFile } from "../services/dashboard";

export default function UploadButton({
    onUpload,
    currentFolder
}) {

    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [controller, setController] = useState(null);

    const handleChange = async (event) => {

        const file = event.target.files[0];

        if (!file) return;

        const abortController = new AbortController();

        setController(abortController);
        setUploading(true);
        setProgress(0);

        try {

            await uploadFile(
                file,
                currentFolder,
                setProgress,
                abortController.signal
            );

            await onUpload();

        } catch (err) {

            if (err.name === "CanceledError") {

                alert("Upload cancelled");

            } else {

                console.error(err);

                alert(
                    err.response?.data?.message ||
                    "Upload failed"
                );

            }

        } finally {

            setUploading(false);

        }

    };

    const cancelUpload = () => {

        if (controller) {
            controller.abort();
        }

    };

    return (

        <div className="flex items-center gap-3">

            <label className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg cursor-pointer">

                Upload File

                <input
                    type="file"
                    hidden
                    onChange={handleChange}
                />

            </label>

            {uploading && (

                <div className="flex items-center gap-3">

                    <div className="w-40 bg-gray-200 rounded-full h-3">

                        <div
                            className="bg-blue-600 h-3 rounded-full transition-all"
                            style={{
                                width: `${progress}%`
                            }}
                        />

                    </div>

                    <span className="text-sm font-medium">
                        {progress}%
                    </span>

                    <button
                        onClick={cancelUpload}
                        className="text-red-600 hover:text-red-800"
                    >
                        Cancel
                    </button>

                </div>

            )}

        </div>

    );

}