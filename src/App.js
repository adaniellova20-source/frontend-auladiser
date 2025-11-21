import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";

import CustomerList from "./customer/CustomerList";
import CustomerDetail from "./customer/CustomerDetail";
import CustomerCreate from "./customer/CustomerCreate";
import CustomerEdit from "./customer/CustomerEdit";

function App() {

    async function getToken() {
        try {
            const response = await fetch("https://api-auladiser.onrender.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: 'admin',
                    password: '12345'
                })
            });

            if (!response.ok) {
                alert("Credenciales incorrectas");
                return;
            }

            const token = await response.text();

            sessionStorage.setItem("token", token);

        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(()=>{
        getToken();
    }, []);

    return (
        <BrowserRouter>
            <Navbar />

            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<h2>Inicio</h2>} />

                    <Route path="/customers" element={<CustomerList/>} />
                    <Route path="/customers/new" element={<CustomerCreate />} />
                    <Route path="/customers/edit/:id" element={<CustomerEdit />} />
                    <Route path="/customers/:id" element={<CustomerDetail />} />

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
