import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({});

  useEffect(() => {
    axiosSecure.get("/bookings/admin").then(res => {
      setStats({
        totalBookings: res.data.length,
      });
    });
  }, [axiosSecure]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-xl font-bold">Total Bookings</h3>
          <p className="text-4xl mt-2 text-primary">{stats.totalBookings}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
