// src/layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-base-100">
      {/* =========================
          LEFT SIDE – IMAGE / BRAND
          ========================= */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-style-primary to-style-secondary text-white p-12">
        {/* LOGO IMAGE (PostImages link here) */}
        {/* put your postimage logo link here */}
        <img
          src="https://i.postimg.cc/XXXXXX/styledecor-logo.png" // ← put your postimage logo here
          alt="StyleDecor Logo"
          className="w-32 mb-6"
        />

        <h1 className="text-4xl font-extrabold mb-4 text-center">
          Welcome to StyleDecor
        </h1>

        <p className="text-lg text-center max-w-md opacity-90">
          Book beautiful home & ceremony decorations with professional decorators.
          Smart scheduling, real-time updates, and premium designs.
        </p>

        {/* AUTH PAGE IMAGE */}
        {/* put your postimage auth banner here */}
        <img
          src="https://i.postimg.cc/XXXXXX/auth-banner.png" // ← postimage auth page image
          alt="Decoration"
          className="mt-10 rounded-xl shadow-2xl max-w-md"
        />
      </div>

      {/* =========================
          RIGHT SIDE – FORM CONTENT
          ========================= */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md bg-white card p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
