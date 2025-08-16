import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../Shared/Hooks/useTheme";
import { AuthContext } from "../../Shared/Hooks/AuthProvider";
import { FaTasks, FaUsersCog, FaDollarSign } from "react-icons/fa";

const States = () => {
  const currentTheme = useTheme();
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalTasks: 0, pendingWorkers: 0, totalPayment: 0 });

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://micronomy.vercel.app/addtask/${user.email}`)
        .then(res => {
          const tasks = res.data || [];
          const totalTasks = tasks.length;
          const pendingWorkers = tasks.reduce((sum, task) => sum + parseInt(task.required_workers || 0), 0);
          const totalPayment = tasks.reduce((sum, task) => sum + parseInt(task.total_payable || 0), 0);
          setStats({ totalTasks, pendingWorkers, totalPayment });
        })
        .catch(err => console.error(err));
    }
  }, [user]);

  const cardStyle = currentTheme === 'acid'
    ? "bg-white border border-indigo-200 text-gray-800"
    : "bg-gray-800 border border-indigo-600 text-white";

  const gradientBg = currentTheme === 'acid'
    ? "bg-gradient-to-br from-white via-indigo-50 to-indigo-100"
    : "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900";

  return (
    <section className={`min-h-screen ${gradientBg} p-6`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={`rounded-xl shadow-md p-6 flex items-center gap-4 ${cardStyle}`}>
          <FaTasks className="text-3xl text-indigo-500" />
          <div>
            <p className="text-sm">Total Tasks</p>
            <h2 className="text-xl font-bold">{stats.totalTasks}</h2>
          </div>
        </div>
        <div className={`rounded-xl shadow-md p-6 flex items-center gap-4 ${cardStyle}`}>
          <FaUsersCog className="text-3xl text-indigo-500" />
          <div>
            <p className="text-sm">Pending Workers</p>
            <h2 className="text-xl font-bold">{stats.pendingWorkers}</h2>
          </div>
        </div>
        <div className={`rounded-xl shadow-md p-6 flex items-center gap-4 ${cardStyle}`}>
          <FaDollarSign className="text-3xl text-indigo-500" />
          <div>
            <p className="text-sm">Total Payment Paid</p>
            <h2 className="text-xl font-bold">${stats.totalPayment}</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default States;