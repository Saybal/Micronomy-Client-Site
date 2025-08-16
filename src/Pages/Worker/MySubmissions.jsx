import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Shared/Hooks/AuthProvider";
import { useTheme } from "../../Shared/Hooks/useTheme";
import AxiosToken from "../../Shared/Hooks/AxiosToken";

const MySubmissions = () => {
  const { user } = useContext(AuthContext);
  const currentTheme = useTheme();
  const [submissions, setSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const axiosInstance = AxiosToken();

  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/submissions/${user.email}?page=${currentPage}&limit=${pageSize}`)
        .then((res) => {
          setSubmissions(res.data.submissions);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => console.error(err));
    }
  }, [user, currentPage]);

  return (
    <section
      className={`min-h-screen py-16 px-6 normal-font ${
        currentTheme === "acid"
          ? "bg-gradient-to-br from-white via-indigo-50 to-indigo-100"
          : "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-3xl font-bold mb-8 text-center ${
            currentTheme === "acid" ? "text-indigo-700" : "text-indigo-300"
          }`}
        >
          My Submissions
        </h2>

        {submissions.length === 0 ? (
          <p className="text-center text-gray-500">No submissions found.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table
                className={`table-auto w-full border text-sm ${
                  currentTheme === "acid" ? "bg-white" : "bg-gray-800 text-white"
                }`}
              >
                <thead>
                  <tr className={`${currentTheme === "acid" ? "bg-indigo-100" : "bg-indigo-400"}`}>
                    <th className="p-3 border">Task Title</th>
                    <th className="p-3 border">Payable</th>
                    <th className="p-3 border">Submitted On</th>
                    <th className="p-3 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub, idx) => (
                    <tr key={idx}>
                      <td className="p-3 border">{sub.task_title}</td>
                      <td className="p-3 border">${sub.payable_amount}</td>
                      <td className="p-3 border">{sub.current_date}</td>
                      <td className="p-3 flex border-b justify-center items-center">
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                            sub.status === "pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : sub.status === "approve"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MySubmissions;
