import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../services/api";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        getProduct(id).then(res => {
            setProduct(res.data);
            setLoading(false);
        }).catch(err => {
            console.error("Error fetching product", err);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <div className="loader">Loading product details...</div>;
    if (!product) return <div>Product not found.</div>;

    return (
        <div className="product-detail flex-container glass-effect">
            <div className="detail-img-container">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="detail-info">
                <h2>{product.title}</h2>
                <div className="category-badge">{product.category}</div>
                <p className="description">{product.description}</p>
                <h3 className="price huge-price">${product.price.toFixed(2)}</h3>
                <div className="actions">
                    <button className="btn btn-primary btn-large" onClick={() => addToCart(product)}>
                        Add to Cart
                    </button>
                    <Link to="/" className="btn btn-secondary btn-large">Continue Shopping</Link>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
