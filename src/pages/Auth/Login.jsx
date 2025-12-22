// src/pages/Auth/Login.jsx
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FIX: default redirect is HOME
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    try {
      await loginUser(data.email, data.password);
      toast.success("✨ Login successful! Welcome back.");
      navigate(from, { replace: true });
    } catch {
      toast.error("❌ Invalid email or password");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-center mb-2">
        Login to StyleDecor
      </h2>

      <p className="text-center text-gray-500 mb-6">
        Access your dashboard & manage your decoration services
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="font-semibold">Email</label>
          <input
            type="email"
            className="input input-bordered w-full mt-1"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-error text-sm">Email is required</p>}
        </div>

        <div>
          <label className="font-semibold">Password</label>
          <input
            type="password"
            className="input input-bordered w-full mt-1"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-error text-sm">Password is required</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full text-lg">
          Login
        </button>
      </form>

      <div className="divider my-6">OR</div>

      <SocialLogin />

      <p className="text-center mt-6">
        New here?{" "}
        <Link to="/register" className="font-bold text-style-primary">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
