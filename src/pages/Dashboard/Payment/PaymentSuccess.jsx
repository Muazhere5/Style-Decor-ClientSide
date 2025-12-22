// src/pages/Dashboard/Payment/PaymentSuccess.jsx
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <FaCheckCircle className="text-6xl text-success mb-4" />
      <h1 className="text-3xl font-bold">Payment Successful 🎉</h1>
      <p className="text-gray-500 mt-2">
        Your decoration service has been confirmed.
      </p>

      <Link to="/dashboard/user-home" className="btn btn-primary mt-6">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default PaymentSuccess;
