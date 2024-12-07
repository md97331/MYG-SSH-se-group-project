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
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  // Render page based on the current state
  if (currentPage === "newUser") {
    return <NewUser onBack={() => setCurrentPage("profile")} />;
  }

  if (currentPage === "returnUser") {
    return <ReturnUser onBack={() => setCurrentPage("profile")} />;
  }

  return (
    <div>
      <h1>Welcome to the Profile Page</h1>
      {userList.length === 0 ? (
        // If there are no users in the database
        <div>
          <p>No users exist yet. Please create a new user to proceed.</p>
          <button onClick={() => setCurrentPage("newUser")}>New User</button>
        </div>
      ) : (
        // If there are users in the database
        <div>
          <p>Welcome! Please choose an option below:</p>
          <button onClick={() => setCurrentPage("newUser")}>New User</button>
          <button onClick={() => setCurrentPage("returnUser")}>Return User</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
