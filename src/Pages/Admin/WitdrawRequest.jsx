import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../Shared/Hooks/useTheme";

const WithdrawRequest = () => {
  const currentTheme = useTheme();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("https://micronomy.vercel.app/allwithdraws");
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch requests", err);
    }
  };

  const handlePaymentSuccess = async (req) => {
    setLoading(true);
    try {
      
      await axios.patch(`https://micronomy.vercel.app/allwithdraws/${req._id}`, {
        status: "approved",
      });

      setRequests((prev) => prev.filter((r) => r._id !== req._id));
    } catch (err) {
      console.error("Failed to process payment", err);
    } finally {
      setLoading(false);
    }
  };

  const tableClasses =
    currentTheme === "acid"
      ? "min-w-full divide-y divide-indigo-200"
      : "min-w-full divide-y divide-indigo-700";

  const thClasses =
    currentTheme === "acid"
      ? "px-6 py-3 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider"
      : "px-6 py-3 bg-indigo-900 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider";

  const tdClasses =
    currentTheme === "acid"
      ? "px-6 py-4 whitespace-nowrap text-indigo-800"
      : "px-6 py-4 whitespace-nowrap text-indigo-300";

  const btnClasses =
    currentTheme === "acid"
      ? "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
      : "bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded";

  return (
    <div className={`p-6 ${currentTheme === "acid" ? "bg-indigo-50" : "bg-indigo-900"}`}>
      <h2
        className={`text-2xl font-bold mb-4 ${
          currentTheme === "acid" ? "text-indigo-800" : "text-indigo-200"
        }`}
      >
        Withdrawal Requests (Pending)
      </h2>
      <table className={tableClasses}>
        <thead>
          <tr>
            <th className={thClasses}>User Email</th>
            <th className={thClasses}>Amount</th>
            <th className={thClasses}>Status</th>
            <th className={thClasses}>Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-indigo-500">
                No pending withdrawal requests.
              </td>
            </tr>
          )}
          {requests.map((req) => (
            <tr key={req._id}>
              <td className={tdClasses}>{req.worker_email}</td>
              <td className={tdClasses}>{req.withdrawal_amount}</td>
              <td className={tdClasses}>{req.status}</td>
              <td className={tdClasses}>
                <button
                  disabled={loading}
                  className={btnClasses}
                  onClick={() => handlePaymentSuccess(req)}
                >
                  Payment Success
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawRequest;
