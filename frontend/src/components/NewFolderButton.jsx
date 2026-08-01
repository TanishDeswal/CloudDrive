import { useState } from "react";

export default function NewFolderButton({ onCreate }) {

    const [name, setName] = useState("");

    const create = () => {

        if (!name.trim()) return;

        onCreate(name);

        setName("");

    };

    return (

        <div className="flex gap-2">

            <input
                type="text"
                placeholder="Folder name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-lg px-4 py-2"
            />

            <button
                onClick={create}
                className="bg-blue-600 text-white px-5 rounded-lg"
            >
                New Folder
            </button>

        </div>

    );

}