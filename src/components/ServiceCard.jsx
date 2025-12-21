const ServiceCard = () => {
  return (
    <div className="card hover:scale-105 transition duration-300">
      
      {/* 🔗 PUT SERVICE IMAGE FROM POSTIMAGE HERE */}
      <figure>
        <img
          src="https://i.postimg.cc/YOUR-SERVICE-IMAGE.png"
          alt="Service"
          className="h-56 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-style-primary">
          Wedding Stage Decoration
        </h2>

        <p className="text-sm opacity-80">
          Premium floral & lighting setup for weddings and ceremonies.
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-lg text-style-secondary">
            ৳45,000
          </span>

          <button className="btn btn-primary">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
