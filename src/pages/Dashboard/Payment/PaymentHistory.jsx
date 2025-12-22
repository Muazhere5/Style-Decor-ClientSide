// src/pages/Dashboard/Payment/PaymentHistory.jsx
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosSecure.get("/payments").then(res => setPayments(res.data));
  }, [axiosSecure]);

  return (
    <div className="card p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p._id}>
                <td>{new Date(p.date).toLocaleDateString()}</td>
                <td>৳{p.amount}</td>
                <td className="text-xs">{p.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
