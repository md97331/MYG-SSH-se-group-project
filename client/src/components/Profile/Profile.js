// Profile.js
import React, { useState, useContext } from 'react';
import ReturnUser from './ReturnUser'; // Import the ReturnUser component
import NewUser from './NewUser'; // Import the NewUser component
import { AuthContext } from '../../AuthContext'; // Import AuthContext

function Profile({ goToHome }) {
    const [currentPage, setCurrentPage] = useState(''); // Tracks whether user selects returning or new user
    const { user, logout } = useContext(AuthContext); // Access user and logout from context

    if (user) {
        // If user is logged in, display user info and logout button
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
                <h1>Welcome, {user.username}!</h1>
                <p>User ID: {user.id}</p>
                <p>Group ID: {user.group_id || 'No Group Assigned'}</p>
                <button
                    onClick={logout}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        fontSize: '16px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '20px',
                    }}
                >
                    Logout
                </button>
            </div>
        );
    }

    if (currentPage === 'returning') {
        return <ReturnUser goToHome={() => setCurrentPage('')} />;
    }

    if (currentPage === 'new') {
        return <NewUser goToHome={() => setCurrentPage('')} />;
    }

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
            <button
                onClick={() => setCurrentPage('returning')}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    fontSize: '16px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '10px',
                }}
            >
                Returning User
            </button>
            <button
                onClick={() => setCurrentPage('new')}
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
    );
}

export default Profile;