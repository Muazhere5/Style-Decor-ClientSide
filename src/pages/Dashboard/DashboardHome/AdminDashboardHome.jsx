import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-[60vh] items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const totalBookings = bookings.length;
  const paidBookings = bookings.filter(
    b => b.paymentStatus === "paid"
  ).length;
  const unpaidBookings = totalBookings - paidBookings;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">📊 Admin Dashboard</h1>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card bg-base-100 p-6 shadow">
          <h3 className="text-lg font-semibold">Total Bookings</h3>
          <p className="text-4xl font-bold text-primary">
            {totalBookings}
          </p>
        </div>

        <div className="card bg-base-100 p-6 shadow">
          <h3 className="text-lg font-semibold">Paid</h3>
          <p className="text-4xl font-bold text-green-600">
            {paidBookings}
          </p>
        </div>

        <div className="card bg-base-100 p-6 shadow">
          <h3 className="text-lg font-semibold">Unpaid</h3>
          <p className="text-4xl font-bold text-red-500">
            {unpaidBookings}
          </p>
        </div>
      </div>

      {/* BOOKINGS TABLE */}
      <div className="card bg-base-100 shadow p-4">
        <h2 className="text-xl font-semibold mb-4">
          📋 Booking Details
        </h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={b._id}>
                  <td>{i + 1}</td>
                  <td>
                    <p className="font-semibold">
                      {b.userName || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {b.userEmail}
                    </p>
                  </td>
                  <td>{b.serviceType}</td>
                  <td>
                    {new Date(
                      b.bookingDate
                    ).toLocaleDateString()}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        b.paymentStatus === "paid"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-outline capitalize">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
