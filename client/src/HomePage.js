import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

function HomePage() {
    const [zipCode, setZipCode] = useState('');
    const [stores, setStores] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleZipSubmit = async () => {
        if (zipCode.length > 7) {
            setError('ZIP code cannot exceed 7 characters.');
            return;
        }
        setError('');
        try {
            const response = await axios.get('http://localhost:5001/api/supermarkets');
            const allStores = response.data.supermarkets;
            if (allStores.length === 0) {
                setStores([]);
                return;
            }
            setStores(allStores.sort(() => 0.5 - Math.random()).slice(0, 3));
        } catch {
            setError('Failed to fetch supermarkets. Please try again later.');
        }
    };

    const handleZipChange = (e) => {
        const value = e.target.value;
        if (value.length <= 7) {
            setZipCode(value);
        }
    };

    return (
        <div className="home-container">
            <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                <button
                    onClick={() => navigate('/cart')}
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
            <h1>Welcome to Group Delivery!</h1>
            <div className="location-input">
                <h2>Enter Your Location</h2>
                <div className="input-group">
                    <span className="location-icon" role="img" aria-label="location">📍</span>
                    <input
                        type="text"
                        placeholder="Enter ZIP Code"
                        value={zipCode}
                        onChange={handleZipChange}
                        className="zip-input"
                    />
                    <button
                        onClick={handleZipSubmit}
                        className="submit-button"
                    >
                        Submit
                    </button>
                </div>
                {error && <p className="error-message">{error}</p>}
            </div>
            {stores.length > 0 && (
                <div className="stores-section">
                    <h2>Available Stores</h2>
                    <div className="stores-list">
                        {stores.map((store) => (
                            <div
                                key={store.supermarket_id}
                                className="store-card"
                                onClick={() => navigate(`/stores/${store.supermarket_id}`)}
                            >
                                <h3 className="store-name">{store.name}</h3>
                                <p>{store.location}</p>
                                <button className="view-products-button">
                                    View Products
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;