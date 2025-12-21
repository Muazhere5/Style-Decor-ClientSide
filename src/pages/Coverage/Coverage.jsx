import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Coverage = () => {
  const [centers, setCenters] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  useEffect(() => {
    fetch("/ServiceCenter.json")
      .then(res => res.json())
      .then(data => setCenters(data));
  }, []);

  /* =====================
     SEARCH + FILTER LOGIC
  ===================== */
  const filteredCenters = centers.filter(center => {
    const textMatch =
      center.region.toLowerCase().includes(search.toLowerCase()) ||
      center.district.toLowerCase().includes(search.toLowerCase()) ||
      center.city.toLowerCase().includes(search.toLowerCase()) ||
      center.covered_area.join(" ").toLowerCase().includes(search.toLowerCase());

    const regionMatch = region === "all" || center.region === region;

    return textMatch && regionMatch;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* =======================
          PAGE HEADER
      ======================= */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-style-primary">
          Service Coverage
        </h1>
        <p className="mt-2 text-gray-600 text-lg">
          Explore StyleDecor service areas across Bangladesh
        </p>
      </div>

      {/* =======================
          SEARCH & FILTER
      ======================= */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by region, district, city, area..."
          className="input input-bordered input-lg w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered select-lg w-full"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="all">All Regions</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chattogram">Chattogram</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Rajshahi">Rajshahi</option>
          <option value="Khulna">Khulna</option>
          <option value="Barishal">Barishal</option>
          <option value="Rangpur">Rangpur</option>
          <option value="Mymensingh">Mymensingh</option>
        </select>
      </div>

      {/* =======================
          MAP
      ======================= */}
      <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg mb-10">
        <MapContainer
          center={[23.8103, 90.4125]}
          zoom={7}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredCenters.map(center => (
            <Marker
              key={center.id}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <h3 className="font-bold text-style-primary">
                  {center.city}
                </h3>
                <p className="text-sm">
                  <strong>District:</strong> {center.district}
                </p>
                <p className="text-sm">
                  <strong>Areas:</strong> {center.covered_area.join(", ")}
                </p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* =======================
          LIST VIEW
      ======================= */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCenters.map(center => (
          <div key={center.id} className="card p-6">
            <h3 className="text-xl font-bold text-style-primary">
              {center.city}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {center.district}, {center.region}
            </p>
            <p className="mt-3 text-sm">
              <strong>Covered Areas:</strong>
              <br />
              {center.covered_area.join(", ")}
            </p>
            <span className="mt-4 inline-block badge badge-success badge-lg">
              Active
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Coverage;
