import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const { signIn } = useAuth();
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard/user-home";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    try {
      const result = await signIn(data.email, data.password);

      // 🔐 Get JWT
      const jwtRes = await axiosPublic.post("/jwt", {
        email: result.user.email,
      });

      localStorage.setItem("styledecor-token", jwtRes.data.token);

      toast.success("✨ Login successful! Welcome back.");
      navigate(from, { replace: true });
    } catch (error) {
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
        {/* Email */}
        <div>
          <label className="font-semibold">Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            className="input input-bordered w-full mt-1"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-error text-sm">Email is required</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="font-semibold">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="input input-bordered w-full mt-1"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-error text-sm">Password is required</p>
          )}
        </div>

        {/* Button */}
        <button type="submit" className="btn btn-primary w-full text-lg">
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="divider my-6">OR</div>

      {/* Social Login */}
      <SocialLogin />

      {/* Register link */}
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
