// src/layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-base-100">
      
      {/* LEFT SIDE – BRANDING */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-style-primary to-style-secondary text-white px-12">
        
        {/* LOGO */}
        <img
          src="https://i.postimg.cc/VvDRzKJS/Style-Decor-Logo.png"
          alt="StyleDecor Logo"
          className="w-36 mb-6"
        />

        <h1 className="text-4xl font-extrabold mb-4 text-center">
          Welcome to StyleDecor
        </h1>

        <p className="text-lg text-center max-w-md opacity-90">
          Book beautiful home & ceremony decorations with professional decorators.
        </p>

        {/* BANNER IMAGE */}
        <img
          src="https://i.postimg.cc/bwmnFZpt/Event-Management-Banner.png"
          alt="Decoration"
          className="mt-10 rounded-2xl shadow-2xl max-w-lg"
        />
      </div>

      {/* RIGHT SIDE – FORM */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md bg-white card p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
