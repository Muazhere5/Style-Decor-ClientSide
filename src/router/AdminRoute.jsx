// src/router/AdminRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { role, roleLoading } = useRole();
  const location = useLocation();

  if (roleLoading) {
    return (
      <div className="loading-indicator">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // ✅ ONLY admin allowed
  if (role !== "admin") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
