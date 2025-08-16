import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Shared/Hooks/AuthProvider";
import { useTheme } from "../../Shared/Hooks/useTheme";
import axios from "axios";
import Swal from "sweetalert2";
import AxiosToken from "../../Shared/Hooks/AxiosToken";

const Withdrawal = () => {
  const { user } = useContext(AuthContext);
  const currentTheme = useTheme();
  const [coins, setCoins] = useState(0);
  const [withdrawCoins, setWithdrawCoins] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("Bkash");
  const [accountNumber, setAccountNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const axiosInstance = AxiosToken();

  useEffect(() => {
    axiosInstance
      .get(`/allworkers/${user.email}`)
      .then((res) => {
        setCoins(res.data[0].coins || 0);
      })
      .catch((err) => console.error(err));
  }, [user.email, submitted]);

  const withdrawalAmount = (withdrawCoins / 20).toFixed(2);

  const handleWithdraw = async (e) => {
    e.preventDefault();

    if (withdrawCoins > coins || withdrawCoins < 200) {
      Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "You can only withdraw coins in multiples of 200 and not more than your available coins.",
      });
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB").split("/").join("-");

    const payload = {
      worker_email: user.email,
      worker_name: user.displayName,
      withdrawal_coin: withdrawCoins,
      withdrawal_amount: parseFloat(withdrawalAmount),
      payment_system: paymentSystem,
      account_number: accountNumber,
      withdraw_date: formattedDate,
      status: "pending",
    };

    try {
      await axiosInstance.post("/withdrawals", payload);
      await axiosInstance.patch(`/worker/${user.email}`, {
        dec: withdrawCoins,
      });

      await axiosInstance.post("/notifications", {
        message: `${user.displayName} has requested a withdrawal of $${withdrawalAmount} via ${paymentSystem}.`,
        toRole: "admin",
        actionRoute: "/dashboard/admin-home",
        time: new Date(),
      });

      Swal.fire(
        "Success",
        "Your withdrawal request has been submitted!",
        "success"
      );
      setWithdrawCoins(0);
      setAccountNumber("");
      setSubmitted(true);
    } catch (err) {
      Swal.fire("Error", "Failed to process withdrawal.", "error");
    }
  };

  return (
    <section
      className={`normal-font min-h-screen py-16 px-6 ${
        currentTheme === "acid"
          ? "bg-gradient-to-br from-white via-indigo-50 to-indigo-100 text-gray-800"
          : "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white"
      }`}
    >
      <div
        className={`max-w-3xl mx-auto p-6 rounded-lg shadow-lg ${
          currentTheme === "acid" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Withdraw Earnings
        </h2>

        <div className="mb-6 text-center">
          <p className="text-xl font-semibold">
            Current Coins:{" "}
            <span
              className={`${
                currentTheme === "acid" ? "text-indigo-600" : "text-indigo-300"
              }`}
            >
              {coins}
            </span>
          </p>
          <p className="text-lg">
            Withdrawable Amount: ${Math.floor(coins / 20)}
          </p>
        </div>

        {coins < 200 ? (
          <p className="text-red-500 text-center font-semibold">
            Insufficient coin (Minimum 200 coins required)
          </p>
        ) : (
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div>
              <label className="block font-medium">Coins to Withdraw</label>
              <input
                type="number"
                min="200"
                max={coins}
                required
                value={withdrawCoins}
                onChange={(e) => setWithdrawCoins(Number(e.target.value))}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block font-medium">Withdraw Amount ($)</label>
              <input
                type="number"
                value={withdrawalAmount}
                readOnly
                className="input input-bordered w-full  cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-medium">Select Payment System</label>
              <select
                className="select select-bordered w-full"
                value={paymentSystem}
                onChange={(e) => setPaymentSystem(e.target.value)}
              >
                <option value="Bkash">Bkash</option>
                <option value="Rocket">Rocket</option>
                <option value="Nagad">Nagad</option>
                <option value="UPay">UPay</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Account Number</label>
              <input
                type="text"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
            >
              Withdraw
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Withdrawal;
