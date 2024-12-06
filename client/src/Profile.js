import React, { useState } from 'react';

function Profile({ goToHome }) {
    const [name, setName] = useState('');
    const [groupCode, setGroupCode] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [feedback, setFeedback] = useState(''); // Feedback for group creation/joining
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication status
    const [password, setPassword] = useState('');

    // Simulate authentication
    const handleLogin = () => {
        if (password === password) { // Example hardcoded password
            setIsAuthenticated(true);
            setFeedback('');
        } else {
            setFeedback('Incorrect password. Try again.');
        }
    };

    // Simulate creating a group
    const createGroup = () => {
        const generatedCode = Math.floor(10000 + Math.random() * 90000); // Generate 5-digit code
        setGroupCode(generatedCode.toString());
        setFeedback(`Group created! Your group code is: ${generatedCode}`);
    };

    // Simulate joining a group
    const joinGroup = () => {
        if (joinCode.length === 5) {
            setFeedback(`Successfully joined group with code: ${joinCode}`);
        } else {
            setFeedback('Invalid group code. Must be a 5-digit number.');
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

            <h1>Profile Page</h1>

            {!isAuthenticated ? (
                <div>
                    <h3>Please Log In</h3>
                    <input
                        type="password"
                        placeholder="Enter your password"
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
                        onClick={handleLogin}
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
                        Log In
                    </button>
                    {feedback && <p style={{ color: 'red', marginTop: '10px' }}>{feedback}</p>}
                </div>
            ) : (
                <div>
                    <h3>Welcome, {name || 'Guest'}!</h3>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            marginBottom: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />
                    <br />
                    {/* Create Group */}
                    <button
                        onClick={createGroup}
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
                        Create Group
                    </button>

                    {/* Join Group */}
                    <input
                        type="text"
                        placeholder="Enter 5-digit group code"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)}
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            marginRight: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />
                    <button
                        onClick={joinGroup}
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
                        Join Group
                    </button>

                    {/* Feedback Section */}
                    {feedback && <p style={{ color: 'blue', marginTop: '20px' }}>{feedback}</p>}
                </div>
            )}
        </div>
    );
}

export default Profile;
