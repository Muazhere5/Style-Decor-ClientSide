import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyDecoration = () => {
  const navigate = useNavigate();

  // 🔹 Services data (moved inside this file)
  const services = [
    {
      id: 1,
      name: "Luxury Living Room",
      type: "Home",
      cost: 12000,
      title: "Modern Home Styling",
      subtitle: "Premium furniture & lighting setup",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      name: "Minimal Home Decor",
      type: "Home",
      cost: 8000,
      title: "Minimal & Clean",
      subtitle: "Soft tones & elegant finishing",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      name: "Royal Wedding Stage",
      type: "Wedding",
      cost: 45000,
      title: "Royal Wedding Setup",
      subtitle: "Luxury floral & lighting design",
      image:
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 4,
      name: "Outdoor Wedding",
      type: "Wedding",
      cost: 35000,
      title: "Garden Wedding Decor",
      subtitle: "Elegant outdoor theme",
      image:
        "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 5,
      name: "Birthday Bash",
      type: "Event",
      cost: 15000,
      title: "Birthday Party Setup",
      subtitle: "Colorful & joyful decorations",
      image:
        "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 6,
      name: "Festive Celebration",
      type: "Event",
      cost: 18000,
      title: "Festival Decor",
      subtitle: "Bright festive design",
      image:
        "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 7,
      name: "Corporate Meeting",
      type: "Office",
      cost: 20000,
      title: "Professional Office Decor",
      subtitle: "Corporate theme setup",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  // 🔹 Filter states
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  // 🔹 Filter logic
  const filteredServices = services.filter((service) => {
    return (
      service.name.toLowerCase().includes(search.toLowerCase()) &&
      (type === "" || service.type === type) &&
      (min === "" || service.cost >= Number(min)) &&
      (max === "" || service.cost <= Number(max))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-700">
          Explore Our Decoration Services
        </h2>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <input
            type="text"
            placeholder="Search service..."
            className="input input-bordered"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-bordered"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Types</option>
            <option>Home</option>
            <option>Wedding</option>
            <option>Event</option>
            <option>Office</option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            className="input input-bordered"
            onChange={(e) => setMin(e.target.value)}
          />

          <input
            type="number"
            placeholder="Max Price"
            className="input input-bordered"
            onChange={(e) => setMax(e.target.value)}
          />
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden group"
            >
              <img
                src={service.image}
                alt={service.name}
                className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
              />

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-500 mt-1">{service.subtitle}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-semibold text-purple-600">
                    ৳ {service.cost}
                  </span>

                  <span className="badge bg-pink-100 text-pink-600 border-none">
                    {service.type}
                  </span>
                </div>

                <button
                  onClick={() => navigate("/booking")}
                  className="btn w-full mt-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white border-none hover:opacity-90"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MyDecoration;
