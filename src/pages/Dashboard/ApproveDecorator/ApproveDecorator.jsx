import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ApproveDecorator = () => {
  const axiosSecure = useAxiosSecure();
  const [decorators, setDecorators] = useState([]);

  useEffect(() => {
    axiosSecure.get("/decorators").then(res => setDecorators(res.data));
  }, [axiosSecure]);

  const approve = id => {
    axiosSecure.patch(`/decorators/approve/${id}`).then(() => {
      toast.success("Decorator Approved");
      setDecorators(prev => prev.filter(d => d._id !== id));
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Approve Decorators</h2>

      {decorators.map(d => (
        <div key={d._id} className="card p-4 mb-4 flex justify-between">
          <p>{d.name}</p>
          <button onClick={() => approve(d._id)} className="btn btn-primary">
            Approve
          </button>
        </div>
      ))}
    </div>
  );
};

export default ApproveDecorator;
