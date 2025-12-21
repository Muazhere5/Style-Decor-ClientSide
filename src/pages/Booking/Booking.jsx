import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Booking = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [centers, setCenters] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);

  const [formData, setFormData] = useState({
    serviceType: "",
    eventType: "",
    bookingDate: "",
    timeSlot: "",
    region: "",
    district: "",
    area: "",
    address: "",
    notes: "",
  });

  /* ==========================
     Load ServiceCenter.json
  ========================== */
  useEffect(() => {
    fetch("/ServiceCenter.json")
      .then(res => res.json())
      .then(data => setCenters(data));
  }, []);

  /* ==========================
     Handle Select Changes
  ========================== */
  const handleRegionChange = region => {
    setFormData({ ...formData, region, district: "", area: "" });
    setDistricts(centers.filter(c => c.region === region));
    setAreas([]);
  };

  const handleDistrictChange = district => {
    setFormData({ ...formData, district, area: "" });
    const found = centers.find(c => c.district === district);
    setAreas(found?.covered_area || []);
  };

  /* ==========================
     Submit Booking
  ========================== */
  const handleSubmit = async e => {
    e.preventDefault();

    const booking = {
      ...formData,
      userEmail: user.email,
      userName: user.displayName,
      status: "pending",
      paymentStatus: "unpaid",
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/bookings", booking);
      toast.success("🎉 Booking created successfully!");
    } catch (err) {
      toast.error("❌ Failed to create booking");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2 text-style-primary">
        Book Decoration Service
      </h1>
      <p className="mb-8 text-gray-600">
        Fill the details carefully to book your dream decoration ✨
      </p>

      <form onSubmit={handleSubmit} className="card p-8 space-y-6">

        {/* User Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <input value={user.displayName} disabled className="input input-bordered" />
          <input value={user.email} disabled className="input input-bordered" />
        </div>

        {/* Service Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <select required className="select select-bordered"
            onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
          >
            <option value="">Select Service Type</option>
            <option>Home Decoration</option>
            <option>Wedding Decoration</option>
            <option>Office Decoration</option>
            <option>Event Decoration</option>
          </select>

          <input
            type="text"
            placeholder="Event Type (Birthday, Wedding, etc)"
            className="input input-bordered"
            required
            onChange={e => setFormData({ ...formData, eventType: e.target.value })}
          />
        </div>

        {/* Date & Time */}
        <div className="grid md:grid-cols-2 gap-6">
          <input type="date" required className="input input-bordered"
            onChange={e => setFormData({ ...formData, bookingDate: e.target.value })}
          />
          <select required className="select select-bordered"
            onChange={e => setFormData({ ...formData, timeSlot: e.target.value })}
          >
            <option value="">Select Time Slot</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </div>

        {/* Location */}
        <div className="grid md:grid-cols-3 gap-6">
          <select required className="select select-bordered"
            onChange={e => handleRegionChange(e.target.value)}
          >
            <option value="">Region</option>
            {[...new Set(centers.map(c => c.region))].map(r => (
              <option key={r}>{r}</option>
            ))}
          </select>

          <select required className="select select-bordered"
            onChange={e => handleDistrictChange(e.target.value)}
          >
            <option value="">District</option>
            {districts.map(d => (
              <option key={d.district}>{d.district}</option>
            ))}
          </select>

          <select required className="select select-bordered"
            onChange={e => setFormData({ ...formData, area: e.target.value })}
          >
            <option value="">Area</option>
            {areas.map(a => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Full Address & Instructions"
          required
          onChange={e => setFormData({ ...formData, address: e.target.value })}
        />

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Special Notes (Optional)"
          onChange={e => setFormData({ ...formData, notes: e.target.value })}
        />

        <button className="btn btn-primary w-full text-lg">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;
