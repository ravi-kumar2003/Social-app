import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Enter email and password");
      return;
    }

    try {
      await login(email, password);

      toast.success("Login successful!");
      navigate("/home");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed"
      );
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
        <h3 className="text-center mb-4">Login</h3>

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
          Login
        </button>

        <p className="text-center mt-3 mb-0">
          Don't have an account?{" "}
          <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
