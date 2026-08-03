import { useUpload } from "../context/UploadContext";
import { uploadFile } from "../services/dashboard";

export default function UploadButton({
    onUpload,
    currentFolder
}) {

    const {
        setUploading,
        setProgress,
        setFileName,
        setController
    } = useUpload();

    const handleChange = async (event) => {

        const file = event.target.files[0];

        if (!file) return;

        const abortController = new AbortController();

        setController(abortController);
        setUploading(true);
        setProgress(0);
        setFileName(file.name);

        try {

            await uploadFile(
                file,
                currentFolder,
                setProgress,
                abortController.signal
            );

            await onUpload();

        } catch (err) {

            if (err.name !== "CanceledError") {

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

    return (

        <label className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg cursor-pointer">

            Upload File

            <input
                hidden
                type="file"
                onChange={handleChange}
            />

        </label>

    );

}