import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CustomerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState();

    const [loading, setLoading] = useState(true);

    async function getCustomer() {
        try {
            const token = sessionStorage.getItem("token");

            const response = await fetch(`https://api-auladiser.onrender.com/customers/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error("No se pudo obtener el cliente");
            }

            const data = await response.json();
            setCustomer(data);

            setLoading(false);

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getCustomer();
    }, []);

    if (loading) {
        return (
            <div className="container mt-5">
                <h2>Consuntando detalles de cliente...</h2>
                <p>Cargando datos...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between">
                <h2>Detalle del Cliente</h2>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/customers/edit/${id}`)}
                >
                    Editar
                </button>
            </div>

            <div className="card p-4 mt-3">
                <p><strong>Nombre:</strong> {customer?.name}</p>
                <p><strong>Apellido:</strong> {customer?.lastname}</p>
                <p><strong>Correo electrónico:</strong> {customer?.email}</p>
                <p><strong>Edad:</strong> {customer?.age}</p>
                <p><strong>Fecha de nacimiento:</strong> {customer?.birthday}</p>
                <p><strong>Categoría:</strong> {customer?.category}</p>
                <p><strong>URL:</strong> {customer?.url}</p>
            </div>

        </div>
    );
}

export default CustomerDetail;
