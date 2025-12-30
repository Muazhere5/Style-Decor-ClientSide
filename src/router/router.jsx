// src/router/router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

/* ==========================
   ROUTE GUARDS
========================== */
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import DecoratorRoute from "./DecoratorRoute";

/* ==========================
   PUBLIC PAGES
========================== */
import Home from "../pages/Home/Home";
import Decorator from "../pages/Decorator/Decorator";
import MyDecoration from "../pages/Dashboard/MyService/MyDecoration";

import TrackService from "../pages/TrackService/TrackService";
import Coverage from "../pages/Coverage/Coverage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

/* ==========================
   USER BOOKING
========================== */
import Booking from "../pages/Booking/Booking";

/* ==========================
   DASHBOARD LAYOUT
========================== */
import DashboardLayout from "../layouts/DashboardLayout";

/* ==========================
   DASHBOARD HOMES
========================== */
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import UserDashboardHome from "../pages/Dashboard/DashboardHome/UserDashboardHome";
import DecoratorDashboardHome from "../pages/Dashboard/DashboardHome/DecoratorDashboardHome";
import AdminDashboardHome from "../pages/Dashboard/DashboardHome/AdminDashboardHome";

/* ==========================
   USER DASHBOARD
========================== */

import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";

/* ==========================
   DECORATOR DASHBOARD
========================== */
import AssignedService from "../pages/Dashboard/AssignedService/AssignedService";
import CompletedService from "../pages/Dashboard/CompletedService/CompletedService";

/* ==========================
   ADMIN DASHBOARD
========================== */
import UserManagement from "../pages/Dashboard/UserManagement/UserManagement";
import ApproveDecorator from "../pages/Dashboard/ApproveDecorator/ApproveDecorator";
import AssignedDecorator from "../pages/Dashboard/AssignedDecorator/AssignedDecorator";

/* ==========================
   ROUTER
========================== */
const router = createBrowserRouter([
  /* ==========================
     PUBLIC LAYOUT
  ========================== */
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "decorator", element: <Decorator /> },
      { path: "track", element: <TrackService /> },
      { path: "coverage", element: <Coverage /> },
      { path: "services", element: <MyDecoration /> },

      {
        path: "booking",
        element: (
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        ),
      },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  /* ==========================
     DASHBOARD (PRIVATE)
  ========================== */
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      /* Default dashboard redirect */
      { index: true, element: <DashboardHome /> },

      /* ================= USER ================= */
      {
        path: "user-home",
        element: <UserDashboardHome />,
      },
      
      {
        path: "payment/:id",
        element: <Payment />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },

      /* ================= DECORATOR ================= */
      {
        path: "decorator-home",
        element: (
          <DecoratorRoute>
            <DecoratorDashboardHome />
          </DecoratorRoute>
        ),
      },
      {
        path: "assigned-services",
        element: (
          <DecoratorRoute>
            <AssignedService />
          </DecoratorRoute>
        ),
      },
      {
        path: "completed-services",
        element: (
          <DecoratorRoute>
            <CompletedService />
          </DecoratorRoute>
        ),
      },

      /* ================= ADMIN ================= */
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminDashboardHome />
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
      },
      {
        path: "approve-decorator",
        element: (
          <AdminRoute>
            <ApproveDecorator />
          </AdminRoute>
        ),
      },
      {
        path: "assigned-decorator",
        element: (
          <AdminRoute>
            <AssignedDecorator />
          </AdminRoute>
        ),
      },

      /* ================= SHARED ================= */
      {
        path: "track-service",
        element: <TrackService />,
      },
    ],
  },
]);

export default router;
