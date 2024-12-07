

import React, { useEffect, useState } from "react";
import axios from "axios";

import NewUser from "../Profile/NewUser"; // Adjust the path based on your file structure
import ReturnUser from "../Profile/ReturnUser"; // Adjust the path based on your file structure

const ProfilePage = () => {
  const [userList, setUserList] = useState([]); // State to store the list of users
  const [error, setError] = useState(""); // State to handle errors
  const [loading, setLoading] = useState(false); // Initialize loading as false
  const [currentPage, setCurrentPage] = useState("profile"); // State to manage the current page

  useEffect(() => {
    // Fetch the list of users from the database
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5001/api/users"); // Get all users
        setUserList(response.data); // Store the list of users
        setError(""); // Clear any errors
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 500) {
          setError("Internal Server Error: Unable to fetch users.");
        } else {
          setError("Failed to fetch user list. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle loading state
  if (loading) return <div>Loading...</div>;

  // Handle error state
  if (error) {
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
