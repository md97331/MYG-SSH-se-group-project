import React, { useState } from "react";
import axios from "axios";

const ReturnUser = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/users/login", {
        email,
      });
      console.log("User logged in:", response.data);
      setSuccess("User successfully logged in!");
      setError("");
    } catch (err) {
      console.error("Failed to log in:", err);
      setError("Failed to log in. Please check your email and try again.");
    }
  };

  return (
    <div>
      <h1>Return User</h1>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
        <button type="button" onClick={onBack}>
          Back
        </button>
      </form>
    </div>
  );
};

export default ReturnUser;
