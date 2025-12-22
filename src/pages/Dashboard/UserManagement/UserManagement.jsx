import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ============================
     FETCH USERS & DECORATORS
  ============================ */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, decoratorRes] = await Promise.all([
          axiosSecure.get("/users"),
          axiosSecure.get("/decorators"),
        ]);

        setUsers(usersRes.data);
        setDecorators(decoratorRes.data);
      } catch (err) {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure]);

  /* ============================
     MAKE ADMIN
  ============================ */
  const handleMakeAdmin = async id => {
    const confirm = window.confirm("Make this user an Admin?");
    if (!confirm) return;

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
     APPROVE DECORATOR
  ============================ */
  const handleApproveDecorator = async id => {
    try {
      await axiosSecure.patch(`/decorators/approve/${id}`);
      toast.success("Decorator Approved");
      setDecorators(prev =>
        prev.filter(d => d._id !== id)
      );
    } catch {
      toast.error("Approval failed");
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
    <div className="p-6 space-y-10">
      {/* ================= USERS ================= */}
      <section>
        <h2 className="text-2xl font-bold mb-4">👥 User Management</h2>

        <div className="overflow-x-auto card p-4">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
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
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="btn btn-primary btn-sm"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= DECORATOR REQUESTS ================= */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          🎨 Decorator Requests
        </h2>

        {decorators.length === 0 ? (
          <p className="text-gray-500">
            No pending decorator requests.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {decorators.map(dec => (
              <div key={dec._id} className="card p-5 space-y-3">
                <h3 className="font-semibold">{dec.name}</h3>
                <p className="text-sm text-gray-600">
                  {dec.email}
                </p>

                <button
                  onClick={() =>
                    handleApproveDecorator(dec._id)
                  }
                  className="btn btn-secondary w-full"
                >
                  Approve Decorator
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserManagement;
