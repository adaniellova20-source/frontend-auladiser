import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/NavBar";
import Main from "./components/Main";
import Login from "./pages/Login";
import CustomerList from "./pages/CustomerList";
import CustomerDetail from "./pages/CustomerDetail";
import CustomerCreate from "./pages/CustomerCreate";
import CustomerEdit from "./pages/CustomerEdit";
import Footer from "./components/Footer";


function ProtectedRoute({ children }) {
    const token = sessionStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
}

function App() {
    const isAuthenticated = !!sessionStorage.getItem("token");

    return (
        <div className="d-flex flex-column min-vh-100">
            {isAuthenticated && <Navbar />}

            <div className="flex-grow-1">
                <Routes>
                    <Route
                        path="/login"
                        element={
                            isAuthenticated ? <Navigate to="/main" replace /> : <Login />
                        }
                    />

                    <Route
                        path="/"
                        element={
                            isAuthenticated ? (
                                <Navigate to="/main" replace />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    <Route
                        path="/main"
                        element={
                            <ProtectedRoute>
                                <Main />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/customers"
                        element={
                            <ProtectedRoute>
                                <CustomerList />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/customers/new"
                        element={
                            <ProtectedRoute>
                                <CustomerCreate />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/customers/:id"
                        element={
                            <ProtectedRoute>
                                <CustomerDetail />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/customers/edit/:id"
                        element={
                            <ProtectedRoute>
                                <CustomerEdit />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>

            {isAuthenticated && <Footer />}
        </div>
    );
}

export default App;
