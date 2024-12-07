import React, { useState } from "react";
import axios from "axios";

const NewUser = ({ onBack }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/users/register", {
        name,
        email,
      });
      console.log("User created:", response.data);
      setSuccess("User successfully created!");
      setError("");
      setName("");
      setEmail("");
    } catch (err) {
      console.error("Failed to create user:", err);
      setError("Failed to create user. Please try again.");
    }
  };

  return (
    <div>
      <h1>Create a New User</h1>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onBack}>
          Back
        </button>
      </form>
    </div>
  );
};

export default NewUser;
