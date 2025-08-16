import React, { use, useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Dialog } from "@headlessui/react";
import { AuthContext } from "../../Shared/Hooks/AuthProvider";
import { motion } from "framer-motion";
import { useTheme } from "../../Shared/Hooks/useTheme";

const TaskToReview = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const currentTheme = useTheme();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://micronomy.vercel.app/submissions?buyer_email=${user.email}&status=pending`
        )
        .then((res) => setSubmissions(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleApprove = async (submission) => {
    try {
      await axios.patch(`https://micronomy.vercel.app/submissions/${submission._id}`, {
        status: "approve",
      });

      await axios.patch(
        `https://micronomy.vercel.app/allworkers/${submission.worker_email}`,
        {
          add: parseInt(submission.payable_amount),
        }
      );

      await axios.patch(`https://micronomy.vercel.app/addtask/${submission.task_id}`, {
        dec: parseInt(submission.payable_amount),
      });

      await axios.patch(
        `https://micronomy.vercel.app/buyer/approve/${submission.Buyer_email}`,
        {
          dec: parseInt(submission.payable_amount),
        }
      );

      await axios.post("https://micronomy.vercel.app/notifications", {
        message: `You have earned ${submission.payable_amount} coins from ${submission.Buyer_name} for completing "${submission.task_title}".`,
        toEmail: submission.worker_email,
        actionRoute: "/dashboard/worker-home",
        time: new Date(),
      });

      // !Updating the pending tasks after approval
      setSubmissions((prev) =>
        prev.filter((item) => item._id !== submission._id)
      );

      Swal.fire("Success", "Submission approved and coins added!", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to approve submission", "error");
    }
  };

  const handleReject = async (submission) => {
    try {
      await axios.patch(`https://micronomy.vercel.app/submissions/${submission._id}`, {
        status: "rejected",
      });

      await axios.post("https://micronomy.vercel.app/notifications", {
      message: `Your submission for "${submission.task_title}" was rejected by ${submission.Buyer_name}.`,
      toEmail: submission.worker_email,
      actionRoute: "/dashboard/worker-home",
      time: new Date(),
      });
      
      setSubmissions((prev) =>
        prev.filter((item) => item._id !== submission._id)
      );
      Swal.fire(
        "Rejected",
        "Submission rejected and worker slot increased",
        "info"
      );
    } catch (err) {
      Swal.fire("Error", "Failed to reject submission", "error");
    }
  };

  return (
    <section
      className={`min-h-screen bg-gradient-to-br ${
        currentTheme === "acid"
          ? "from-white via-indigo-50 to-indigo-100"
          : "from-slate-900 via-slate-800 to-slate-900"
      } py-16 px-6`}
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2
          className={`text-4xl font-bold ${
            currentTheme === "acid" ? "text-indigo-600" : "text-indigo-300"
          } mb-4`}
        >
          Pending Task Submissions
        </h2>
        <p
          className={`text-lg ${
            currentTheme === "acid" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          Review and manage worker submissions efficiently
        </p>
      </div>

      {submissions.length === 0 ? (
        <p
          className={`text-center ${
            currentTheme === "acid" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          No pending submissions.
        </p>
      ) : (
        <div
          className={`overflow-x-auto max-w-7xl mx-auto shadow-xl rounded-xl border ${
            currentTheme === "acid"
              ? "bg-white border-indigo-200"
              : "bg-gray-800 border-indigo-600"
          }`}
        >
          <table className="min-w-full table-auto text-left">
            <thead
              className={`${
                currentTheme === "acid" ? "bg-indigo-100" : "bg-gray-700"
              }`}
            >
              <tr>
                {["Worker Name", "Task Title", "Payable Amount", "Actions"].map(
                  (title) => (
                    <th
                      key={title}
                      className={`p-4 font-semibold ${
                        currentTheme === "acid"
                          ? "text-indigo-700"
                          : "text-indigo-200"
                      }`}
                    >
                      {title}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, idx) => (
                <motion.tr
                  key={submission._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`border-b hover:bg-gray-50 ${
                    currentTheme === "acid"
                      ? "border-gray-200"
                      : "border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  <td
                    className={`p-4 ${
                      currentTheme === "acid"
                        ? "text-gray-800"
                        : "text-gray-200"
                    }`}
                  >
                    {submission.worker_name}
                  </td>
                  <td
                    className={`p-4 ${
                      currentTheme === "acid"
                        ? "text-gray-800"
                        : "text-gray-200"
                    }`}
                  >
                    {submission.task_title}
                  </td>
                  <td
                    className={`p-4 ${
                      currentTheme === "acid"
                        ? "text-gray-800"
                        : "text-gray-200"
                    }`}
                  >
                    {submission.payable_amount} coins
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setSelectedSubmission(submission);
                          setIsModalOpen(true);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleApprove(submission)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(submission)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel
            className={`mx-auto max-w-lg rounded-lg p-6 shadow-lg ${
              currentTheme === "acid" ? "bg-white" : "bg-gray-900"
            }`}
          >
            <Dialog.Title
              className={`text-xl font-semibold mb-4 ${
                currentTheme === "acid" ? "text-indigo-600" : "text-indigo-300"
              }`}
            >
              Submission Details
            </Dialog.Title>
            <p
              className={`mb-6 whitespace-pre-wrap ${
                currentTheme === "acid" ? "text-gray-700" : "text-gray-300"
              }`}
            >
              {selectedSubmission?.submission_details}
            </p>
            <div className="text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className={`px-4 py-2 rounded ${
                  currentTheme === "acid"
                    ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-200"
                }`}
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  );
};

export default TaskToReview;
