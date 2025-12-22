import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const UserDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const [services, setServices] = useState([]);

  useEffect(() => {
    axiosSecure.get("/bookings/user").then(res => setServices(res.data));
  }, [axiosSecure]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      <p className="text-lg">My Services: {services.length}</p>
    </div>
  );
};

export default UserDashboardHome;
