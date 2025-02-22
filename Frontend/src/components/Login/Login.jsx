import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Login = ({ setUser }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.pathname.replace("-", " ").split("/")[1]; // Extract role from URL

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        id,
        password,
        role,
      });

      const { token, user } = response.data;
      const userData = { id: user.id, department: "CSE", category: role.charAt(0).toUpperCase() };

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userId", id);
      localStorage.setItem("userData", JSON.stringify(userData));

      setUser(userData);
      alert("Login successful");
      navigate("/info");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="con">
        <div className="login-container">
          <h2 className="title">{role}</h2>
          {error && <p className="error-message">{error}</p>}
          <hr />
          <form onSubmit={handleLogin}>
            <label>UserName :</label>
            <input
              type="text"
              placeholder="Enter ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <label>Password :</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
