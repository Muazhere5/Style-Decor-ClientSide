import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ============================
     FETCH USERS
  ============================ */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data);
      } catch {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  /* ============================
     MAKE ADMIN
  ============================ */
  const handleMakeAdmin = async id => {
    if (!window.confirm("Make this user an Admin?")) return;

    try {
      await axiosSecure.patch(`/users/make-admin/${id}`);
      toast.success("User promoted to Admin");
      setUsers(prev =>
        prev.map(u =>
          u._id === id ? { ...u, role: "admin" } : u
        )
      );
    } catch {
      toast.error("Action failed");
    }
  };

  /* ============================
     DELETE USER
  ============================ */
  const handleDeleteUser = async id => {
    if (!window.confirm("Delete this user permanently?")) return;

    try {
      const res = await axiosSecure.delete(`/users/${id}`);
      toast.success(res.data.message || "User deleted successfully");
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  /* ============================
     BLOCK / UNBLOCK USER
  ============================ */
  const handleBlockUser = async id => {
    try {
      const res = await axiosSecure.patch(`/users/block/${id}`);
      toast.success(res.data.message || "Status updated");
      setUsers(prev =>
        prev.map(u =>
          u._id === id ? { ...u, blocked: !u.blocked } : u
        )
      );
    } catch {
      toast.error("Block failed");
    }
  };

  if (loading) {
    return (
      <div className="loading-indicator">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">👥 User Management</h2>

      <div className="overflow-x-auto card p-4">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.email}</td>

                <td>
                  <span className="badge badge-outline capitalize">
                    {user.role}
                  </span>
                </td>

                <td>
                  {user.blocked ? (
                    <span className="badge badge-error">Blocked</span>
                  ) : (
                    <span className="badge badge-success">Active</span>
                  )}
                </td>

                <td className="space-x-2">
                  {/* 🚫 ADMINS CANNOT BE MODIFIED */}
                  {user.role !== "admin" && (
                    <>
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="btn btn-xs btn-primary"
                      >
                        Make Admin
                      </button>

                      <button
                        onClick={() => handleBlockUser(user._id)}
                        className="btn btn-xs btn-warning"
                      >
                        {user.blocked ? "Unblock" : "Block"}
                      </button>

                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
