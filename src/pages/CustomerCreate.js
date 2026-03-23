import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createCustomer } from "../services/customerService";

function CustomerCreate() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [category, setCategory] = useState("A");
    const [url, setUrl] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const token = sessionStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const data = {
                name,
                lastname,
                email,
                age: Number(age),
                birthday,
                category,
                url
            };

            await createCustomer(data);
            navigate("/customers");
        } catch (err) {
            setError(err.message || "Ocurrió un error al guardar");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="container mt-5">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Nuevo cliente</h2>
                <Link to="/customers" className="btn btn-secondary">
                    Volver
                </Link>
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Nombre
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">
                        Apellido
                    </label>
                    <input
                        id="lastname"
                        type="text"
                        className="form-control"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                        Categoría
                    </label>
                    <select
                        name="category"
                        id="category"
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                        Edad
                    </label>
                    <input
                        id="age"
                        type="number"
                        min="0"
                        className="form-control"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="url" className="form-label">
                        URL
                    </label>
                    <input
                        id="url"
                        type="url"
                        className="form-control"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="birthday" className="form-label">
                        Fecha de cumpleaños
                    </label>
                    <input
                        id="birthday"
                        type="date"
                        className="form-control"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Guardar"}
                </button>
            </form>
        </main>
    );
}

export default CustomerCreate;
