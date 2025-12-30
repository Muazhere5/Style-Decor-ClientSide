import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiCheckCircle } from "react-icons/fi";
import Swal from "sweetalert2";

const AssignedDecorator = () => {
  const axiosSecure = useAxiosSecure();
  const [bookingId, setBookingId] = useState("");
  const [decoratorEmail, setDecoratorEmail] = useState("");
  const [serviceData, setServiceData] = useState({});

  const { data: bookings = [] } = useQuery({
    queryKey: ["paid-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data.filter(b => b.paymentStatus === "paid");
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const { data: decorators = [] } = useQuery({
    queryKey: ["decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators");
      return res.data;
    },
  });

  useEffect(() => {
    if (!bookingId) return;
    const booking = bookings.find(b => b._id === bookingId);
    const payment = payments.find(p => p.bookingId === bookingId);
    if (!booking) return;

    setServiceData({
      bookingId,
      trackingId: `TRK-${Date.now()}`,
      serviceType: booking.serviceType,
      eventType: booking.eventType,
      bookingDate: booking.bookingDate,
      timeSlot: booking.timeSlot,
      location: `${booking.area}, ${booking.district}`,
      price: payment?.amount || 0,

      status: "assigned",
    });
  }, [bookingId, bookings, payments]);

  useEffect(() => {
    if (!decoratorEmail) return;
    const decorator = decorators.find(d => d.email === decoratorEmail);
    if (!decorator) return;

    setServiceData(prev => ({
      ...prev,
      decoratorName: decorator.name,
      decoratorEmail: decorator.email,
      decoratorPhone: decorator.phone,
    }));
  }, [decoratorEmail, decorators]);

  const handleSubmit = async e => {
    e.preventDefault();
    await axiosSecure.post("/services", serviceData);

    Swal.fire({
      icon: "success",
      title: "Service Assigned!",
      text: "Decorator has been successfully assigned to the booking.",
      confirmButtonColor: "#7c3aed",
      background: "#f9fafb",
    });

    setBookingId("");
    setDecoratorEmail("");
    setServiceData({});
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold flex items-center gap-3 mb-8 text-purple-700">
        <FiCheckCircle />
        Assign Decorator
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SELECTION */}
        <div className="grid md:grid-cols-2 gap-6">
          <select
            className="select select-bordered w-full"
            value={bookingId}
            onChange={e => setBookingId(e.target.value)}
          >
            <option value="">Select Paid Booking</option>
            {bookings.map(b => (
              <option key={b._id} value={b._id}>
                {b.serviceType} — {b.bookingDate}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full"
            value={decoratorEmail}
            onChange={e => setDecoratorEmail(e.target.value)}
          >
            <option value="">Select Decorator</option>
            {decorators.map(d => (
              <option key={d._id} value={d.email}>
                {d.name} ({d.email})
              </option>
            ))}
          </select>
        </div>

        {/* DETAILS */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* BOOKING INFO */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              📦 Booking Details
            </h3>

            <div className="space-y-3">
              {[
                ["Service Type", serviceData.serviceType],
                ["Event Type", serviceData.eventType],
                ["Booking Date", serviceData.bookingDate],
                ["Time Slot", serviceData.timeSlot],
                ["Location", serviceData.location],
                ["Price", serviceData.price],
              ].map(
                ([label, value]) =>
                  value && (
                    <div key={label}>
                      <label className="text-sm text-gray-500">{label}</label>
                      <input
                        readOnly
                        value={value}
                        className="input input-bordered w-full bg-gray-50"
                      />
                    </div>
                  )
              )}
            </div>
          </div>

          {/* DECORATOR INFO */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              👨‍🎨 Decorator Details
            </h3>

            <div className="space-y-3">
              {[
                ["Name", serviceData.decoratorName],
                ["Email", serviceData.decoratorEmail],
                ["Phone", serviceData.decoratorPhone],
              ].map(
                ([label, value]) =>
                  value && (
                    <div key={label}>
                      <label className="text-sm text-gray-500">{label}</label>
                      <input
                        readOnly
                        value={value}
                        className="input input-bordered w-full bg-gray-50"
                      />
                    </div>
                  )
              )}
            </div>
          </div>
        </div>

        <button className="btn btn-primary w-full text-lg tracking-wide">
          Assign Service
        </button>
      </form>
    </div>
  );
};

export default AssignedDecorator;
