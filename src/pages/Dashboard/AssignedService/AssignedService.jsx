import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AssignedService = () => {
  const axiosSecure = useAxiosSecure();
  const [services, setServices] = useState([]);

  useEffect(() => {
    axiosSecure.get("/decorator/tasks").then(res => setServices(res.data));
  }, [axiosSecure]);

  const updateStatus = (id, status) => {
    axiosSecure.patch(`/decorator/update-status/${id}`, { status }).then(() => {
      toast.success("Status updated");
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Assigned Services</h2>

      {services.map(s => (
        <div key={s._id} className="card p-4 mb-4">
          <p>{s.serviceName}</p>
          <button
            onClick={() => updateStatus(s._id, "Completed")}
            className="btn btn-secondary mt-2"
          >
            Mark Completed
          </button>
        </div>
      ))}
    </div>
  );
};

export default AssignedService;
