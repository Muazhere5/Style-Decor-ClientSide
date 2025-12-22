import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FIX: redirect to dashboard, NOT user-home
  const from = location.state?.from?.pathname || "/dashboard";

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;

      // ✅ Save user in DB (safe even if already exists)
      await axiosPublic.post("/users", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });

      toast.success("🌸 Logged in with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("❌ Google login failed");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="btn btn-outline w-full text-lg flex items-center justify-center gap-3"
    >
      <FaGoogle className="text-xl" />
      Continue with Google
    </button>
  );
};

export default SocialLogin;
