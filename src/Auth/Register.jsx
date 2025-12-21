import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const image = e.target.image.files[0];

    try {
      /* Upload image to imgbb */
      const formData = new FormData();
      formData.append("image", image);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );

      const photoURL = imgRes.data.data.display_url;

      const result = await createUser(email, password);
      await updateUserProfile(name, photoURL);

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name,
        email,
        photo: photoURL,
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
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input name="name" placeholder="Full Name" className="input input-bordered input-lg w-full" required />
          <input name="email" type="email" placeholder="Email" className="input input-bordered input-lg w-full" required />
          <input name="password" type="password" placeholder="Password" className="input input-bordered input-lg w-full" required />
          <input name="image" type="file" className="file-input file-input-bordered file-input-lg w-full" required />

          {error && <p className="text-red-500">{error}</p>}

          <button className="btn btn-lg w-full bg-style-primary text-white hover:bg-style-secondary">
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-style-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
