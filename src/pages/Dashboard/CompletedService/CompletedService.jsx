import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const CompletedService = () => {
  const axiosSecure = useAxiosSecure();
  const [services, setServices] = useState([]);

  useEffect(() => {
    axiosSecure.get("/decorator/tasks").then(res => {
      setServices(res.data.filter(s => s.status === "Completed"));
    });
  }, [axiosSecure]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Completed Services</h2>

      {services.map(s => (
        <div key={s._id} className="card p-4 mb-4">
          <p>{s.serviceName}</p>
        </div>
      ))}
    </div>
  );
};

export default CompletedService;
