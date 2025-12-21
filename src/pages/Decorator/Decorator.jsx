import { useEffect, useState } from "react";
import axios from "axios";

const Decorator = () => {
  const [decorators, setDecorators] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ============================
     FETCH DECORATORS
  ============================ */
  useEffect(() => {
    const fetchDecorators = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/decorators`
        );
        setDecorators(res.data);
      } catch (error) {
        console.error("Failed to load decorators");
      } finally {
        setLoading(false);
      }
    };

    fetchDecorators();
  }, []);

  /* ============================
     SEARCH FILTER
  ============================ */
  const filteredDecorators = decorators.filter(decorator =>
    decorator.name?.toLowerCase().includes(search.toLowerCase()) ||
    decorator.specialty?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* ============================
            HEADER
        ============================ */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">
            Meet Our Professional Decorators
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Skilled decorators specialized in weddings, homes, offices, and
            premium event designs.
          </p>
        </div>

        {/* ============================
            SEARCH BAR
        ============================ */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search by name or specialty"
            className="input input-bordered w-full text-lg"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* ============================
            LOADING
        ============================ */}
        {loading && (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-secondary"></span>
          </div>
        )}

        {/* ============================
            DECORATOR GRID
        ============================ */}
        {!loading && filteredDecorators.length === 0 && (
          <p className="text-center text-gray-500">
            No decorators found.
          </p>
        )}

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDecorators.map(decorator => (
            <div key={decorator._id} className="card p-6 text-center">
              {/* 🔗 Put decorator profile image postimage link here */}
              <img
                src={decorator.photoURL || "https://i.postimg.cc/default-decorator.png"}
                alt={decorator.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />

              <h3 className="text-xl font-bold mb-1">
                {decorator.name}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                {decorator.specialty}
              </p>

              <p className="text-sm text-gray-600 mb-4">
                Experience: {decorator.experience || "3+"} years
              </p>

              <span className="badge badge-success badge-lg">
                Verified Decorator
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Decorator;
