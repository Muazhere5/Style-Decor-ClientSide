// src/layouts/DashboardLayout.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiHome, FiUser, FiLogOut, FiCheckCircle, FiUsers } from "react-icons/fi";
import { MdDashboard, MdPayment, MdDesignServices } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { role, loading } = useRole();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="loading-indicator">
        {/* Loader Logo */}
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

  return (
    <div className="min-h-screen flex bg-base-100">
      {/* =========================
          SIDEBAR
          ========================= */}
      <aside className="w-72 bg-white border-r shadow-lg flex flex-col">
        {/* LOGO */}
        <div className="p-6 border-b">
          {/* put your postimage logo here */}
          <img
            src="https://i.postimg.cc/XXXXXX/styledecor-logo.png"
            alt="StyleDecor"
            className="w-32 mx-auto"
          />
        </div>

        {/* USER INFO */}
        <div className="p-6 flex items-center gap-4 border-b">
          <img
            src={user?.photoURL || "https://i.postimg.cc/XXXXXX/user.png"} // postimage default user
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
          {/* COMMON */}
          <NavItem to="/dashboard/user-home" icon={<MdDashboard />} label="Dashboard" />

          {/* USER */}
          {role === "user" && (
            <>
              <NavItem to="/dashboard/my-services" icon={<MdDesignServices />} label="My Bookings" />
              <NavItem to="/dashboard/payment-history" icon={<MdPayment />} label="Payment History" />
            </>
          )}

          {/* DECORATOR */}
          {role === "decorator" && (
            <>
              <NavItem to="/dashboard/assigned-services" icon={<FiCheckCircle />} label="Assigned Services" />
              <NavItem to="/dashboard/completed-services" icon={<FiHome />} label="Completed Services" />
            </>
          )}

          {/* ADMIN */}
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
      <main className="flex-1 p-6 bg-base-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

/* =========================
   NAV ITEM COMPONENT
========================= */
const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all
        ${
          isActive
            ? "bg-style-primary text-white shadow-md"
            : "text-gray-700 hover:bg-style-primary hover:text-white"
        }`
      }
    >
      <span className="text-xl">{icon}</span>
      {label}
    </NavLink>
  );
};

export default DashboardLayout;
