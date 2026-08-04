import { useUpload } from "../components/UploadContext";

export default function UploadProgress() {

    const {
        uploading,
        progress,
        fileName,
        controller
    } = useUpload();

    if (!uploading) return null;

    return (

        <div className="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-xl shadow-2xl border p-5">

            <h2 className="font-semibold mb-4">
                Uploading
            </h2>

            <p className="text-gray-600 text-sm mb-3 truncate">
                {fileName}
            </p>

            <div className="flex justify-between text-sm mb-2">
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
                onClick={() => controller?.abort()}
                className="mt-4 text-red-600 hover:text-red-700"
            >
                Cancel Upload
            </button>

        </div>

    );

}