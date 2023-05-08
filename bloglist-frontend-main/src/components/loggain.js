import axios from "axios";
import React, { useState } from "react";
import userService from "../services/user";

const Loggain = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:3003/api/login", {
      Username: username,
      Password: password,
    });
    console.log("hejjj", response.data);
    userService.setUser(response.data);
  };
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
};

export default Loggain;
