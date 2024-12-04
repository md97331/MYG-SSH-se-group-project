import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [zipCode, setZipCode] = useState('');
    const [stores, setStores] = useState([]);
    const [message, setMessage] = useState('');

    // Fetch initial message from Flask backend
    useEffect(() => {
        axios.get('http://localhost:5000/api/message')
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch((error) => {
                console.error('Error fetching message:', error);
            });
    }, []);

    // Handle ZIP code submission
    const handleZipSubmit = () => {
        if (zipCode) {
            // Mock store data (replace this with a real API call if needed)
            const mockStores = [
                { id: 1, name: 'Grocery Mart', address: '123 Market St', image: 'https://via.placeholder.com/100' },
                { id: 2, name: 'Fresh Foods', address: '456 Main Ave', image: 'https://via.placeholder.com/100' },
                { id: 3, name: 'Quick Groceries', address: '789 Center Blvd', image: 'https://via.placeholder.com/100' },
            ];
            setStores(mockStores);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
            

            {/* Location Input */}
            <div style={{ marginTop: '30px' }}>
                <h2>Enter Your Location</h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    <span role="img" aria-label="location" style={{ fontSize: '24px' }}>📍</span>
                    <input
                        type="text"
                        placeholder="Enter ZIP Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
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
            </div>

            {/* Display Stores */}
            <div style={{ marginTop: '40px' }}>
                <h2>Available Stores</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    {stores.map((store) => (
                        <div
                            key={store.id}
                            style={{
                                width: '200px',
                                padding: '20px',
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                textAlign: 'center',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <img
                                src={store.image}
                                alt={store.name}
                                style={{ width: '100px', height: '100px', borderRadius: '10px' }}
                            />
                            <h3 style={{ margin: '10px 0' }}>{store.name}</h3>
                            <p style={{ color: '#555' }}>{store.address}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
