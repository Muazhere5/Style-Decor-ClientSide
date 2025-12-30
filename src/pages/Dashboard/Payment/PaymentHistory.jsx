import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosSecure.get("/payments").then(res => setPayments(res.data));
  }, [axiosSecure]);

  return (
    <div className="card shadow p-6">
      <h2 className="text-2xl font-bold mb-4">💳 Payment History</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Date</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Tracking ID</th>
              <th>Transaction</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p._id}>
                <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                <td>{p.serviceType}</td>
                <td>৳{p.amount}</td>
                <td className="text-xs">{p.trackingId}</td>
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
