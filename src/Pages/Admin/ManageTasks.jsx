import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useTheme } from "../../Shared/Hooks/useTheme";
import { AuthContext } from "../../Shared/Hooks/AuthProvider";
import { FaTrashAlt } from "react-icons/fa";

const ManageTasks = () => {
  const currentTheme = useTheme();
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/addtask")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/addtask/${taskId}`);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      Swal.fire("Deleted!", "Task has been removed from the database.", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to delete task", "error");
    }
  };

  return (
    <section className={`normal-font min-h-screen py-16 px-6 ${currentTheme === 'acid' ? "bg-gradient-to-br from-white via-indigo-50 to-indigo-100 text-gray-800" : "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white"}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Manage All Tasks</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border text-left">
            <thead>
              <tr className={`border-b ${currentTheme === "acid" ? "bg-indigo-100" : "bg-indigo-400"}`}>
                <th className="p-3">Title</th>
                <th className="p-3">Detail</th>
                <th className="p-3">Buyer Email</th>
                <th className="p-3">Payable</th>
                <th className="p-3">Required Workers</th>
                <th className="p-3">Completion Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="border-b">
                  <td className="p-3">{task.task_title}</td>
                  <td className="p-3 text-justify">{task.task_detail}</td>
                  <td className="p-3">{task.buyer_email}</td>
                  <td className="p-3">{task.payable_amount}</td>
                  <td className="p-3">{task.required_workers}</td>
                  <td className="p-3">{task.completion_date}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(task._id)}
                      title="Delete"
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageTasks;
