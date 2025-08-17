import React, { use, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Shared/Hooks/AuthProvider";
import { useTheme } from "../../Shared/Hooks/useTheme";
import AxiosToken from "../../Shared/Hooks/AxiosToken";
import { generateToken } from "../../Shared/Hooks/firebase.config";

const WorkerStats = () => {
  const { user } = useContext(AuthContext);
  const currentTheme = useTheme();
  const axiosInstance = AxiosToken();

  const [stats, setStats] = useState({
    totalSubmissions: 0,
    pendingSubmissions: 0,
    totalEarnings: 0,
  });

  useEffect(() => {
    document.title = "Worker Stats";
  }, []);

  // !Request Firebase token for notifications
  useEffect(() => {
    generateToken();
  }, []);

  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/submissions/${user.email}`)
        .then((res) => {
          const submissions = res.data;
          const totalSubmissions = submissions.length;
          const pendingSubmissions = submissions.filter((s) => s.status === "pending").length;
          const totalEarnings = submissions
            .filter((s) => s.status === "approve")
            .reduce((acc, curr) => acc + parseFloat(curr.payable_amount), 0);

          setStats({ totalSubmissions, pendingSubmissions, totalEarnings });
        });
    }
  }, [user]);

  const cardStyle =
    currentTheme === "acid"
      ? "bg-white text-gray-800 shadow-lg"
      : "bg-gray-800 text-white shadow-md border border-indigo-500";

  return (
    <section
      className={`min-h-screen py-12 px-4 ${
        currentTheme === "acid"
          ? "bg-gradient-to-br from-white via-indigo-50 to-indigo-100"
          : "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl ${cardStyle}`}>
          <h2 className="text-xl font-semibold mb-2">Total Submissions</h2>
          <p className="text-3xl font-bold">{stats.totalSubmissions}</p>
        </div>

        <div className={`p-6 rounded-2xl ${cardStyle}`}>
          <h2 className="text-xl font-semibold mb-2">Pending Submissions</h2>
          <p className="text-3xl font-bold text-yellow-500">
            {stats.pendingSubmissions}
          </p>
        </div>

        <div className={`p-6 rounded-2xl ${cardStyle}`}>
          <h2 className="text-xl font-semibold mb-2">Total Earnings ($)</h2>
          <p className="text-3xl font-bold text-green-500">
            {stats.totalEarnings.toFixed(2)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkerStats;
