// Profile.js
import React, { useState, useContext } from "react";
import ReturnUser from "./ReturnUser"; // Import the ReturnUser component
import NewUser from "./NewUser"; // Import the NewUser component
import { AuthContext } from "../../AuthContext"; // Import AuthContext

function Profile({ goToHome }) {
  const [currentPage, setCurrentPage] = useState(""); // Tracks whether user selects returning or new user
  const { user, logout } = useContext(AuthContext); // Access user and logout from context

  // Group management states
  const [groupCode, setGroupCode] = useState(""); // Holds the generated group code
  const [joinGroupCode, setJoinGroupCode] = useState(""); // Holds the input group code
  const [joinGroupMessage, setJoinGroupMessage] = useState(""); // Message for joining a group

  // Function to generate a random 5-digit group code
  const handleCreateGroupCode = () => {
    const code = Math.floor(10000 + Math.random() * 90000).toString(); // Generate a random 5-digit code
    setGroupCode(code);
    setJoinGroupMessage(""); // Clear any previous join group messages
  };

  // Function to handle joining a group
  const handleJoinGroup = () => {
    if (joinGroupCode.length === 5 && !isNaN(joinGroupCode)) {
      setJoinGroupMessage(`You joined group ${joinGroupCode}!`);
    } else {
      setJoinGroupMessage("Invalid group code. Please enter a 5-digit number.");
    }
  };

  // If user is logged in, display their details and logout option
  if (user) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px", fontFamily: "Arial, sans-serif" }}>
        {/* Home Button */}
        <div style={{ position: "absolute", top: "20px", left: "20px" }}>
          <button
            onClick={goToHome}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "30px",
            }}
          >
            🏠
          </button>
        </div>
        <h1>Welcome, {user.username}!</h1>
        <p>User ID: {user.id}</p>
        <p>Group ID: {user.group_id || "No Group Assigned"}</p>
        <button
          onClick={logout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "#fff",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Logout
        </button>

        {/* Create a Group Code */}
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleCreateGroupCode}
            style={{
              padding: "10px 20px",
              backgroundColor: "#FFC107",
              color: "#000",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Create a Group Code
          </button>
          {groupCode && (
            <p style={{ color: "green", fontWeight: "bold", marginTop: "10px" }}>
              Share this code with friends or copy paste this code below to join the group!
              <br />
              <span style={{ fontSize: "20px" }}>{groupCode}</span>
            </p>
          )}
        </div>

        {/* Join a Group */}
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Enter group code"
            value={joinGroupCode}
            onChange={(e) => setJoinGroupCode(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginRight: "10px",
            }}
          />
          <button
            onClick={handleJoinGroup}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "#fff",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Join Group
          </button>
          {joinGroupMessage && (
            <p
              style={{
                color: joinGroupMessage.startsWith("You joined") ? "green" : "red",
                marginTop: "10px",
              }}
            >
              {joinGroupMessage}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Show NewUser or ReturnUser component based on selection
  if (currentPage === "returning") {
    return <ReturnUser goToHome={() => setCurrentPage("")} />;
  }

  if (currentPage === "new") {
    return <NewUser goToHome={() => setCurrentPage("")} />;
  }

  // Default profile page
  return (
    <div style={{ textAlign: "center", marginTop: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Home Button */}
      <div style={{ position: "absolute", top: "20px", left: "20px" }}>
        <button
          onClick={goToHome}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "30px",
          }}
        >
          🏠
        </button>
      </div>
      <h1>Profile Page</h1>
      <button
        onClick={() => setCurrentPage("returning")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Returning User
      </button>
      <button
        onClick={() => setCurrentPage("new")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "#fff",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        New User
      </button>
    </div>
  );
}

export default Profile;
