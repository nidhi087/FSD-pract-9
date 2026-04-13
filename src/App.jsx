import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import { CartProvider } from "./context/CartContext";
import "./index.css";

const ProtectedRoute = ({ children }) => {
    const isAuth = !!localStorage.getItem("token");
    return isAuth ? children : <Navigate to="/login" replace />;
};

function App() {
    const isAuth = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <CartProvider>
            <BrowserRouter>
                <div className="app-wrapper">
                    <header className="header glass-nav">
                        <div className="nav-container">
                            <Link to="/" className="logo">
                                <h2>E-Shop Luxe</h2>
                            </Link>
                            <nav className="nav-links">
                                <Link to="/" className="nav-link">Home</Link>
                                {isAuth ? (
                                    <button onClick={handleLogout} className="nav-link" style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", font: "inherit", padding: 0 }}>Logout</button>
                                ) : (
                                    <Link to="/login" className="nav-link">Login</Link>
                                )}
                                <Link to="/cart" className="nav-link cart-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                    <span>Cart</span>
                                </Link>
                            </nav>
                        </div>
                    </header>
                    <main className="container main-content">
                        <Routes>
                            <Route path="/" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
                            <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
                            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </main>
                    <footer className="footer glass-nav">
                        <p>&copy; 2026 E-Shop Luxe. All rights reserved.</p>
                    </footer>
                </div>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
