import React, { useState } from 'react';

const ReturnUser = ({ goToHome }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password_hash: password,
                }),
            });

            if (response.ok) {
                setSuccess('User successfully logged in!');
                setError('');
            } else {
                setError('Invalid username or password. Please try again.');
            }
        } catch (err) {
            setError('Failed to log in. Please try again.');
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
                <div>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={{ marginTop: '10px' }}>
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default ReturnUser;
