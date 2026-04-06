import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const { cart, cartTotal, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", address: "" });
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        setOrderPlaced(true);
        clearCart();
        setTimeout(() => {
            navigate("/");
        }, 3000);
    };

    if (orderPlaced) {
        return (
            <div className="checkout-success glass-effect">
                <h2>Order Placed Successfully!</h2>
                <p>Thank you for your purchase.</p>
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
                        <button type="submit" className="btn btn-primary btn-large w-100 mt-4">Place Order</button>
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
