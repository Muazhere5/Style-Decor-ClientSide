import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyDecoration = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ============================
     FETCH USER BOOKINGS
  ============================ */
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axiosSecure.get("/bookings/user");
        setBookings(res.data);
      } catch {
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [axiosSecure]);

  /* ============================
     DELETE BOOKING (UNPAID)
  ============================ */
  const handleDelete = async id => {
    const confirm = window.confirm(
      "Cancel this booking?"
    );
    if (!confirm) return;

    try {
      await axiosSecure.delete(`/bookings/${id}`);
      toast.success("Booking cancelled");
      setBookings(prev =>
        prev.filter(b => b._id !== id)
      );
    } catch {
      toast.error("Cancellation failed");
    }
  };

  if (loading) {
    return (
      <div className="loading-indicator">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">
        🎉 My Decoration Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">
          No bookings found.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map(booking => (
            <div
              key={booking._id}
              className="card p-6 space-y-3"
            >
              <h3 className="font-semibold text-lg">
                {booking.serviceName}
              </h3>

              <p className="text-sm">
                📍 Location: {booking.location}
              </p>

              <p className="text-sm">
                📅 Date: {booking.date}
              </p>

              <div className="flex items-center gap-3">
                <span className="badge badge-info capitalize">
                  {booking.status}
                </span>

                <span
                  className={`badge ${
                    booking.paymentStatus === "paid"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {booking.paymentStatus}
                </span>
              </div>

              <div className="flex gap-3 pt-3">
                {booking.paymentStatus === "unpaid" && (
                  <>
                    <button
                      onClick={() =>
                        navigate(
                          `/dashboard/payment/${booking._id}`
                        )
                      }
                      className="btn btn-primary flex-1"
                    >
                      Pay Now
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(booking._id)
                      }
                      className="btn btn-outline flex-1"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {booking.paymentStatus === "paid" && (
                  <button
                    disabled
                    className="btn btn-success w-full"
                  >
                    Payment Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDecoration;
