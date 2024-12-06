import React, { useState } from 'react';

function Profile({ goToHome }) {
    const [isReturningUser, setIsReturningUser] = useState(null); // Tracks if the user is new or returning
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [groupCode, setGroupCode] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [feedback, setFeedback] = useState('');

    // Simulate group code creation
    const createGroup = () => {
        const generatedCode = Math.floor(10000 + Math.random() * 90000); // Generate 5-digit code
        setGroupCode(generatedCode.toString());
        setFeedback(`Group created! Your group code is: ${generatedCode}`);
    };

    // Simulate sign-in for returning user
    const handleSignIn = () => {
        setFeedback('Successfully signed in! Redirecting...');
        setTimeout(goToHome, 1500); // Simulate redirect to home page
    };

    // Simulate sign-up for new user
    const handleSignUp = () => {
        setFeedback('Account created! Redirecting to homepage...');
        setTimeout(goToHome, 1500); // Simulate redirect to home page
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

            {isReturningUser === null ? (
                <div>
                    <h2>Are you a returning user or a new user?</h2>
                    <button
                        onClick={() => setIsReturningUser(true)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            fontSize: '16px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            margin: '10px',
                        }}
                    >
                        Returning User
                    </button>
                    <button
                        onClick={() => setIsReturningUser(false)}
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
                        New User
                    </button>
                </div>
            ) : isReturningUser ? (
                <div>
                    <h3>Returning User</h3>
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
                    <input
                        type="text"
                        placeholder="Enter group code (optional)"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)}
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
                        onClick={createGroup}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#6c757d',
                            color: '#fff',
                            fontSize: '16px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginBottom: '10px',
                        }}
                    >
                        Create Group Code
                    </button>
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
                </div>
            ) : (
                <div>
                    <h3>New User</h3>
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
                    <input
                        type="password"
                        placeholder="Create a password"
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
                    <input
                        type="text"
                        placeholder="Enter group code to join (optional)"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)}
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
                        onClick={handleSignUp}
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
                </div>
            )}
            {feedback && <p style={{ color: 'blue', marginTop: '20px' }}>{feedback}</p>}
        </div>
    );
}

export default Profile;
