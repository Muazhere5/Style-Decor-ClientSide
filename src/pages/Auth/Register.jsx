// src/pages/Auth/Register.jsx
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import axios from "axios";

const imageHostingKey = import.meta.env.VITE_IMGBB_API_KEY;
const imageUploadURL = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      /* =========================
         1️⃣ Upload Image
      ========================= */
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const imgRes = await axios.post(imageUploadURL, formData);

      if (!imgRes?.data?.success) {
        toast.error("Image upload failed");
        return;
      }

      const photoURL = imgRes.data.data.display_url;

      /* =========================
         2️⃣ Firebase Signup
      ========================= */
      const userCredential = await createUser(data.email, data.password);

      if (!userCredential?.user) {
        toast.error("Firebase account creation failed");
        return;
      }

      await updateUserProfile(data.name, photoURL);

      /* =========================
         3️⃣ Save User to Backend
      ========================= */
      await axiosPublic.post("/users", {
        name: data.name,
        email: data.email,
        photo: photoURL,
        role: "user",          // ✅ REQUIRED
        createdAt: new Date(), // ✅ SAFE
      });

      /* =========================
         SUCCESS
      ========================= */
      toast.success("🎉 Account created successfully!");
      reset();
      navigate("/login");
    } catch (error) {
      console.error("Register Error:", error);
      toast.error(error?.message || "❌ Registration failed");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-center mb-2">
        Create Account
      </h2>

      <p className="text-center text-gray-500 mb-8">
        Join StyleDecor & book premium decoration services
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="font-semibold">Full Name</label>
          <input
            className="input input-bordered w-full h-12 mt-2"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">Name is required</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Profile Photo</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full h-12 mt-2"
            {...register("photo", { required: true })}
          />
          {errors.photo && (
            <p className="text-red-500 text-sm mt-1">Photo is required</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Email</label>
          <input
            type="email"
            className="input input-bordered w-full h-12 mt-2"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">Email is required</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Password</label>
          <input
            type="password"
            className="input input-bordered w-full h-12 mt-2"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        <button className="btn btn-primary w-full text-lg">
          Register
        </button>
      </form>

      <p className="text-center mt-6">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-style-primary">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
