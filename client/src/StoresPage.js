import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './StoresPage.css';

function StoresPage() {
    const { supermarket_id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/supermarkets/${supermarket_id}/products`);
                const products = response.data.products;

                const groupedCategories = {};
                products.forEach((product) => {
                    if (!groupedCategories[product.category]) {
                        groupedCategories[product.category] = [];
                    }
                    groupedCategories[product.category].push(product);
                });

                setCategories(groupedCategories);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [supermarket_id]);

    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="stores-container">
            <div className="home-button">
                <button
                    className="icon-button"
                    onClick={() => navigate('/')}
                    title="Home"
                >
                    🏠
                </button>
            </div>
            <div className="cart-button">
                <button
                    className="icon-button"
                    onClick={() => navigate('/cart')}
                    title="Cart"
                >
                    🛒
                </button>
            </div>
            <h1>Supermarket Products</h1>
            {Object.keys(categories).length > 0 ? (
                Object.keys(categories).map((category) => (
                    <div key={category} className="category-section">
                        <h2>{category}</h2>
                        <div className="products-container">
                            {categories[category].map((product) => (
                                <div key={product.product_id} className="product-card">
                                    <img
                                        src={product.image || 'https://via.placeholder.com/100'}
                                        alt={product.product_name}
                                        className="product-image"
                                    />
                                    <h3>{product.product_name}</h3>
                                    <p>${parseFloat(product.price).toFixed(2)}</p>
                                    <button className="add-button">
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>No products available in this supermarket.</p>
            )}
        </div>
    );
}

export default StoresPage;