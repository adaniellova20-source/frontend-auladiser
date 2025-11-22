import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerCreate() {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [category, setCategory] = useState("A");
    const [url, setUrl] = useState("");

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    async function createCustomer(){
        try {
            const token = sessionStorage.getItem("token");

            const response = await fetch(`${process.env.REACT_APP_API_URL}/customers`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    lastname: lastname,
                    email: email,
                    age: Number(age),
                    birthday: birthday,
                    category: category,
                    url: url
                })
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                setErrors(data);
                return;
            }

            navigate("/customers");
        } catch (err) {
            console.error(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        createCustomer();
    };

    const hasError = (field) => errors && errors[field];

    return (
        <div className="container mt-5">
            <h2>Nuevo Cliente</h2>

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
                    {hasError("name") && (
                        <div className="invalid-feedback">
                            {errors.name[0]}
                        </div>
                    )}
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
                    {hasError("lastname") && (
                        <div className="invalid-feedback">
                            {errors.lastname[0]}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        className={`form-control ${hasError("email") ? "is-invalid" : ""}`}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    {hasError("email") && (
                        <div className="invalid-feedback">
                            {errors.email[0]}
                        </div>
                    )}
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
                    {hasError("age") && (
                        <div className="invalid-feedback">
                            {errors.age[0]}
                        </div>
                    )}
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
                    {hasError("category") && (
                        <div className="invalid-feedback">
                            {errors.category[0]}
                        </div>
                    )}
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
                    {hasError("birthday") && (
                        <div className="invalid-feedback">
                            {errors.birthday[0]}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="url" className="form-label">URL</label>
                    <input
                        id="url"
                        type="url"
                        className={`form-control ${hasError("url") ? "is-invalid" : ""}`}
                        placeholder="https://ejemplo.com"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />
                    {hasError("url") && (
                        <div className="invalid-feedback">
                            {errors.url[0]}
                        </div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary">
                    Guardar
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

export default CustomerCreate;
