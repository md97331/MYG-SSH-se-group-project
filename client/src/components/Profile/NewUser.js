import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext'; // Adjust the path as needed

const NewUser = ({ goToHome }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { login } = useContext(AuthContext); // Access the login function from context

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password_hash: password, // Sending password under 'password_hash'
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('User successfully created!');
                setError('');

                // Wait for 2 seconds before continuing
                await new Promise((resolve) => setTimeout(resolve, 500));
                setSuccess('User successfully created!\nLogging in...');
                await new Promise((resolve) => setTimeout(resolve, 1500));
                
                // Auto-login after successful registration
                const loginResponse = await fetch('http://localhost:5001/api/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username,
                        password_hash: password, 
                    }),
                });

                const loginData = await loginResponse.json();

                if (loginResponse.ok && loginData.user) {
                    login(loginData.user);  // Save user info in AuthContext
                    goToHome();            // Navigate to home
                } else {
                    setError('Failed to log in after registration. Please log in manually.');
                    setSuccess('');
                }
            } else {
                setError(data.error || 'Failed to create user. Please try again.');
                setSuccess('');
            }
        } catch (err) {
            setError('Failed to create user. Please try again.');
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
            <h1>New User</h1>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Enter a username"
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
                        placeholder="Enter a password"
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
                        backgroundColor: '#28a745',
                        color: '#fff',
                        fontSize: '16px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default NewUser;