import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/AdminLogin.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    try {
      const response = await fetch(
        "https://travelbharat-cznx.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("adminLoggedIn", "true");
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Unable to connect to server.");
    }
  };

  return (
    <>
      <Navbar />

      <section className="admin-login-page">
        <div className="login-box">

          <h1>Admin Login</h1>

          <p>Login to manage TravelBharat.</p>

          <form onSubmit={handleLogin}>

            <label>Username</label>

            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter username"
              required
            />

            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              required
            />

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

            <button type="submit">
              Login
            </button>

          </form>

        </div>
      </section>
    </>
  );
}

export default AdminLogin;