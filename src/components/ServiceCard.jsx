import { Link } from "react-router-dom";

export const servicesData = [
  // HOME
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

  // WEDDING
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

  // EVENT
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

  // OFFICE
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

const ServiceCard = ({ service }) => {
  const { name, title, subtitle, image, cost, type } = service;

  return (
    <div className="card bg-white shadow-lg hover:shadow-xl transition">
      <img
        src={image}
        alt={name}
        className="h-56 w-full object-cover rounded-t-lg"
      />

      <div className="p-6 space-y-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-500">{subtitle}</p>
        <p className="font-semibold">Type: {type}</p>
        <p className="font-bold text-style-primary">৳ {cost}</p>

        <Link to="/booking" className="btn btn-primary w-full mt-4">
          Book Service
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
