import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StoresPage = ({ storeId, addToCart, goToHome, goToCart }) => {
    const [categories, setCategories] = useState({});
    const [error, setError] = useState(null);

    // Predefined fake products to supplement API products
    const predefinedProducts = {
        Pantry: [
            {
                id: 101,
                name: 'Can of Soup',
                price: 3.0,
                description: 'A hearty can of soup for a quick and easy meal.',
                image: 'https://via.placeholder.com/100',
            },
            {
                id: 103,
                name: 'Flour',
                price: 3.5,
                description: 'All-purpose flour for baking and cooking.',
                image: 'https://via.placeholder.com/100',
            },
            {
                id: 104,
                name: 'Spices',
                price: 2.5,
                description: 'A mix of essential spices to enhance your dishes.',
                image: 'https://via.placeholder.com/100',
            },
        ],
        Beverages: [
            {
                id: 106,
                name: 'Apple Juice',
                price: 2.5,
                description: 'Refreshing apple juice made from 100% real apples.',
                image: 'https://via.placeholder.com/100',
            },
            {
                id: 107,
                name: 'Beer',
                price: 0.8,
                description: 'A crisp, cold beer to relax and unwind.',
                image: 'https://via.placeholder.com/100',
            },
            {
                id: 108,
                name: 'Sparkling Water',
                price: 1.5,
                description: 'Bubbly sparkling water with a refreshing taste.',
                image: 'https://via.placeholder.com/100',
            },
        ],
        Dairy: [
            {
                id: 109,
                name: 'Milk',
                price: 5.0,
                description: 'Fresh whole milk, perfect for drinking or cooking.',
                image: 'https://via.placeholder.com/100',
            },
            {
                id: 110,
                name: 'Yogurt',
                price: 2.0,
                description: 'Creamy yogurt, available in various flavors.',
                image: 'https://via.placeholder.com/100',
            },
            {
                id: 111,
                name: 'Cream',
                price: 3.0,
                description: 'Rich and smooth cream for cooking or desserts.',
                image: 'https://via.placeholder.com/100',
            },
        ],
    };
    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/supermarkets/${storeId}/products`);
                const products = response.data.products;
    
                // Group products by category
                const groupedCategories = products.reduce((acc, product) => {
                    const category = product.category || 'Uncategorized';
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push({
                        id: product.product_id,
                        name: product.product_name,
                        price: parseFloat(product.price) || 0,
                        description: product.description || '',
                        image: 'https://via.placeholder.com/100',
                    });
                    return acc;
                }, {});
    
                setCategories(groupedCategories);
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setError('Failed to load products. Please try again later.');
            }
        };
    
        if (storeId) {
            fetchProducts();
        }
    }, [storeId]);
    

    if (error) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h1>Store Products</h1>
                <p style={{ color: 'red' }}>{error}</p>
            </div>
        );
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* Home Button */}
            <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                <button
                    onClick={goToHome}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '50px',
                    }}
                >
                    🏠
                </button>
            </div>

            {/* Shopping Cart Icon */}
            <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                <button
                    onClick={goToCart}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '50px',
                    }}
                >
                    🛒
                </button>
            </div>

            <h1>Store Products</h1>
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
                                <p style={{ color: '#555' }}>{product.description}</p>
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

export default StoresPage;
