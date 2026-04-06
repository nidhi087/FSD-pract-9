import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
    const { cart, removeFromCart, cartTotal } = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div className="cart-empty glass-effect">
                <h2>Your Cart is Empty</h2>
                <Link to="/" className="btn btn-primary mt-4 d-inline-block">Browse Products</Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2 className="page-title">Shopping Cart</h2>
            <div className="cart-items">
                {cart.map(item => (
                    <div className="cart-item glass-effect" key={item.id}>
                        <img src={item.image} alt={item.title} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h4>{item.title}</h4>
                            <p className="price">${item.price.toFixed(2)}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <div className="cart-item-actions">
                            <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-summary glass-effect">
                <h3>Total: <span className="price">${cartTotal.toFixed(2)}</span></h3>
                <Link to="/checkout" className="btn btn-primary btn-large w-100 text-center">Proceed to Checkout</Link>
            </div>
        </div>
    );
}

export default Cart;
