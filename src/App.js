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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: process.env.REACT_APP_USER,
                    password: process.env.REACT_APP_PASSWORD
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
