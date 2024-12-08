// ReturnUser.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext'; // Adjust the path as necessary

const ReturnUser = ({ goToHome }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { login } = useContext(AuthContext); // Access the login function from context

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password_hash: password, // Sending password under 'password_hash'
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('User successfully logged in!');
                setError('');
                login(data.user); // Update the AuthContext with user data
                goToHome(); // Navigate back to the home page
            } else {
                setError(data.error || 'Invalid username or password. Please try again.');
                setSuccess('');
            }
        } catch (err) {
            setError('Failed to log in. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* Back Button */}
            <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                <button
                    onClick={goToHome}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '30px',
                    }}
                >
                    ←
                </button>
            </div>
            <h1>Returning User</h1>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{
                            padding: '10px',
                            width: '250px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            padding: '10px',
                            width: '250px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                <button
                    type="submit"
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
                    Sign In
                </button>
                
            </form>
            
        </div>
    );
};

export default ReturnUser;