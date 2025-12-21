// src/router/router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PrivateRoute from "./PrivateRoute";

// Pages
import Home from "../pages/Home/Home";
import TrackService from "../pages/TrackService/TrackService";
import Coverage from "../pages/Coverage/Coverage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// Dashboard Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Dashboard Pages
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import UserDashboardHome from "../pages/Dashboard/DashboardHome/UserDashboardHome";
import DecoratorDashboardHome from "../pages/Dashboard/DashboardHome/DecoratorDashboardHome";
import AdminDashboardHome from "../pages/Dashboard/DashboardHome/AdminDashboardHome";

import MyDecoration from "../pages/Dashboard/MyService/MyDecoration";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import AssignedService from "../pages/Dashboard/AssignedService/AssignedService";
import CompletedService from "../pages/Dashboard/CompletedService/CompletedService";
import UserManagement from "../pages/Dashboard/UserManagement/UserManagement";
import ApproveDecorator from "../pages/Dashboard/ApproveDecorator/ApproveDecorator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/track", element: <TrackService /> },
      { path: "/coverage", element: <Coverage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  /* ===========================
     DASHBOARD (LOGIN REQUIRED)
  ============================ */
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },

      // Role-based homes
      { path: "user-home", element: <UserDashboardHome /> },
      { path: "decorator-home", element: <DecoratorDashboardHome /> },
      { path: "admin-home", element: <AdminDashboardHome /> },

      // User
      { path: "my-services", element: <MyDecoration /> },
      { path: "payment/:id", element: <Payment /> },
      { path: "payment-history", element: <PaymentHistory /> },

      // Decorator
      { path: "assigned-services", element: <AssignedService /> },
      { path: "completed-services", element: <CompletedService /> },

      // Admin (TEMP OPEN)
      { path: "users", element: <UserManagement /> },
      { path: "approve-decorator", element: <ApproveDecorator /> },
    ],
  },
]);

export default router;
