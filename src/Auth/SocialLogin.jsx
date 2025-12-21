import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const SocialLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogle = async () => {
    const result = await googleLogin();

    await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
      name: result.user.displayName,
      email: result.user.email,
      photo: result.user.photoURL,
    });

    navigate("/");
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleGoogle}
        className="btn btn-lg w-full border border-gray-400 bg-white text-black hover:bg-gray-100"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
