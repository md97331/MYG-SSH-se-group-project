import React, { useState } from 'react';
import ReturnUser from './ReturnUser'; // Import the ReturnUser component
import NewUser from './NewUser'; // Import the NewUser component

function Profile({ goToHome }) {
    const [currentPage, setCurrentPage] = useState(''); // Tracks whether user selects returning or new user

    if (currentPage === 'returning') {
        return <ReturnUser goToHome={goToHome} />;
    }

    if (currentPage === 'new') {
        return <NewUser goToHome={goToHome} />;
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
