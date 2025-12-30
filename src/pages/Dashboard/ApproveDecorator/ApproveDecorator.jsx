import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import DecoratorCard from "../../../components/DecoratorCard";

const ApproveDecorator = () => {
  const axiosSecure = useAxiosSecure();
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const pendingRes = await axiosSecure.get("/decorators/pending");
        const approvedRes = await axiosSecure.get("/decorators");
        setPending(pendingRes.data);
        setApproved(approvedRes.data);
      } catch {
        toast.error("Failed to load decorators");
      }
    };
    loadData();
  }, [axiosSecure]);

  const approveDecorator = async id => {
    try {
      await axiosSecure.patch(`/decorators/approve/${id}`);
      toast.success("Decorator Approved");
      setPending(prev => prev.filter(d => d._id !== id));
    } catch {
      toast.error("Approval failed");
    }
  };

  return (
    <div className="p-6 space-y-14">

      {/* ================= PENDING ================= */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          🎨 Pending Decorator Requests
        </h2>

        {pending.length === 0 ? (
          <p className="text-gray-500">No pending requests.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {pending.map(dec => (
              <div key={dec._id} className="card p-6 bg-base-200">
                <h3 className="font-bold text-lg">{dec.name}</h3>
                <p className="text-sm opacity-70">{dec.email}</p>
                <p className="text-sm mt-2">{dec.experience}</p>

                <button
                  onClick={() => approveDecorator(dec._id)}
                  className="btn btn-primary mt-4"
                >
                  Approve Decorator
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= APPROVED ================= */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          ✅ Approved Decorators
        </h2>

        {approved.length === 0 ? (
          <p className="text-gray-500">No decorators available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {approved.map(dec => (
              <DecoratorCard key={dec._id} decorator={dec} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default ApproveDecorator;
