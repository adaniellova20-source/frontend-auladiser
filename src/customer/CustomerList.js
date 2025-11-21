import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    async function getAllCustomers() {
        try {
            const token = sessionStorage.getItem("token");

            const response = await fetch("https://api-auladiser.onrender.com/customers", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error("Error al obtener customers");
            }

            const data = await response.json();
            setCustomers(data);

            setLoading(false);

        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    }

    async function deleteCustomer(id) {

        try {
            const token = sessionStorage.getItem("token");

            const response = await fetch(`https://api-auladiser.onrender.com/customers/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error("No se pudo eliminar el cliente");
            }

            getAllCustomers();

        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        getAllCustomers();
    }, []);

    if (loading) {
        return (
            <div className="container mt-5">
                <h2>Consuntando clientes...</h2>
                <p>Cargando datos...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">

            <div className="d-flex justify-content-between mb-3">
                <h2>Listado de Clientes</h2>

                <button className="btn btn-success" onClick={() => navigate("/customers/new")}>
                    Nuevo
                </button>
            </div>

            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo eléctronico</th>
                    <th>Edad</th>
                    <th>Categoría</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {customers.map(c => (
                    <tr key={c.id}>
                        <td>{c.name}</td>
                        <td>{c.lastname}</td>
                        <td>{c.email}</td>
                        <td>{c.age}</td>
                        <td>{c.category}</td>
                        <td>
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => navigate(`/customers/${c.id}`) }
                            >
                                Ver Detalles
                            </button>
                        </td>
                        <td>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => navigate(`/customers/edit/${c.id}`) }
                            >
                                Editar
                            </button>
                        </td>
                        <td>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteCustomer(c.id)}
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerList;
