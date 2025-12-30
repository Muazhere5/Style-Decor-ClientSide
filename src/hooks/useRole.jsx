// src/hooks/useRole.jsx
import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!user || loading) return;

    setRoleLoading(true);

    axiosSecure
      .get("/users/role")
      .then(res => {
        setRole(res.data.role);
      })
      .catch(() => {
        setRole("user"); // safe fallback
      })
      .finally(() => {
        setRoleLoading(false);
      });
  }, [user, loading, axiosSecure]);

  return { role, roleLoading };
};

export default useRole;
