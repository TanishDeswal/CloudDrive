import {
    Folder,
    ChevronRight,
    Trash2,
    Pencil
} from "lucide-react";

export default function FolderList({
    folders,
    currentFolder,
    onSelect,
    onDelete,
    onRename
}) {

    return (

        <div className="space-y-2">

            {folders.length === 0 && (

                <div className="text-gray-400 text-center mt-8">
                    No folders
                </div>

            )}

            {folders.map((folder) => (

                <div
                    key={folder.id}
                    className={`
                        w-full
                        flex
                        items-center
                        justify-between
                        rounded-lg
                        p-3
                        transition
                        ${
                            currentFolder === folder.id
                                ? "bg-blue-100 text-blue-700"
                                : "hover:bg-gray-100"
                        }
                    `}

                >

                    {/* Folder Button */}

                    <button
                        onClick={() => onSelect(folder)}
                        className="flex items-center gap-3 flex-1 text-left"
                    >

                        <Folder size={22} />

                        <span className="font-medium">
                            {folder.name}
                        </span>

                    </button>

                    {/* Right Side Icons */}

                    <div className="flex items-center gap-2">

                        <button
                            onClick={() =>
                                onRename(folder.id, folder.name)
                            }
                            className="text-blue-500 hover:text-blue-700"
                            title="Rename Folder"
                        >
                            <Pencil size={18} />
                        </button>

                        <button
                            onClick={() =>
                                onDelete(folder.id)
                            }
                            className="text-red-500 hover:text-red-700"
                            title="Delete Folder"
                        >
                            <Trash2 size={18} />
                        </button>

                        <ChevronRight
                            size={18}
                            className="text-gray-400"
                        />

                    </div>

                </div>

            ))}

        </div>

    );

}