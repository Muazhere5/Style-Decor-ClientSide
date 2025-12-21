import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import "./index.css";
import AuthProvider from "./contexts/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />

      {/* Global Toast (Beautiful & Centered) */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "12px",
            fontWeight: "600",
          },
        }}
      />
    </AuthProvider>
  </React.StrictMode>
);
