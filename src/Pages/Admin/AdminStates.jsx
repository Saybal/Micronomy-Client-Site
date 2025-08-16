import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../Shared/Hooks/useTheme";
import { AuthContext } from "../../Shared/Hooks/AuthProvider";

const AdminStates = () => {
  const currentTheme = useTheme();
  const { user } = useContext(AuthContext);
  const [totalWorkers, setTotalWorkers] = useState(0);
  const [totalBuyers, setTotalBuyers] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/allworkers").then((res) => {
      setTotalWorkers(res.data.length);
      const coins = res.data.reduce((sum, user) => sum + (user.coins || 0), 0);
      setTotalCoins((prev) => prev + coins);
    });

    axios.get("http://localhost:3000/allbuyers").then((res) => {
      setTotalBuyers(res.data.length);
      const coins = res.data.reduce((sum, user) => sum + (user.coins || 0), 0);
      setTotalCoins((prev) => prev + coins);
    });

    axios.get("http://localhost:3000/payments").then((res) => {
      const total = res.data.reduce((sum, payment) => sum + (payment.price || 0), 0);
      setTotalPayments(total);
    });
  }, []);

  return (
    <div
      className={`p-6 min-h-screen ${
        currentTheme === "acid"
          ? "bg-gradient-to-br from-white via-indigo-50 to-indigo-100 text-gray-800"
          : "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`rounded-xl shadow p-6 border-l-4 border-indigo-500 ${currentTheme === 'acid' ? "bg-white" : "bg-gray-800"}`}>
          <h3 className="text-xl font-semibold">Total Workers</h3>
          <p className="text-3xl mt-2 font-bold text-indigo-600">{totalWorkers}</p>
        </div>

        <div className={`rounded-xl shadow p-6 border-l-4 border-indigo-500 ${currentTheme === 'acid' ? "bg-white" : "bg-gray-800"}`}>
          <h3 className="text-xl font-semibold">Total Buyers</h3>
          <p className="text-3xl mt-2 font-bold text-indigo-600">{totalBuyers}</p>
        </div>

        <div className={`rounded-xl shadow p-6 border-l-4 border-indigo-500 ${currentTheme === 'acid' ? "bg-white" : "bg-gray-800"}`}>
          <h3 className="text-xl font-semibold">Total Available Coins</h3>
          <p className="text-3xl mt-2 font-bold text-indigo-600">{totalCoins}</p>
        </div>

        <div className={`rounded-xl shadow p-6 border-l-4 border-indigo-500 ${currentTheme === 'acid' ? "bg-white" : "bg-gray-800"}`}>
          <h3 className="text-xl font-semibold">Total Payments ($)</h3>
          <p className="text-3xl mt-2 font-bold text-green-600">${totalPayments.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStates;
