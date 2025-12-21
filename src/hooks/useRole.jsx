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

    const fetchRole = async () => {
      try {
        const res = await axiosSecure.get("/users");
        const currentUser = res.data.find(
          u => u.email === user.email
        );

        setRole(currentUser?.role || "user");
      } catch (err) {
        setRole("user");
      } finally {
        setRoleLoading(false);
      }
    };

    fetchRole();
  }, [user, loading, axiosSecure]);

  return { role, roleLoading };
};

export default useRole;
