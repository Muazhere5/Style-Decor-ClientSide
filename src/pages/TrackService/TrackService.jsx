import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const TrackService = () => {
  const axiosSecure = useAxiosSecure();
  const [completedBookings, setCompletedBookings] = useState([]);
  const [chartData, setChartData] = useState([]);

  /* ===============================
     LOAD COMPLETED BOOKINGS
  =============================== */
  const loadCompletedBookings = async () => {
    const res = await axiosSecure.get("/bookings/completed");
    setCompletedBookings(res.data);
    prepareChartData(res.data);
  };

  useEffect(() => {
    loadCompletedBookings();
  }, []);

  /* ===============================
     PREPARE CHART DATA
  =============================== */
  const prepareChartData = bookings => {
    const grouped = {};

    bookings.forEach(b => {
      const month = new Date(b.createdAt).toLocaleString("default", {
        month: "short",
      });
      grouped[month] = (grouped[month] || 0) + 1;
    });

    const data = Object.keys(grouped).map(m => ({
      month: m,
      completed: grouped[m],
    }));

    setChartData(data);
  };

  /* ===============================
     DELETE BOOKING
  =============================== */
  const handleDelete = async id => {
    const confirm = await Swal.fire({
      title: "Delete Completed Booking?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/bookings/${id}`);
      Swal.fire("Deleted!", "Booking has been removed.", "success");
      loadCompletedBookings();
    }
  };

  return (
    <div className="p-6 space-y-12">

      {/* ===============================
         HEADER
      =============================== */}
      <div>
        <h1 className="text-3xl font-bold text-purple-600">
          Service Status & Payments
        </h1>
        <p className="text-gray-500">
          Analytics & completed service tracking
        </p>
      </div>

      {/* ===============================
         GRAPH
      =============================== */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-purple-600">
          Completed Services Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#9333ea"
              fillOpacity={1}
              fill="url(#colorPurple)"
            />
          </AreaChart>
        </ResponsiveContainer>

        <p className="mt-4 text-sm text-gray-600">
          Total Completed Bookings:{" "}
          <span className="font-bold text-purple-600">
            {completedBookings.length}
          </span>
        </p>
      </div>

      {/* ===============================
         DELETE DROPDOWN
      =============================== */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-purple-600">
          Delete Booking
        </h2>

        {completedBookings.length === 0 ? (
          <p className="text-gray-500">No completed bookings available.</p>
        ) : (
          <div className="space-y-4">
            {completedBookings.map(b => (
              <div
                key={b._id}
                className="flex justify-between items-center border p-4 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{b.serviceType}</p>
                  <p className="text-sm text-gray-500">{b.userEmail}</p>
                  <p className="text-sm text-gray-400">
                    Completed on{" "}
                    {new Date(b.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(b._id)}
                  className="px-4 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackService;
