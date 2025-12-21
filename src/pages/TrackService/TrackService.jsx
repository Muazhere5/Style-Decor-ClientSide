import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const TrackService = () => {
  const [trackingNo, setTrackingNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState([]);

  /* ============================
     HANDLE TRACK SERVICE
  ============================ */
  const handleTrack = async e => {
    e.preventDefault();

    if (!trackingNo) {
      toast.error("Please enter your tracking number");
      return;
    }

    try {
      setLoading(true);
      setTrackingData([]);

      // 🔗 Backend tracking endpoint
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/tracking/${trackingNo}`
      );

      if (res.data.length === 0) {
        toast.error("No tracking information found");
      } else {
        setTrackingData(res.data);
        toast.success("Tracking data loaded successfully");
      }
    } catch (error) {
      toast.error("Failed to track service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-4xl mx-auto px-4">
        {/* ============================
            HEADER
        ============================ */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-neutral mb-4">
            Track Your Decoration Service
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Enter your tracking number to see the real-time progress of your
            decoration service.
          </p>
        </div>

        {/* ============================
            TRACK FORM
        ============================ */}
        <form
          onSubmit={handleTrack}
          className="card p-8 mb-12 border border-gray-200"
        >
          <label className="font-bold mb-2 block text-neutral">
            Tracking Number
          </label>

          <div className="flex gap-4 flex-col sm:flex-row">
            <input
              type="text"
              placeholder="Enter 6-digit tracking number"
              className="input input-bordered w-full text-lg"
              value={trackingNo}
              onChange={e => setTrackingNo(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-primary text-lg min-w-[160px]"
            >
              Track Service
            </button>
          </div>
        </form>

        {/* ============================
            LOADING STATE
        ============================ */}
        {loading && (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {/* ============================
            TRACKING TIMELINE
        ============================ */}
        {!loading && trackingData.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">
              Service Progress Timeline
            </h2>

            <ol className="relative border-l border-primary pl-6">
              {trackingData.map((item, index) => (
                <li key={index} className="mb-8">
                  <span className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-primary"></span>

                  <div className="card p-5">
                    <h3 className="font-bold text-lg text-neutral">
                      {item.status}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(item.date).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrackService;
