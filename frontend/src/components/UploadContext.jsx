import { createContext, useContext, useState } from "react";

const UploadContext = createContext();

export function UploadProvider({ children }) {

    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [fileName, setFileName] = useState("");
    const [controller, setController] = useState(null);

    return (
        <UploadContext.Provider
            value={{
                uploading,
                setUploading,

                progress,
                setProgress,

                fileName,
                setFileName,

                controller,
                setController
            }}
        >
            {children}
        </UploadContext.Provider>
    );
}

export const useUpload = () => useContext(UploadContext);