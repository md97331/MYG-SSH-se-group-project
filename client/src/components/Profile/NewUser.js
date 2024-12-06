import React, { useState } from 'react';
import axios from 'axios';

function NewUser({ goToHome }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [groupCode, setGroupCode] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSignUp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/check-username', { username });
            if (response.data.exists) {
                setFeedback('Username is already taken. Please choose another.');
            } else {
                await axios.post('http://localhost:5000/api/create-user', { username, password });
                setFeedback('Sign up successful!');
                goToHome();
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setFeedback('An error occurred. Please try again.');
        }
    };

    const createGroupCode = () => {
        const generatedCode = Math.floor(10000 + Math.random() * 90000); // Generate 5-digit code
        setGroupCode(generatedCode.toString());
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
            <h1>New User</h1>
            <input
                type="text"
                placeholder="Enter a username"
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
                type="password"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                onClick={createGroupCode}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    fontSize: '16px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '10px',
                }}
            >
                Generate Group Code
            </button>
            {groupCode && <p>Your Group Code: {groupCode}</p>}
            <br />
            <button
                onClick={handleSignUp}
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
                Sign Up
            </button>
            {feedback && <p style={{ color: 'blue', marginTop: '10px' }}>{feedback}</p>}
        </div>
    );
}

export default NewUser;
