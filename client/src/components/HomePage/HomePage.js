// HomePage.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import React, { useState } from 'react';
import Cart from '../Cart/cart'; // Import Cart
import Profile from '../Profile/Profile'; // Import Profile
import StoresPage from '../StoresPage/StoresPage'; // Import StoresPage
import { AuthContext } from '../../AuthContext'; // Import AuthContext

function HomePage() {
    const { user } = useContext(AuthContext); // Access user from context
    const [currentPage, setCurrentPage] = useState({ name: 'home', storeId: null }); // Tracks the current page
    const [zipCode, setZipCode] = useState('');
    const [stores, setStores] = useState([]);
    const [error, setError] = useState(''); // Error message state for ZIP code validation
    const [cart, setCart] = useState([]); // Cart state

    // Handle ZIP code submission
    const handleZipSubmit = async () => {
        if (zipCode.length > 7) {
            setError('ZIP code cannot exceed 7 characters.');
            return;
        }
        setError(''); // Clear any previous errors

        try {
            // Fetch supermarkets from the backend
            const response = await axios.get('http://localhost:5001/api/supermarkets');
            const supermarkets = response.data.supermarkets;

            // Randomly select 3 supermarkets
            const randomStores = supermarkets.sort(() => 0.5 - Math.random()).slice(0, 3);
            setStores(randomStores);
        } catch (err) {
            console.error('Failed to fetch supermarkets:', err);
            setError('Failed to load supermarkets. Please try again later.');
        }
    };

    // Handle ZIP code input change with length restriction
    const handleZipChange = (e) => {
        const value = e.target.value;
        if (value.length <= 7) {
            setZipCode(value);
        }
    };

const addToCart = (product) => {
            const payload = {
                group_id: 1,
                product_name: product.name,
                added_by_user: 1,
                action: "add",
                quantity: 1
            };
        
            // Make the API call
            fetch('http://localhost:5001/api/cart/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to update cart');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data.message); // Log success message
                    setCart((prevCart) => {
                        const existingItem = prevCart.find((item) => item.name === product.name);
                        if (existingItem) {
                            return prevCart.map((item) =>
                                item.name === product.name
                                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                                    : item
                            );
                        } else {
                            return [...prevCart, { ...product, quantity: 1 }];
                        }
                    });
                })
                .catch((error) => {
                    console.error('Error adding to cart:', error);
                });
        };

    // Render the appropriate page based on `currentPage`
    if (currentPage.name === 'stores') {
        return (
            <StoresPage
                storeId={currentPage.storeId}
                addToCart={addToCart}
                goToHome={() => setCurrentPage({ name: 'home', storeId: null })}
                goToCart={() => setCurrentPage({ name: 'cart', storeId: null })}
            />
        );
    }

    if (currentPage.name === 'cart') {
        return (
            <Cart
                cart={cart}
                goToHome={() => setCurrentPage({ name: 'home', storeId: null })}
            />
        );
    }

    if (currentPage.name === 'profile') {
        return (
            <Profile
                goToHome={() => setCurrentPage({ name: 'home', storeId: null })}
            />
        );
    }

    // Render the home page
    return (
        <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* Profile Icon */}
            <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                <button
                    onClick={() => setCurrentPage({ name: 'profile', storeId: null })}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '30px',
                    }}
                >
                    👤
                </button>
            </div>

            {/* Shopping Cart Icon */}
            <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                <button
                    onClick={() => setCurrentPage({ name: 'cart', storeId: null })}
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

            <h1>
                {user ? `Welcome, ${user.username}!` : 'Welcome to Group Delivery!'}
            </h1>
            <p>Find your supermarket below</p>

            {/* Location Input */}
            <div style={{ marginTop: '30px' }}>
                <h2>Enter Your Location</h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    <span role="img" aria-label="location" style={{ fontSize: '24px' }}>📍</span>
                    <input
                        type="text"
                        placeholder="Enter ZIP Code"
                        value={zipCode}
                        onChange={handleZipChange}
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    />
                    <button
                        onClick={handleZipSubmit}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            fontSize: '16px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Submit
                    </button>
                </div>
                {/* Display error message */}
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </div>

            {/* Display Stores */}
            <div style={{ marginTop: '40px' }}>
                <h2>Available Stores</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    {stores.map((store) => (
                        <div
                            key={store.supermarket_id}
                            style={{
                                width: '200px',
                                padding: '20px',
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                textAlign: 'center',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <h3 style={{ margin: '10px 0' }}>{store.name}</h3>
                            <p style={{ color: '#555' }}>{store.location}</p>
                            <button
                                onClick={() => setCurrentPage({ name: 'stores', storeId: store.supermarket_id })}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#28a745',
                                    color: '#fff',
                                    fontSize: '14px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    marginTop: '10px',
                                }}
                                aria-label="Visit Store"
                            >
                                Visit Store
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;