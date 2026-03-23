import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers, deleteCustomer } from "../services/customerService";

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function loadCustomers() {
        try {
            setLoading(true);
            setError("");

            const token = sessionStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const data = await getCustomers();
            setCustomers(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || "Ocurrió un error al consultar clientes");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        const confirmDelete = window.confirm("¿Deseas eliminar este cliente?");
        if (!confirmDelete) return;

        try {
            await deleteCustomer(id);
            setCustomers((prevCustomers) =>
                prevCustomers.filter((customer) => customer.id !== id)
            );
        } catch (err) {
            alert(err.message || "Ocurrió un error al eliminar");
        }
    }

    useEffect(() => {
        loadCustomers();
    }, []);

    return (
        <main className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Listado de clientes</h2>

                <button
                    className="btn btn-success"
                    onClick={() => navigate("/customers/new")}
                >
                    Agregar
                </button>
            </div>

            <hr />

            {loading && <div className="alert alert-info">Cargando clientes...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && !error && customers.length === 0 && (
                <div className="alert alert-warning">No hay clientes registrados.</div>
            )}

            {!loading && !error && customers.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Edad</th>
                            <th>Fecha de cumpleaños</th>
                            <th>Categoría</th>
                            <th>Correo electrónico</th>
                            <th>URL</th>
                            <th>Ver</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                        </thead>

                        <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{customer.lastname}</td>
                                <td>{customer.age}</td>
                                <td>{customer.birthday}</td>
                                <td>{customer.category}</td>
                                <td>{customer.email}</td>
                                <td>
                                    {customer.url ? (
                                        <a href={customer.url} target="_blank" rel="noreferrer">
                                            Ir al enlace
                                        </a>
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => navigate("/customers/" + customer.id)}
                                    >
                                        Ver detalles
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => navigate("/customers/edit/" + customer.id)}
                                    >
                                        Editar
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(customer.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}

export default CustomerList;
