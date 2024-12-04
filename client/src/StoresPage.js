import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Store = ({ addToCart }) => {
    const navigate = useNavigate();

    // Mock Data for Categories and Products
    const categories = {
        Fruits: [
            { id: 1, name: 'Apple', price: 1.5, image: 'https://via.placeholder.com/100' },
            { id: 2, name: 'Banana', price: 1.0, image: 'https://via.placeholder.com/100' },
            { id: 3, name: 'Orange', price: 2.0, image: 'https://via.placeholder.com/100' },
        ],
        Vegetables: [
            { id: 4, name: 'Carrot', price: 1.2, image: 'https://via.placeholder.com/100' },
            { id: 5, name: 'Broccoli', price: 2.5, image: 'https://via.placeholder.com/100' },
            { id: 6, name: 'Potato', price: 0.8, image: 'https://via.placeholder.com/100' },
        ],
        Dairy: [
            { id: 7, name: 'Milk', price: 3.0, image: 'https://via.placeholder.com/100' },
            { id: 8, name: 'Cheese', price: 4.0, image: 'https://via.placeholder.com/100' },
            { id: 9, name: 'Butter', price: 2.5, image: 'https://via.placeholder.com/100' },
        ],
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Store Products</h1>
            <button
                onClick={() => navigate('/')}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    fontSize: '16px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginBottom: '20px',
                }}
            >
                Back to Home
            </button>

            {/* Display Categories */}
            {Object.keys(categories).map((category) => (
                <div key={category} style={{ marginBottom: '30px' }}>
                    <h2>{category}</h2>
                    <div
                        style={{
                            display: 'flex',
                            overflowX: 'scroll',
                            gap: '10px',
                            padding: '10px',
                        }}
                    >
                        {categories[category].map((product) => (
                            <div
                                key={product.id}
                                style={{
                                    width: '150px',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '10px',
                                    textAlign: 'center',
                                }}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '100px', height: '100px', borderRadius: '5px' }}
                                />
                                <h4 style={{ margin: '10px 0' }}>{product.name}</h4>
                                <p style={{ color: '#555' }}>${product.price.toFixed(2)}</p>
                                <button
                                    onClick={() => addToCart(product)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: '#28a745',
                                        color: '#fff',
                                        fontSize: '14px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    + Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Store;
