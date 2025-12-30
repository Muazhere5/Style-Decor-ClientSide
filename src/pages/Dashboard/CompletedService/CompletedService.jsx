import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CompletedService = () => {
  const axiosSecure = useAxiosSecure();
  const [services, setServices] = useState([]);

  useEffect(() => {
    axiosSecure.get("/services").then(res => {
      const completed = res.data.filter(
        s => s.status === "Completed"
      );
      setServices(completed);
    });
  }, [axiosSecure]);

  const totalEarning = services.reduce(
    (sum, s) => sum + (s.price || 0),
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Completed Services</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="card p-6">
          <h3 className="font-semibold mb-4">Work Summary</h3>
          {services.map(s => (
            <div key={s._id} className="border-b py-2">
              <p><b>{s.serviceType}</b></p>
              <p>৳ {s.price}</p>
            </div>
          ))}
        </div>

        <div className="card p-6 flex flex-col justify-center items-center">
          <h3 className="font-semibold mb-2">Total Earnings</h3>
          <p className="text-4xl font-bold text-primary">
            ৳ {totalEarning}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompletedService;
