// src/pages/Decorator/Decorator.jsx
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Decorator = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure(); // ✅ FIXED
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);

  // ⏳ Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // 🔐 Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;

    const decoratorData = {
      name: form.name.value,
      email: user.email,
      phone: form.phone.value,
      nid: form.nid.value,
      experience: form.experience.value,
    };

    try {
      await axiosSecure.post("/decorators/apply", decoratorData); // ✅ JWT SENT
      toast.success("🎉 Decorator application submitted!");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <div className="card p-8 shadow-xl bg-base-100">
        <h2 className="text-3xl font-extrabold text-center text-style-primary mb-6">
          Become a Decorator
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            required
            placeholder="Full Name"
            className="input input-bordered w-full"
          />

          <input
            value={user.email}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />

          <input
            name="phone"
            required
            placeholder="Phone Number"
            className="input input-bordered w-full"
          />

          <input
            name="nid"
            required
            placeholder="National ID Number"
            className="input input-bordered w-full"
          />

          <textarea
            name="experience"
            required
            placeholder="Describe your decoration experience"
            className="textarea textarea-bordered w-full"
          />

          <button disabled={submitting} className="btn btn-primary w-full">
            {submitting ? "Submitting..." : "Apply as Decorator"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Decorator;
