import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();

  /* ============================
     Dynamic Page Title Control
  ============================ */
  useEffect(() => {
    const path = location.pathname;
    let title = "StyleDecor | Smart Decoration Booking";

    if (path === "/") {
      title = "StyleDecor | Beautiful Home & Ceremony Decorations";
    } else if (path.startsWith("/services")) {
      title = "StyleDecor | Decoration Services";
    } else if (path.startsWith("/service/")) {
      title = "StyleDecor | Service Details";
    } else if (path.startsWith("/coverage")) {
      title = "StyleDecor | Service Coverage";
    } else if (path.startsWith("/track")) {
      title = "StyleDecor | Track Your Service";
    } else if (path.startsWith("/login")) {
      title = "StyleDecor | Login";
    } else if (path.startsWith("/register")) {
      title = "StyleDecor | Create Account";
    } else if (path.startsWith("/dashboard")) {
      title = "StyleDecor | Dashboard";
    } else {
      title = "StyleDecor | Page Not Found";
    }

    document.title = title;
  }, [location.pathname]);

  /* ============================
     Layout Conditions
  ============================ */
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAuthPage =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register");

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* Navbar hidden in Dashboard & Auth pages */}
      {!isDashboard && !isAuthPage && <Navbar />}

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer hidden in Dashboard & Auth pages */}
      {!isDashboard && !isAuthPage && <Footer />}
    </div>
  );
};

export default App;
