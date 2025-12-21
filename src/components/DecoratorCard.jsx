const DecoratorCard = () => {
  return (
    <div className="card text-center hover:shadow-2xl transition">
      
      {/* 🔗 PUT DECORATOR IMAGE FROM POSTIMAGE HERE */}
      <figure className="px-10 pt-10">
        <img
          src="https://i.postimg.cc/YOUR-DECORATOR.png"
          alt="Decorator"
          className="rounded-full w-32 h-32 object-cover ring-4 ring-style-primary"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title justify-center">
          Rahim Decor Studio
        </h2>

        <p className="text-sm opacity-80">
          Wedding • Home • Corporate Events
        </p>

        <div className="rating rating-sm justify-center mt-2">
          <input type="radio" className="mask mask-star-2 bg-orange-400" checked />
          <input type="radio" className="mask mask-star-2 bg-orange-400" checked />
          <input type="radio" className="mask mask-star-2 bg-orange-400" checked />
          <input type="radio" className="mask mask-star-2 bg-orange-400" checked />
          <input type="radio" className="mask mask-star-2 bg-orange-400" />
        </div>

        <button className="btn btn-outline mt-4">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default DecoratorCard;
