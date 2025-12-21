import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await loginUser(email, password);

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name: result.user.displayName || "User",
        email: result.user.email,
        photo: result.user.photoURL,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* PostImage banner here */}
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-style-primary">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered input-lg w-full"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered input-lg w-full"
            required
          />

          {error && <p className="text-red-500">{error}</p>}

          <button className="btn btn-lg w-full bg-style-primary text-white hover:bg-style-secondary">
            Login
          </button>
        </form>

        <SocialLogin />

        <p className="text-center mt-4">
          New here?{" "}
          <Link to="/register" className="text-style-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
