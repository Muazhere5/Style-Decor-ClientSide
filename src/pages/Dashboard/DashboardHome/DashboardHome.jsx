import useRole from "../../../hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import DecoratorDashboardHome from "./DecoratorDashboardHome";
import UserDashboardHome from "./UserDashboardHome";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <div className="loading-indicator">Loading dashboard...</div>;
  }

  if (role === "admin") return <AdminDashboardHome />;
  if (role === "decorator") return <DecoratorDashboardHome />;
  return <UserDashboardHome />;
};

export default DashboardHome;
