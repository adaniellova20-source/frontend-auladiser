import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CustomerEdit() {
    const { id } = useParams();

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [birthday, setBirthday] = useState("");
    const [category, setCategory] = useState("A");
    const [url, setUrl] = useState("");

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    async function getCustomer() {
        try {
            const token = sessionStorage.getItem("token");

            const response = await fetch(`${process.env.REACT_APP_API_URL}/customers/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error("No se pudo obtener el cliente");
            }

            const data = await response.json();

            setName(data.name);
            setLastname(data.lastname);
            setAge(data.age);
            setBirthday(data.birthday);
            setCategory(data.category);
            setUrl(data.url);

            setLoading(false);

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    async function updateCustomer(){
        try {
            const token = sessionStorage.getItem("token");

            const response = await fetch(`${process.env.REACT_APP_API_URL}/customers/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    lastname,
                    age: Number(age),
                    birthday,
                    category,
                    url
                })
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                setErrors(data || {});
                return;
            }

            navigate("/customers");

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCustomer();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors({});

        updateCustomer();
    }

    const hasError = (field) => !!errors[field];
    const firstError = (field) =>
        hasError(field)
            ? Array.isArray(errors[field])
                ? errors[field][0]
                : errors[field]
            : null;

    if (loading) {
        return (
            <div className="container mt-5">
                <h2>Editando cliente...</h2>
                <p>Cargando datos...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2>Editar Cliente</h2>

            <form onSubmit={handleSubmit} className="mt-5">

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        className={`form-control ${hasError("name") ? "is-invalid" : ""}`}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    {hasError("name") && <div className="invalid-feedback">{firstError("name")}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Apellido</label>
                    <input
                        id="lastname"
                        type="text"
                        className={`form-control ${hasError("lastname") ? "is-invalid" : ""}`}
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                        required
                    />
                    {hasError("lastname") && <div className="invalid-feedback">{firstError("lastname")}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Edad</label>
                    <input
                        id="age"
                        type="number"
                        className={`form-control ${hasError("age") ? "is-invalid" : ""}`}
                        value={age}
                        min="1"
                        onChange={e => setAge(e.target.value)}
                        required
                    />
                    {hasError("age") && <div className="invalid-feedback">{firstError("age")}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Categoría</label>
                    <select
                        id="category"
                        className={`form-select ${hasError("category") ? "is-invalid" : ""}`}
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="A">Categoría A</option>
                        <option value="B">Categoría B</option>
                        <option value="C">Categoría C</option>
                    </select>
                    {hasError("category") && <div className="invalid-feedback">{firstError("category")}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="birthday" className="form-label">Fecha de nacimiento</label>
                    <input
                        id="birthday"
                        type="date"
                        className={`form-control ${hasError("birthday") ? "is-invalid" : ""}`}
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}
                    />
                    {hasError("birthday") && <div className="invalid-feedback">{firstError("birthday")}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="url" className="form-label">URL</label>
                    <input
                        id="url"
                        type="url"
                        className={`form-control ${hasError("url") ? "is-invalid" : ""}`}
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />
                    {hasError("url") && <div className="invalid-feedback">{firstError("url")}</div>}
                </div>

                <button type="submit" className="btn btn-primary">
                    Guardar cambios
                </button>

                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate("/customers")}
                >
                    Cancelar
                </button>

            </form>
        </div>
    );
}

export default CustomerEdit;
