const Footer = () => {
  return (
    <footer className="bg-neutral text-base-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* BRAND */}
        <div>
          {/* 🔗 PUT YOUR POSTIMAGE LOGO LINK HERE */}
          <img
            src="https://i.postimg.cc/YOUR-LOGO.png"
            className="w-14 mb-3"
            alt="logo"
          />
          <h2 className="text-2xl font-extrabold text-style-primary">
            StyleDecor
          </h2>
          <p className="mt-3 text-sm opacity-80">
            Smart Home & Ceremony Decoration Booking System.
          </p>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="footer-title">Services</h3>
          <p>Home Decoration</p>
          <p>Wedding Decoration</p>
          <p>Office & Event Setup</p>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="footer-title">Company</h3>
          <p>About Us</p>
          <p>Contact</p>
          <p>Careers</p>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="footer-title">Contact</h3>
          <p>📍 Dhaka, Bangladesh</p>
          <p>📞 +880 1234 567890</p>
          <p>⏰ 9:00 AM – 10:00 PM</p>
        </div>
      </div>

      <div className="border-t border-gray-700 py-5 text-center text-sm opacity-70">
        © {new Date().getFullYear()} StyleDecor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
