// src/router/DecoratorRoute.jsx
import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";

const DecoratorRoute = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return (
      <div className="loading-indicator">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  if (role !== "decorator") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default DecoratorRoute;
