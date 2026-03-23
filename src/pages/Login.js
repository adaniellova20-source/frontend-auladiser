import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await loginUser(username, password);
            navigate("/");
            window.location.reload();
        } catch (err) {
            setError(err.message || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow p-4" style={{ maxWidth: "420px", width: "100%" }}>
                <div className="card-body">
                    <h2 className="text-center mb-4">Iniciar sesión</h2>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? "Ingresando..." : "Entrar"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Login;
