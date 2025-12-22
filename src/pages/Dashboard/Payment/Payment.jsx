// src/pages/Dashboard/Payment/Payment.jsx
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaCreditCard, FaLock } from "react-icons/fa";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [price, setPrice] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  // Load booking price
  useEffect(() => {
    axiosSecure.get("/bookings/user").then(res => {
      const booking = res.data.find(b => b._id === id);
      setPrice(booking?.price || 0);
    });
  }, [id, axiosSecure]);

  // Create payment intent
  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price })
        .then(res => setClientSecret(res.data.clientSecret));
    }
  }, [price, axiosSecure]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const card = elements.getElement(CardElement);

    const { paymentIntent, error } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      await axiosSecure.post("/payments", {
        bookingId: id,
        amount: price,
        transactionId: paymentIntent.id,
        email: user.email,
      });

      toast.success("Payment Successful 🎉");
      navigate("/dashboard/payment-success");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-2">
          Complete Your Payment
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Secure card payment powered by Stripe
        </p>

        <div className="mb-4 flex justify-between font-semibold">
          <span>Total Amount</span>
          <span className="text-style-primary">৳{price}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 border rounded-xl bg-white">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#1F2937",
                    "::placeholder": { color: "#9CA3AF" },
                  },
                },
              }}
            />
          </div>

          <button
            className="btn btn-primary w-full"
            disabled={!stripe || loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">
          <FaLock /> Encrypted & Secure Payment
        </div>
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
