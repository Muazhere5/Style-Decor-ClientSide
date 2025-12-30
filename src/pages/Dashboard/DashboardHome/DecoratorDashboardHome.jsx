import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const DecoratorDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const [services, setServices] = useState([]);

  useEffect(() => {
    axiosSecure.get("/services").then(res => setServices(res.data));
  }, [axiosSecure]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Decorator Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 text-center">
          <h3 className="text-lg font-semibold">Total Assigned Services</h3>
          <p className="text-4xl font-bold text-primary">
            {services.length}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map(service => (
          <div key={service._id} className="card p-5 border">
            <h3 className="text-xl font-semibold">
              {service.serviceType}
            </h3>
            <p><b>Date:</b> {service.bookingDate}</p>
            <p><b>Location:</b> {service.location}</p>
            <p><b>Time:</b> {service.timeSlot}</p>
            <p>
              <b>Status:</b>{" "}
              <span className="font-semibold text-primary">
                {service.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecoratorDashboardHome;
