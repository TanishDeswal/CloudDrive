import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">

            <h1 className="text-2xl font-bold text-blue-600">
                CloudDrive
            </h1>

            <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
            >
                Logout
            </button>

        </nav>

    );

}