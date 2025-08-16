import React from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaTasks, FaCoins, FaUsers, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";
import { useTheme } from "../../Hooks/useTheme";

const ExtraSections = () => {
  const currentTheme = useTheme();

  const stats = [
    { icon: <FaUsers />, label: "Total Users", value: 1024 },
    { icon: <FaCheckCircle />, label: "Tasks Completed", value: 890 },
    { icon: <FaCoins />, label: "Coins Earned", value: 15240 },
  ];

  const steps = [
    { icon: <FaUserPlus className="text-3xl text-indigo-600" />, title: "Sign Up" },
    { icon: <FaTasks className="text-3xl text-indigo-600" />, title: "Complete or Post Tasks" },
    { icon: <FaCoins className="text-3xl text-indigo-600" />, title: "Earn or Get Work Done" },
  ];

  return (
    <div className="space-y-20 px-4 sm:px-6 lg:px-8">
      {/* How It Works Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`p-6 ${
                currentTheme === "acid"
                  ? "bg-white"
                  : "bg-gray-800 border border-indigo-200"
              } flex flex-col justify-center items-center rounded-lg shadow-lg hover:shadow-xl transition`}
            >
              <div className="mb-4 border-2 border-indigo-400 rounded-full p-4">{step.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold">{step.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10">Platform Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className={`${
                currentTheme === "acid"
                  ? "bg-white"
                  : "bg-gray-800 border border-indigo-200"
              } flex flex-col justify-center items-center p-6 rounded-xl shadow-md`}
            >
              <div className="text-4xl mb-4 p-4 border-2 border-indigo-400 rounded-full text-indigo-600">
                {stat.icon}
              </div>
              <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
              <p className="text-gray-500 mt-2 text-sm sm:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="max-w-6xl mx-auto rounded-3xl mb-4 px-4 py-16 sm:py-20 text-center bg-gradient-to-br from-indigo-400 to-indigo-800 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-8"
        >
          Ready to Start Earning?
        </motion.h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <Link
            to="/register"
            className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
          >
            Sign Up as Worker
          </Link>
          <a href="/dashboard/add-task"
            className="bg-yellow-300 text-gray-900 font-semibold px-6 py-3 rounded shadow hover:bg-yellow-400 transition"
          >
            Post a Task Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default ExtraSections;
