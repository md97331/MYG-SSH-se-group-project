import React, { useState } from 'react';
import axios from 'axios';

function ReturnUser({ goToHome }) {
    const [username, setUsername] = useState('');
    const [groupCode, setGroupCode] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/check-username', { username });
            if (response.data.exists) {
                setFeedback('Sign in successful!');
                goToHome();
            } else {
                setFeedback('Username does not exist. Please sign up first.');
            }
        } catch (error) {
            console.error('Error checking username:', error);
            setFeedback('An error occurred. Please try again.');
        }
    };

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
                        fontSize: '30px',
                    }}
                >
                    🏠
                </button>
            </div>
            <h1>Returning User</h1>
            <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    marginBottom: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            />
            <br />
            <input
                type="text"
                placeholder="Enter group code (optional)"
                value={groupCode}
                onChange={(e) => setGroupCode(e.target.value)}
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    marginBottom: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            />
            <br />
            <button
                onClick={handleSignIn}
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
            {feedback && <p style={{ color: 'blue', marginTop: '10px' }}>{feedback}</p>}
        </div>
    );
}

export default ReturnUser;
