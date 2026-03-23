import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getCustomerById } from "../services/customerService";

function CustomerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
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
            setCustomer(data);
        } catch (err) {
            setError(err.message || "Ocurrió un error al consultar el cliente");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCustomer();
    }, [id]);

    return (
        <main className="container mt-5">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Detalle del cliente</h2>
                <Link to="/customers" className="btn btn-secondary">
                    Volver
                </Link>
            </div>

            {loading && <div className="alert alert-info mt-3">Cargando cliente...</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {!loading && !error && customer && (
                <div className="card p-4 mt-3">
                    <p>
                        <strong>Nombre: </strong>
                        {customer.name}
                    </p>
                    <p>
                        <strong>Apellido: </strong>
                        {customer.lastname}
                    </p>
                    <p>
                        <strong>Edad: </strong>
                        {customer.age}
                    </p>
                    <p>
                        <strong>Fecha de nacimiento: </strong>
                        {customer.birthday}
                    </p>
                    <p>
                        <strong>Categoría: </strong>
                        {customer.category}
                    </p>
                    <p>
                        <strong>Correo electrónico: </strong>
                        {customer.email}
                    </p>
                    <p>
                        <strong>URL: </strong>
                        {customer.url ? (
                            <a href={customer.url} target="_blank" rel="noreferrer">
                                Ir al enlace
                            </a>
                        ) : (
                            "Sin URL"
                        )}
                    </p>
                </div>
            )}
        </main>
    );
}

export default CustomerDetail;
