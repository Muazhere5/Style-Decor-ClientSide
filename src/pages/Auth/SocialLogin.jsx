import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxios();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      // Save user
      await axiosPublic.post("/users", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });

      // Get JWT
      const jwtRes = await axiosPublic.post("/jwt", {
        email: user.email,
      });

      localStorage.setItem("styledecor-token", jwtRes.data.token);

      toast.success("🌸 Logged in with Google!");
      navigate("/dashboard/user-home");
    } catch (error) {
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
