// src/layouts/DashboardLayout.jsx
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FiHome,
  FiUser,
  FiLogOut,
  FiCheckCircle,
  FiUsers,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { MdDashboard, MdPayment, MdDesignServices } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { role, roleLoading } = useRole(); // ✅ FIXED
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (roleLoading) {
    return (
      <div className="loading-indicator">
        {/* put your postimage logo here */}
        <img
          src="https://i.postimg.cc/XXXXXX/styledecor-logo.png"
          alt="Loading"
          className="w-20 animate-pulse"
        />
      </div>
    );
  }

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  /* =========================
     ROLE BASED DASHBOARD LINK
  ========================= */
  const dashboardPath =
    role === "admin"
      ? "/dashboard/admin-home"
      : role === "decorator"
      ? "/dashboard/decorator-home"
      : "/dashboard/user-home";

  /* =========================
     PAGE TITLE + BREADCRUMB
  ========================= */
  const pageTitle = location.pathname
    .split("/")
    .pop()
    ?.replace("-", " ")
    ?.toUpperCase();

  return (
    <div className="min-h-screen flex bg-base-100">
      {/* =========================
          MOBILE HEADER
      ========================= */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow flex items-center justify-between px-4 py-3">
        <button onClick={() => setSidebarOpen(true)}>
          <FiMenu className="text-2xl" />
        </button>

        {/* Logo */}
        <img
          src="https://i.postimg.cc/XXXXXX/styledecor-logo.png"
          alt="StyleDecor"
          className="w-28"
        />
      </div>

      {/* =========================
          SIDEBAR
      ========================= */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72
        bg-gradient-to-b from-white to-purple-50
        border-r shadow-xl flex flex-col
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* MOBILE CLOSE */}
        <div className="lg:hidden p-4 flex justify-end">
          <button onClick={() => setSidebarOpen(false)}>
            <FiX className="text-2xl" />
          </button>
        </div>

        {/* LOGO */}
        <div className="p-6 border-b">
          <img
            src="https://i.postimg.cc/XXXXXX/styledecor-logo.png"
            alt="StyleDecor"
            className="w-32 mx-auto"
          />
        </div>

        {/* USER INFO */}
        <div className="p-6 flex items-center gap-4 border-b">
          <img
            src={user?.photoURL || "https://i.postimg.cc/XXXXXX/user.png"}
            alt="User"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-bold">{user?.displayName}</h4>
            <p className="text-sm text-gray-500 capitalize">{role}</p>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-4 space-y-2">
          <NavItem to={dashboardPath} icon={<MdDashboard />} label="Dashboard" />

          {role === "user" && (
            <>
              <NavItem to="/dashboard/my-services" icon={<MdDesignServices />} label="My Bookings" />
              <NavItem to="/dashboard/payment-history" icon={<MdPayment />} label="Payment History" />
            </>
          )}

          {role === "decorator" && (
            <>
              <NavItem to="/dashboard/assigned-services" icon={<FiCheckCircle />} label="Assigned Services" />
              <NavItem to="/dashboard/completed-services" icon={<FiHome />} label="Completed Services" />
            </>
          )}

          {role === "admin" && (
            <>
              <NavItem to="/dashboard/admin-home" icon={<FiHome />} label="Admin Home" />
              <NavItem to="/dashboard/users" icon={<FiUsers />} label="User Management" />
              <NavItem to="/dashboard/approve-decorator" icon={<FiUser />} label="Approve Decorators" />
            </>
          )}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="btn btn-secondary w-full flex items-center justify-center gap-2"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0 p-6 overflow-y-auto">
        {/* BREADCRUMB / TITLE */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{pageTitle}</h1>
          <p className="text-sm text-gray-500">
            Dashboard / {pageTitle}
          </p>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

/* =========================
   NAV ITEM
========================= */
const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all
        ${
          isActive
            ? "bg-style-primary text-white shadow-md scale-[1.02]"
            : "text-gray-700 hover:bg-style-primary/90 hover:text-white"
        }`
      }
    >
      <span className="text-xl">{icon}</span>
      {label}
    </NavLink>
  );
};

export default DashboardLayout;
