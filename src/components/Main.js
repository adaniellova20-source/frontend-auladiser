import Card from "./Card";

function Main() {
    return (
        <main className="container py-5">
            <section className="row mb-4">
                <div className="col-12 text-center">
                    <h1 className="fw-bold">Panel Principal</h1>
                    <p className="text-muted">Ejemplo de sección main con Bootstrap</p>
                </div>
            </section>

            <section className="row g-4">
                <Card
                    title="Usuarios"
                    text="Gestión de usuarios registrados."
                    btnType="secondary"
                    url="/usuarios"
                />

                <Card
                    title="Reportes"
                    text="Consulta reportes del sistema."
                    btnType="primary"
                    url="/reportes"
                />

                <Card
                    title="Configuración"
                    text="Ajustes generales de la aplicación."
                    btnType="success"
                    url="/config"
                />
            </section>
        </main>
    );
}

export default Main;
