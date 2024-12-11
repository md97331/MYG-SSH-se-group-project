// Profile.js
import React, { useState, useContext } from "react";
import ReturnUser from "./ReturnUser";
import NewUser from "./NewUser";
import { AuthContext } from "../../AuthContext";

function Profile({ goToHome }) {
  const [currentPage, setCurrentPage] = useState("");
  const { user, logout, login } = useContext(AuthContext);

  // Group management states
  const [groupCode, setGroupCode] = useState(""); // Holds the generated group code
  const [joinGroupCode, setJoinGroupCode] = useState(""); // Holds the input group code
  const [joinGroupMessage, setJoinGroupMessage] = useState(""); // Message for joining a group

  // Function to handle creating a 6-character alphanumeric group code
  const handleCreateGroupCode = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/groups/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ created_by_user: user.id }),
      });

      if (response.ok) {
        const data = await response.json();
        setGroupCode(data.group_code); // Use the generated group code from the backend
        setJoinGroupMessage(""); // Clear previous messages
      } else {
        const errorData = await response.json();
        console.error("Error creating group:", errorData.error);
        setJoinGroupMessage("Failed to create group. Please try again.");
      }
    } catch (error) {
      console.error("Error while creating group:", error);
      setJoinGroupMessage("An error occurred while creating the group. Please try again.");
    }
  };

  // Function to handle joining a group using a 6-character alphanumeric code
  const handleJoinGroup = async () => {
    const isValidCode = /^[A-Z0-9]{6}$/.test(joinGroupCode); // Validate alphanumeric and length
    if (isValidCode) {
      try {
        // Attempt to join the group
        const response = await fetch(`http://localhost:5001/api/groups/join`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.id,
            group_code: joinGroupCode,
          }),
        });
  
        if (response.ok) {
          // Retrieve the user's updated group ID
          const groupResponse = await fetch(`http://localhost:5001/api/users/${user.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
  
          if (groupResponse.ok) {
            const groupData = await groupResponse.json();
            console.log(groupData.user.group_id);
            const updatedUser = { ...user, group_id: groupData.user.group_id };
            login(updatedUser); // Update the user in AuthContext
            setJoinGroupMessage(`You joined group ${groupData.user.group_id}!`);
          } else {
            setJoinGroupMessage("Failed to retrieve updated group information. Please try again.");
          }
        } else {
          const data = await response.json();
          setJoinGroupMessage(data.error || "Failed to join group. Please try again.");
        }
      } catch (error) {
        console.error(error);
        setJoinGroupMessage("An error occurred while joining the group. Please try again.");
      }
    } else {
      setJoinGroupMessage("Invalid group code. Please enter a 6-character alphanumeric code.");
    }
  };
  

  if (user) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px", fontFamily: "Arial, sans-serif" }}>
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
              Share this code with friends or copy-paste this code below to join the group!
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
            onChange={(e) => setJoinGroupCode(e.target.value.toUpperCase())} // Automatically capitalize
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

  if (currentPage === "returning") {
    return <ReturnUser goToHome={() => setCurrentPage("")} />;
  }

  if (currentPage === "new") {
    return <NewUser goToHome={() => setCurrentPage("")} />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px", fontFamily: "Arial, sans-serif" }}>
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
