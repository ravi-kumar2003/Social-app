import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", {
        username,
        email,
        password,
      });

      await login(email, password);
      navigate("/home");

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background:
          "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #9333ea 100%)",
      }}
    >
      <form
        onSubmit={onSubmitHandler}
        className="card p-4 shadow"
        style={{ width: "360px", borderRadius: "12px" }}
      >
        <h3 className="text-center mb-4">Sign Up</h3>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Username"
            className="form-control border-0 border-bottom rounded-0"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            className="form-control border-0 border-bottom rounded-0"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            className="form-control border-0 border-bottom rounded-0"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn text-white w-100 mt-2"
          style={{
            background:
              "linear-gradient(90deg, #3b82f6 0%, #9333ea 100%)",
          }}
        >
          Sign Up
        </button>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
