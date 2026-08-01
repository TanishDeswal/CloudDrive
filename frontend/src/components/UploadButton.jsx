import { uploadFile } from "../services/dashboard";

export default function UploadButton({
    onUpload,
    currentFolder
}) {

    const handleChange = async (event) => {

        const file = event.target.files[0];

        if (!file) return;

        try {

            await uploadFile(
                file,
                currentFolder
            );

            await onUpload();

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Upload failed"
            );

        }

    };

    return (

        <label className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg cursor-pointer">

            Upload File

            <input
                type="file"
                hidden
                onChange={handleChange}
            />

        </label>

    );

}