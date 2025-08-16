import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useTheme } from "../../Shared/Hooks/useTheme";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Shared/Hooks/AuthProvider";
import { set } from "react-hook-form";
import Loading from "../../Shared/Components/Loader/Loading";

const PayForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const coinId = useParams();

  const { user } = useContext(AuthContext);

  // console.log("Coin ID:", coinId.id);

  const [error, setError] = useState("");

  const currentTheme = useTheme();

  const { isPending, data: coinInfo = {} } = useQuery({
    queryKey: ["coin", coinId.id],
    queryFn: async () => {
      const res = await axios.get(
        `https://micronomy.vercel.app/purchase-plans/${coinId.id}`
      );
      return res.data;
    },
  });

  if (isPending) {
    return <Loading/>;
  }

  // Convert to cents for Stripe

  console.log("Coin Info:", coinInfo);

  const price = coinInfo[0].price || 0;
  const coins = coinInfo[0].coins || 0;
  // const priceInCents = price * 100;

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-GB").split("/").join("-");
  const formattedTime = now.toLocaleTimeString("en-US");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("Error creating payment method:", error);
      setError(error.message);
      return;
    } else {
      console.log("Payment method created:", paymentMethod);
      setError("");
    }

    const price = Array.isArray(coinInfo)
      ? coinInfo[0]?.price || 0
      : coinInfo?.price || 0;
    const priceInCents = price * 100;

    console.log("Sending to backend:", priceInCents);

    // Payment intent
    const response = await axios.post(
      "https://micronomy.vercel.app/create-payment-intent",
      {
        amount: priceInCents,
        coinId: coinId.id,
      }
    );
    console.log("Payment Intent Response:", response.data);

    const { clientSecret } = response.data;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });
    if (result.error) {
      console.error("Payment confirmation error:", result.error.message);
      setError(result.error.message);
    } else {
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: `You have successfully purchased ${coinInfo[0].coins} coins!`,
        });

        // Posting Payment Data
        await axios.post("https://micronomy.vercel.app/payments", {
          username: user.displayName,
          useremail: user.email,
          method: paymentMethod.card.brand,
          coin: coins,
          price: price,
          date: formattedDate,
          time: formattedTime,
        });

        // Upadtaing coin in user's data
        await axios.patch(
          `https://micronomy.vercel.app/buyer/${user.email}`,
          {
            incrementBy: coins,
          }
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: "There was an issue with your payment. Please try again.",
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border-1 border-amber-200 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                color: currentTheme === "sunset" ? "#f1f5f9" : "#1f2937", // text-base-content for dark background
                fontSize: "16px",
                fontFamily: '"Inter", "Segoe UI", sans-serif',
                fontSmoothing: "antialiased",
                "::placeholder": {
                  color: currentTheme === "sunset" ? "#DBD7D2" : "#2A3439", // Tailwind slate-400
                },
                padding: "12px 16px",
                // backgroundColor: "#1f2937", // dark gray background
                borderRadius: "8px",
                border: "1px solid #374151", // slate-700
                transition: "all 0.3s ease",
              },
              complete: {
                color: "#4CBB17", // green-400 when done
              },
              invalid: {
                color: "#f87171", // red-400 on error
                iconColor: "#f87171",
              },
            },
          }}
        />

        <button className="btn mt-3 w-full bg-yellow-400 text-black normal-font">
          Pay ${price}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default PayForm;
