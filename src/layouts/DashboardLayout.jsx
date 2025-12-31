
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiLogOut, FiCheckCircle, FiUsers } from "react-icons/fi";
import { MdDashboard, MdDesignServices, MdTrackChanges, MdPayment } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { logOut } = useAuth();
  const { role, roleLoading } = useRole();
  const navigate = useNavigate();

  
  if (roleLoading || !role) {
    return (
      <div className="loading-indicator flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleLogout = async () => {
    await logOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex">
      
      <aside className="w-72 bg-white border-r shadow-lg flex flex-col">
        <nav className="p-4 space-y-2 flex-1">
          
          {role === "user" && (
            <>
              <NavItem to="/dashboard/user-home" icon={<MdDashboard />} label="Dashboard" />
              <NavItem to="/dashboard/user-home" icon={<MdDashboard />} label="Dashboard" />
              <NavItem to="/dashboard/payment-history" icon={<MdPayment />} label="Payment History" />
            </>
          )}

          
          {role === "decorator" && (
            <>
              <NavItem to="/dashboard/decorator-home" icon={<MdDashboard />} label="Dashboard" />
              <NavItem to="/dashboard/assigned-services" icon={<MdDesignServices />} label="Assigned Services" />
              <NavItem to="/dashboard/completed-services" icon={<FiCheckCircle />} label="Completed Services" />
            </>
          )}

          
          {role === "admin" && (
            <>
              <NavItem to="/dashboard/admin-home" icon={<MdDashboard />} label="Dashboard" />
              <NavItem to="/dashboard/users" icon={<FiUsers />} label="User Management" />
              <NavItem to="/dashboard/approve-decorator" icon={<FiUsers />} label="Approve Decorators" />
              <NavItem to="/dashboard/assigned-decorator" icon={<FiUsers />} label="Assign Decorator" />
              <NavItem to="/dashboard/track-service" icon={<MdTrackChanges />} label="Service Status" />
            </>
          )}
        </nav>

        
        <div className="px-4 pb-3">
          <button
            onClick={() => navigate("/")}
            className="
              w-full flex items-center gap-3 px-4 py-3
              rounded-xl border border-primary
              text-primary font-semibold
              hover:bg-primary hover:text-white
              transition-all duration-300
              group
            "
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back To Home Page
          </button>
        </div>

        
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="btn btn-secondary w-full flex items-center gap-2"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      
      <main className="flex-1 p-6 overflow-y-auto bg-base-100">
        <Outlet />
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold ${
        isActive
          ? "bg-primary text-white"
          : "text-gray-700 hover:bg-primary hover:text-white"
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);

export default DashboardLayout;
