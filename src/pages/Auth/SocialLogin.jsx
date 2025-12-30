// src/pages/Auth/SocialLogin.jsx
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

  // where to redirect after login
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = async () => {
    try {
      // 1️⃣ Firebase Google Login
      const result = await googleLogin();
      const user = result.user;

      if (!user?.email) {
        throw new Error("Google user data missing");
      }

      // 2️⃣ Prepare user data
      const userInfo = {
        name: user.displayName || "Google User",
        email: user.email,
        photo: user.photoURL || "",
      };

      // 3️⃣ Save / sync user in MongoDB
      await axiosPublic.post("/users", userInfo);

      toast.success("🌸 Logged in with Google successfully!");

      // 4️⃣ Redirect AFTER DB sync
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("❌ Google login failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="btn btn-outline w-full text-lg flex items-center justify-center gap-3"
    >
      <FaGoogle className="text-xl" />
      Continue with Google
    </button>
  );
};

export default SocialLogin;
