import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const PaymentCancelled = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <FaTimesCircle className="text-7xl text-error mb-4" />
      <h1 className="text-4xl font-bold">Payment Cancelled</h1>
      <p className="text-gray-500 mt-2 max-w-md">
        No worries! You can retry payment anytime before a decorator is assigned.
      </p>

      <Link to="/dashboard/user-home" className="btn btn-warning mt-6">
        Retry Payment
      </Link>
    </div>
  );
};

export default PaymentCancelled;
