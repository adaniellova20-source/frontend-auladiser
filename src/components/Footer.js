function Footer() {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <div className="container text-center">
                <p className="mb-1">© 2026 Mi Aplicación</p>
                <p className="mb-0">
                    <a href="/privacidad" className="text-white text-decoration-none me-3">
                        Privacidad
                    </a>
                    <a href="/terminos" className="text-white text-decoration-none">
                        Términos
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
