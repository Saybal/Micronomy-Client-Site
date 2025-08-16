import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaUserTie, FaCoins, FaCalendarAlt, FaUsers } from "react-icons/fa";
import axios from "axios";
import { useTheme } from "../../Shared/Hooks/useTheme";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const currentTheme = useTheme();

  useEffect(() => {
    axios
      .get("http://localhost:3000/addtask")
      .then((res) => {
        const availableTasks = res.data.filter(
          (task) => parseInt(task.required_workers) > 0
        );
        setTasks(availableTasks);
      })
      .catch((err) => console.error(err));
  }, []);

  const primary =
    currentTheme === "acid" ? "text-indigo-600" : "text-indigo-400";
  const bgCard = currentTheme === "acid" ? "bg-white" : "bg-slate-800";
  const text = currentTheme === "acid" ? "text-gray-700" : "text-gray-300";
  const border =
    currentTheme === "acid" ? "border-slate-300" : "border-indigo-500";
  const hoverBorder =
    currentTheme === "acid"
      ? "hover:border-indigo-600"
      : "hover:border-indigo-300";
  const iconColor =
    currentTheme === "acid" ? "text-indigo-500" : "text-indigo-400";
  const buttonBg =
    currentTheme === "acid"
      ? "bg-indigo-600 hover:bg-indigo-700"
      : "bg-indigo-500 hover:bg-indigo-600";

  return (
    <section
      className={`min-h-screen py-16 px-6 transition-colors duration-500 ${
        currentTheme === "acid"
          ? "bg-gradient-to-br from-white via-indigo-50 to-indigo-100"
          : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className={`text-4xl font-bold mb-4 ${primary}`}>
          Available Tasks
        </h2>
        <p className={`text-lg ${text}`}>
          Join and start earning by completing these tasks
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className={`${bgCard} ${border} ${hoverBorder} shadow-xl rounded-2xl p-6 transition duration-300 flex flex-col`}
          >
            <div className="flex-grow">
              <h3 className={`text-xl font-bold ${currentTheme === 'acid' ? "text-gray-800" : "text-white"} mb-3`}>
                {task.task_title}
              </h3>

              <div className={`flex items-center text-sm mb-2 ${text}`}>
                <FaUserTie className={`mr-2 ${iconColor}`} /> Buyer:{" "}
                {task.buyer_email}
              </div>

              <div className={`flex items-center text-sm mb-2 ${text}`}>
                <FaCalendarAlt className={`mr-2 ${iconColor}`} /> Completion
                Date: {task.completion_date}
              </div>

              <div className={`flex items-center text-sm mb-2 ${text}`}>
                <FaCoins className={`mr-2 ${iconColor}`} /> Payable:{" "}
                {task.payable_amount} coins
              </div>

              <div className={`flex items-center text-sm mb-6 ${text}`}>
                <FaUsers className={`mr-2 ${iconColor}`} /> Workers Needed:{" "}
                {task.required_workers}
              </div>
            </div>

            <a href={`addtask/${task._id}`}
              className={`btn w-full ${buttonBg} text-white font-semibold py-2 rounded-lg transition mt-auto`}
            >
              View Details
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TaskList;
