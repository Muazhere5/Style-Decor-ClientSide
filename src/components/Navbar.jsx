import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-style-secondary font-bold"
      : "hover:text-style-secondary transition font-semibold";

  return (
    <div className="sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="navbar max-w-7xl mx-auto px-4">
        
        {/* ================= LEFT: LOGO ================= */}
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://i.postimg.cc/VvDRzKJS/Style-Decor-Logo.png"
              alt="StyleDecor Logo"
              className="w-12 h-12 rounded-full"
            />
            <span className="text-2xl font-extrabold text-style-primary">
              StyleDecor
            </span>
          </Link>
        </div>

        {/* ================= CENTER: NAV LINKS ================= */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-6 text-base">
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to="/booking" className={navLinkClass}>Booking</NavLink></li>
            <li><NavLink to="/coverage" className={navLinkClass}>Coverage</NavLink></li>
            <li><NavLink to="/track" className={navLinkClass}>Track Service</NavLink></li>
          </ul>
        </div>

        {/* ================= RIGHT: AUTH / PROFILE ================= */}
        <div className="navbar-end gap-4">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to={
                  role === "admin"
                    ? "/dashboard/admin-home"
                    : role === "decorator"
                    ? "/dashboard/decorator-home"
                    : "/dashboard/user-home"
                }
                className="btn btn-primary"
              >
                Dashboard
              </Link>

              {/* ===== PROFILE DROPDOWN ===== */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="cursor-pointer">
                  <img
                    src={user.photoURL || "https://i.postimg.cc/default-user.png"}
                    className="w-10 h-10 rounded-full ring-2 ring-style-primary"
                    alt="profile"
                  />
                </label>

                <ul
                  tabIndex={0}
                  className="dropdown-content mt-3 p-4 shadow-xl bg-base-100 rounded-xl w-60 space-y-2"
                >
                  <li className="text-center">
                    <p className="font-bold">{user.displayName}</p>
                    <p className="text-sm opacity-70">{user.email}</p>
                  </li>

                  <div className="divider"></div>

                  <li>
                    <Link
                      to="/dashboard"
                      className="btn btn-outline w-full"
                    >
                      My Profile
                    </Link>
                  </li>

                  <li>
                    <button
                      type="button" // ✅ important for logout
                      onClick={logOut}
                      className="btn btn-secondary w-full"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
