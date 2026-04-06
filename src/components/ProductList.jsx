import React, { useEffect, useState, useContext } from "react";
import { getProducts } from "../services/api";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        getProducts().then(res => {
            setProducts(res.data);
            setLoading(false);
        }).catch(err => {
            console.error("Error fetching products", err);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="loader">Loading products...</div>;

    return (
        <div>
            <h2 className="page-title">Featured Products</h2>
            <div className="product-grid">
                {products.map(product => (
                    <div className="product-card glass-effect" key={product.id}>
                        <div className="img-container">
                            <img src={product.image} alt={product.title} />
                        </div>
                        <div className="product-info">
                            <h4>{product.title.length > 30 ? product.title.substring(0, 30) + "..." : product.title}</h4>
                            <p className="price">${product.price.toFixed(2)}</p>
                            <div className="card-actions">
                                <Link to={`/product/${product.id}`} className="btn btn-outline">Details</Link>
                                <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
