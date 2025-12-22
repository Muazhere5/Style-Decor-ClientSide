// src/pages/Dashboard/Payment/PaymentCancelled.jsx
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const PaymentCancelled = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <FaTimesCircle className="text-6xl text-error mb-4" />
      <h1 className="text-3xl font-bold">Payment Cancelled</h1>
      <p className="text-gray-500 mt-2">
        Your payment was not completed.
      </p>

      <Link to="/dashboard/my-services" className="btn btn-secondary mt-6">
        Try Again
      </Link>
    </div>
  );
};

export default PaymentCancelled;
