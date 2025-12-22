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
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async data => {
    try {
      /* ================= IMAGE UPLOAD ================= */
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const imgRes = await axios.post(imageUploadURL, formData);

      if (!imgRes.data.success) {
        toast.error("❌ Image upload failed");
        return;
      }

      const photoURL = imgRes.data.data.display_url;

      /* ================= FIREBASE USER ================= */
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, photoURL);

      /* ================= SAVE USER IN DB ================= */
      await axiosPublic.post("/users", {
        name: data.name,
        email: data.email,
        photo: photoURL,
      });

      toast.success("🎉 Account created successfully!");
      reset();
      navigate("/login");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("❌ Email already exists! Try logging in.");
      } else {
        toast.error("❌ Registration failed");
      }
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-center mb-2">
        Create Account
      </h2>

      <p className="text-center text-gray-500 mb-6">
        Join StyleDecor & book premium decoration services
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="font-semibold">Full Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full mt-1"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-error text-sm">Name is required</p>
          )}
        </div>

        {/* Photo */}
        <div>
          <label className="font-semibold">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full mt-1"
            {...register("photo", { required: true })}
          />
          {errors.photo && (
            <p className="text-error text-sm">Photo is required</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="font-semibold">Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            className="input input-bordered w-full mt-1"
            {...register("email", { required: true })}
          />
        </div>

        {/* Password */}
        <div>
          <label className="font-semibold">Password</label>
          <input
            type="password"
            placeholder="At least 6 characters"
            className="input input-bordered w-full mt-1"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <p className="text-error text-sm">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full text-lg">
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
