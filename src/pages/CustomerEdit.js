import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCustomerById, updateCustomer } from "../services/customerService";

function CustomerEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [category, setCategory] = useState("A");
    const [url, setUrl] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    async function loadCustomer() {
        try {
            setLoading(true);
            setError("");

            const token = sessionStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const data = await getCustomerById(id);

            setName(data?.name || "");
            setLastname(data?.lastname || "");
            setAge(data?.age || "");
            setEmail(data?.email || "");
            setBirthday(data?.birthday || "");
            setCategory(data?.category || "A");
            setUrl(data?.url || "");
        } catch (err) {
            setError(err.message || "Error al cargar cliente");
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            const token = sessionStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const body = {
                name,
                lastname,
                email,
                age: Number(age),
                birthday,
                category,
                url
            };

            await updateCustomer(id, body);
            navigate("/customers/" + id);
        } catch (err) {
            setError(err.message || "Error al actualizar");
        } finally {
            setSaving(false);
        }
    }

    useEffect(() => {
        loadCustomer();
    }, [id]);

    return (
        <main className="container mt-5">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Editar cliente</h2>
                <Link to="/customers" className="btn btn-secondary">
                    Volver
                </Link>
            </div>

            {loading && <div className="alert alert-info mt-3">Cargando...</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {!loading && (
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Apellido</label>
                        <input
                            type="text"
                            className="form-control"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Categoría</label>
                        <select
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
                        <label className="form-label">Edad</label>
                        <input
                            type="number"
                            min="0"
                            className="form-control"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">URL</label>
                        <input
                            type="url"
                            className="form-control"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Fecha de cumpleaños</label>
                        <input
                            type="date"
                            className="form-control"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </div>

                    <button className="btn btn-primary" disabled={saving}>
                        {saving ? "Guardando..." : "Guardar cambios"}
                    </button>
                </form>
            )}
        </main>
    );
}

export default CustomerEdit;
