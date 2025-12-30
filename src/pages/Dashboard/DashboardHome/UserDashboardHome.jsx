import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const calculatePrice = booking => {
  let base = 10000;

  if (booking.region === "Dhaka") base += 3000;
  if (booking.region === "Chattogram") base += 2000;

  if (booking.timeSlot === "Evening") base += 1500;
  if (booking.timeSlot === "Night") base += 2500;

  const eventDate = new Date(booking.bookingDate);
  const day = eventDate.getDay();
  if (day === 5 || day === 6) base += 2000; // Fri/Sat

  return base;
};

const UserDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axiosSecure.get("/bookings/user").then(res => {
      const withPrice = res.data.map(b => ({
        ...b,
        price: calculatePrice(b),
      }));
      setBookings(withPrice);
    });
  }, [axiosSecure]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">📦 My Bookings</h1>

      <div className="overflow-x-auto card shadow p-4">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map(b => (
              <tr key={b._id}>
                <td>{b.serviceType}</td>
                <td>{b.bookingDate}</td>
                <td>
                  <span className="badge badge-outline capitalize">
                    {b.paymentStatus}
                  </span>
                </td>
                <td>৳{b.price}</td>
                <td>
                  {b.paymentStatus === "unpaid" && b.status === "pending" ? (
                    <Link
                      to={`/dashboard/payment/${b._id}`}
                      className="btn btn-xs btn-primary"
                    >
                      Pay
                    </Link>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      Paid
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboardHome;
