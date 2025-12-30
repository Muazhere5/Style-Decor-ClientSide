import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <FaCheckCircle className="text-7xl text-success mb-4 animate-bounce" />
      <h1 className="text-4xl font-bold">Payment Completed 🎉</h1>
      <p className="text-gray-500 mt-2 max-w-md">
        Your payment has been recorded successfully. Our decorators will be
        assigned soon.
      </p>

      <Link to="/dashboard/user-home" className="btn btn-success mt-6">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default PaymentSuccess;
