import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const { cart, cartTotal, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", address: "" });
    const [paymentMethod, setPaymentMethod] = useState("credit_card");
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const [paymentError, setPaymentError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckout = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setPaymentError("");

        try {
            // Get JWT token from localStorage (set after login)
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:5000/api/payment/process", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : ""
                },
                body: JSON.stringify({ amount: cartTotal, paymentMethod })
            });

            const data = await response.json();
            setIsProcessing(false);

            if (data.success) {
                // Payment succeeded
                setTransactionId(data.transactionId);
                setOrderPlaced(true);
                clearCart();
                setTimeout(() => navigate("/"), 3000);
            } else {
                // Payment failed (backend returned success: false)
                setPaymentError(data.message || "Payment failed. Please try again.");
            }

        } catch (error) {
            console.error("Payment error:", error);
            setIsProcessing(false);
            setPaymentError("Network error. Please check your connection and try again.");
        }
    };


    if (orderPlaced) {
        return (
            <div className="checkout-success glass-effect">
                <h2>🎉 Order Placed Successfully!</h2>
                <p>Thank you for your purchase.</p>
                {transactionId && (
                    <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                        Transaction ID: <strong>{transactionId}</strong>
                    </p>
                )}
                <p>Redirecting to home in 3 seconds...</p>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="checkout-container glass-effect">
                <h2>Checkout</h2>
                <p>Your cart is empty. Add some products before checking out.</p>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h2 className="page-title">Checkout</h2>
            <div className="checkout-grid flex-container">
                <div className="checkout-form glass-effect">
                    <h3>Shipping Details</h3>
                    <form onSubmit={handleCheckout}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Shipping Address</label>
                            <textarea name="address" value={formData.address} onChange={handleChange} required className="form-control"></textarea>
                        </div>
                        
                        <div className="form-group mt-3">
                            <label>Payment Method</label>
                            <div className="payment-options" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input type="radio" name="paymentMethod" value="credit_card" checked={paymentMethod === 'credit_card'} onChange={(e) => setPaymentMethod(e.target.value)} />
                                    Credit Card
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input type="radio" name="paymentMethod" value="debit_card" checked={paymentMethod === 'debit_card'} onChange={(e) => setPaymentMethod(e.target.value)} />
                                    Debit Card
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input type="radio" name="paymentMethod" value="upi" checked={paymentMethod === 'upi'} onChange={(e) => setPaymentMethod(e.target.value)} />
                                    UPI
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input type="radio" name="paymentMethod" value="cash_on_delivery" checked={paymentMethod === 'cash_on_delivery'} onChange={(e) => setPaymentMethod(e.target.value)} />
                                    Cash on Delivery
                                </label>
                            </div>
                        </div>

                        {paymentError && (
                            <div style={{
                                background: "rgba(255,59,59,0.15)",
                                border: "1px solid rgba(255,59,59,0.5)",
                                borderRadius: "8px",
                                padding: "10px 14px",
                                color: "#ff6b6b",
                                fontSize: "0.9rem",
                                marginBottom: "10px"
                            }}>
                                ❌ {paymentError}
                            </div>
                        )}
                        <button type="submit" disabled={isProcessing} className="btn btn-primary btn-large w-100 mt-4">
                            {isProcessing ? "Processing Payment..." : "Place Order"}
                        </button>
                    </form>
                </div>
                <div className="checkout-summary glass-effect">
                    <h3>Order Summary</h3>
                    <ul className="summary-items">
                        {cart.map(item => (
                            <li key={item.id} className="summary-item">
                                <span>{item.title.substring(0, 20)}... x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="summary-total mt-4">
                        <h4>Total</h4>
                        <h4 className="price">${cartTotal.toFixed(2)}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
