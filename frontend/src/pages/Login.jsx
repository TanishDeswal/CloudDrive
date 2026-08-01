import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/auth";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = await login(email, password);

            localStorage.setItem("token", data.token);

            navigate("/dashboard");

        } catch (err) {

            console.log(err);
            console.log(err.response);

            setError(
                err.response?.data?.message || "Login failed"
            );

        }

    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">

                <h1 className="text-3xl font-bold text-center">
                    CloudDrive
                </h1>

                <p className="text-center text-gray-500 mb-8">
                    Login
                </p>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full border p-3 rounded"
                    />

                    <button
                        className="w-full bg-blue-600 text-white p-3 rounded"
                    >
                        Login
                    </button>

                </form>

                <p className="mt-5 text-center">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-600 ml-2"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}