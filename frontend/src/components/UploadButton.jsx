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
        <div className="flex flex-col gap-3">

            <label className="w-fit bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg cursor-pointer text-center">

                Upload File

                <input
                    type="file"
                    hidden
                    onChange={handleChange}
                />

            </label>

            {uploading && (

                <div className="w-72">

                    <div className="flex justify-between text-sm mb-2">
                        <span>Uploading...</span>
                        <span>{progress}%</span>
                    </div>

                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                        <div
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{
                                width: `${progress}%`
                            }}
                        />

                    </div>

                    <button
                        onClick={cancelUpload}
                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                        Cancel Upload
                    </button>

                </div>

            )}

        </div>
    );

}