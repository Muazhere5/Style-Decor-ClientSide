const Loader = () => {
  return (
    <div className="loading-indicator bg-base-100">
      <div className="flex flex-col items-center gap-6">
        
        {/* 🔗 PUT YOUR POSTIMAGE LOGO LINK HERE */}
        <img
          src="https://i.postimg.cc/VvDRzKJS/Style-Decor-Logo.png"
          alt="Loading..."
          className="w-20 animate-bounce"
        />

        <h2 className="text-xl font-bold text-style-primary tracking-wide">
          Crafting Beautiful Moments...
        </h2>

        <span className="loading loading-dots loading-lg text-style-secondary"></span>
      </div>
    </div>
  );
};

export default Loader;
