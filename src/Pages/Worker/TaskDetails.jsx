import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Shared/Hooks/AuthProvider";
import { useTheme } from "../../Shared/Hooks/useTheme";
import { motion } from "framer-motion";
import { FaUserTie, FaCalendarAlt, FaCoins, FaUsers } from "react-icons/fa";
import AxiosToken from "../../Shared/Hooks/AxiosToken";

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [task, setTask] = useState(null);
  const [submissionDetails, setSubmissionDetails] = useState("");
  const currentTheme = useTheme();
  const axiosInstance = AxiosToken();

  useEffect(() => {
    axiosInstance.get(`/addtask/${id}`)
      .then(res => setTask(res.data[0]))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (user.email === task.buyer_email) {
    Swal.fire("Error", "You can not submit your own task", "error");
    return;
  }

  const submission = {
    task_id: task._id,
    task_title: task.task_title,
    payable_amount: task.payable_amount,
    worker_email: user.email,
    worker_name: user.displayName,
    submission_details: submissionDetails,
    Buyer_name: task.buyer_name,
    Buyer_email: task.buyer_email,
    current_date: new Date().toISOString().split("T")[0],
    status: "pending",
  };

  try {
    // 1. Submit task
    await axiosInstance.post("/submissions", submission);

    // 2. Send Notification to Buyer
    const notification = {
      message: `${user.displayName} has submitted the task "${task.task_title}" for your review.`,
      toEmail: task.buyer_email,
      actionRoute: "/dashboard/mytasks",
      time: new Date(),
    };

    await axiosInstance.post("/notifications", notification);

    Swal.fire("Success", "Submission sent successfully!", "success");
    setSubmissionDetails("");
  } catch (err) {
    Swal.fire("Error", "Failed to submit task", "error");
    console.error(err);
  }
};


  if (!task) return <span className="loading loading-dots loading-xl text-center py-20 text-indigo-400"></span>

  return (
    <section className={`min-h-screen py-16 px-6 ${currentTheme === 'acid' ? "bg-gradient-to-br from-white via-indigo-50 to-indigo-100" : "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900"}`}>
      <div className="max-w-4xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-xl shadow-lg p-0 transition border border-indigo-200 ${currentTheme === 'acid' ? "bg-white text-gray-800" : "bg-gray-800 text-white border-gray-700"}`}
        >
          <img src={task.task_image_url} alt="task banner" className="w-full rounded-t-xl max-h-80 object-cover" />

          <div className="p-6">
            <h2 className="text-3xl font-bold mb-1">{task.task_title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{task.buyer_email}</p>
            <hr className="border-t border-indigo-300 dark:border-indigo-600 mb-4" />

            <p className="text-md leading-relaxed mb-4">{task.task_detail}</p>
            <hr className="border-t border-indigo-300 dark:border-indigo-600 mb-4" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="flex items-center gap-2"><FaCoins className="text-indigo-500" /> <strong>Payable:</strong> {task.payable_amount} coins</p>
                <p className="flex items-center gap-2"><FaUsers className="text-indigo-500" /> <strong>Workers Needed:</strong> {task.required_workers}</p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center gap-2"><FaCalendarAlt className="text-indigo-500" /> <strong>Posted:</strong> {new Date(task.posted_at).toLocaleDateString()}</p>
                <p className="flex items-center gap-2"><FaCalendarAlt className="text-indigo-500" /> <strong>Deadline:</strong> {task.completion_date}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`rounded-xl shadow-md p-6 space-y-4 border border-indigo-200 ${currentTheme === 'acid' ? "bg-white text-gray-800" : "bg-gray-800 text-white border-gray-700"}`}
        >
          <h3 className="text-2xl font-semibold mb-2">Submit Your Work</h3>
          <textarea
            value={submissionDetails}
            onChange={(e) => setSubmissionDetails(e.target.value)}
            required
            rows="6"
            placeholder="Enter your submission details here..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Submit Task
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default TaskDetails;
