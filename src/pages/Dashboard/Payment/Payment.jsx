import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaLock } from "react-icons/fa";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

/* 🔹 SAME PRICE LOGIC AS DASHBOARD */
const calculatePrice = booking => {
  let base = 10000;

  if (booking.region === "Dhaka") base += 3000;
  if (booking.region === "Chattogram") base += 2000;

  if (booking.timeSlot === "Evening") base += 1500;
  if (booking.timeSlot === "Night") base += 2500;

  const eventDate = new Date(booking.bookingDate);
  const day = eventDate.getDay();
  if (day === 5 || day === 6) base += 2000;

  return base;
};

const CheckoutForm = () => {
  const { id } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [payAmount, setPayAmount] = useState("");
  const [loading, setLoading] = useState(false);

  /* 🔹 FETCH BOOKING + CALCULATE PRICE */
  useEffect(() => {
    axiosSecure.get("/bookings/user").then(res => {
      const found = res.data.find(b => b._id === id);
      if (found) {
        found.price = calculatePrice(found);
        setBooking(found);
      }
    });
  }, [id, axiosSecure]);

  const handleSubmit = async e => {
    e.preventDefault();

    const enteredAmount = Number(payAmount);

    /* ❌ VALIDATION */
    if (enteredAmount < booking.price) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: `Minimum payable amount is ৳${booking.price}`,
      });
      return;
    }

    setLoading(true);

    // 🔥 DEMO PAYMENT
    const transactionId = "TXN-" + Math.random().toString(36).slice(2, 10);
    const trackingId = "TRK-" + Math.random().toString(36).slice(2, 10);

    await axiosSecure.post("/payments", {
      bookingId: booking._id,
      amount: enteredAmount,
      transactionId,
      trackingId,
      email: user.email,
      serviceType: booking.serviceType,
      region: booking.region,
    });

    setLoading(false);

    /* ✅ SWEET ALERT SUCCESS */
    Swal.fire({
      icon: "success",
      title: "Payment Successful 🎉",
      text: "Your payment has been completed successfully.",
      showCancelButton: true,
      confirmButtonText: "Go to Dashboard",
      cancelButtonText: "Payment Cancellation",
    }).then(result => {
      if (result.isConfirmed) {
        navigate("/dashboard/user-home");
      } else {
        navigate("/dashboard/payment-cancelled");
      }
    });
  };

  if (!booking) return null;

  return (
    <div className="min-h-[70vh] flex justify-center items-center">
      <div className="card w-full max-w-md p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-2">
          Secure Payment
        </h2>

        <div className="flex justify-between font-semibold mb-4">
          <span>Required Amount</span>
          <span>৳{booking.price}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 💰 AMOUNT INPUT */}
          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Enter payment amount"
            value={payAmount}
            onChange={e => setPayAmount(e.target.value)}
            required
          />

          <div className="p-4 border rounded-lg">
            <CardElement />
          </div>

          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        <p className="text-xs text-center mt-4 text-gray-400 flex justify-center gap-2">
          <FaLock /> Demo Stripe Secure Payment
        </p>
      </div>
    </div>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Payment;
