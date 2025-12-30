const DecoratorCard = ({ decorator }) => {
  const { name, email, experience } = decorator;

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
      <figure className="pt-8">
        <img
          src="https://i.postimg.cc/zB81bGHH/Simple-Person-Avatar.png"
          alt={name}
          className="w-28 h-28 rounded-full object-cover ring-4 ring-style-primary"
        />
      </figure>

      <div className="card-body text-center">
        <h2 className="card-title justify-center">{name}</h2>

        <p className="text-sm opacity-70">{email}</p>

        <p className="text-sm mt-2 line-clamp-3">
          {experience}
        </p>

        <div className="rating rating-sm justify-center mt-3">
          {[...Array(5)].map((_, i) => (
            <input
              key={i}
              type="radio"
              className="mask mask-star-2 bg-orange-400"
              checked
              readOnly
            />
          ))}
        </div>

        <button className="btn btn-outline btn-sm mt-4">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default DecoratorCard;
