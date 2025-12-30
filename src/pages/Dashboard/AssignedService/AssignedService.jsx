import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTruck, FaMoneyBillWave } from "react-icons/fa";

const AssignedService = () => {
  const axiosSecure = useAxiosSecure();
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [trackingId, setTrackingId] = useState("");

  const { handleSubmit, reset } = useForm();

  useEffect(() => {
    axiosSecure.get("/services").then(res => {
      setServices(res.data);
    });
  }, [axiosSecure]);

  // ✅ Confirm Service
  const confirmService = async id => {
    await axiosSecure.patch(`/services/${id}`, {
      status: "Confirmed",
    });

    toast.success("Service Confirmed!");

    setServices(prev =>
      prev.map(s => (s._id === id ? { ...s, status: "Confirmed" } : s))
    );
  };

  // ✅ Mark Completed → Generate Tracking ID
  const markCompleted = async service => {
    const res = await axiosSecure.get(`/services/${service._id}/tracking`);

    setTrackingId(res.data.trackingId);
    setActiveService(service);

    Swal.fire({
      title: "🎉 Service Completed!",
      html: `
        <p class="mb-2">Please copy the tracking ID below:</p>
        <div style="
          background:#f3f4f6;
          padding:12px;
          border-radius:8px;
          font-size:18px;
          font-weight:bold;
          letter-spacing:1px;
        ">
          ${res.data.trackingId}
        </div>
      `,
      icon: "success",
      confirmButtonText: "Proceed to Cashout",
      confirmButtonColor: "#7c3aed",
    });
  };

  // ✅ CASH OUT
  const cashOut = async () => {
    await axiosSecure.post(`/services/cashout/${activeService._id}`, {
      trackingNo: trackingId,
    });

    toast.success("Cashout Successful 💰");

    setServices(prev =>
      prev.filter(s => s._id !== activeService._id)
    );

    setActiveService(null);
    setTrackingId("");
    reset();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-purple-700 flex items-center gap-3">
        <FaTruck /> Assigned Services
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map(service => (
          <div
            key={service._id}
            className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-purple-600">
              {service.serviceType}
            </h3>

            <p className="mt-2"><b>Location:</b> {service.location}</p>
            <p><b>Status:</b> {service.status}</p>

            <div className="mt-4 space-y-2">
              {service.status === "Assigned" && (
                <button
                  onClick={() => confirmService(service._id)}
                  className="btn btn-primary w-full flex gap-2"
                >
                  <FaCheckCircle /> Confirm Service
                </button>
              )}

              {service.status === "Confirmed" && (
                <button
                  onClick={() => markCompleted(service)}
                  className="btn btn-secondary w-full flex gap-2"
                >
                  <FaTruck /> Mark Completed
                </button>
              )}

              {service.status === "Completed" && (
                <button
                  onClick={() => setActiveService(service)}
                  className="btn btn-accent w-full flex gap-2"
                >
                  <FaMoneyBillWave /> Cash Out
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {activeService && (
        <div className="mt-10 bg-gradient-to-br from-purple-100 to-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold mb-4 text-purple-700">
            💰 Cash Out
          </h3>

          <div className="mb-4">
            <p className="text-gray-600 mb-1">Tracking ID</p>
            <div className="bg-white p-3 rounded-lg font-bold text-lg tracking-wide">
              {trackingId}
            </div>
          </div>

          <button
            onClick={cashOut}
            className="btn btn-primary w-full text-lg"
          >
            Confirm Cash Out
          </button>
        </div>
      )}
    </div>
  );
};

export default AssignedService;
