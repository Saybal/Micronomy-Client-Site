import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Dialog } from "@headlessui/react";
import { AuthContext } from "../../Shared/Hooks/AuthProvider";
import { useTheme } from "../../Shared/Hooks/useTheme";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AxiosToken from "../../Shared/Hooks/AxiosToken";

const MyTasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentTheme = useTheme();
  const axiosInstance = AxiosToken();

  useEffect(() => {
    if (user?.email) {
      axiosInstance.get(`/addtask/email/${user.email}`)
        .then(res => {
          const sorted = res.data.sort((a, b) => new Date(b.completion_date) - new Date(a.completion_date));
          setTasks(sorted);
        })
        .catch(err => console.error(err));
    }
  }, [user]);

  const handleDelete = async (task) => {
    try {
      await axiosInstance.delete(`/addtask/${task._id}`);
      const refillAmount = parseInt(task.required_workers) * parseInt(task.payable_amount);
      await axiosInstance.patch(`/buyers/${user.email}`, {
        coins: refillAmount
      });

      setTasks(prev => prev.filter(t => t._id !== task._id));
      Swal.fire("Deleted", "Task deleted and coins refunded!", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to delete task", "error");
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/addtask/${editTask._id}`, editTask);
      setTasks(prev => prev.map(t => t._id === editTask._id ? editTask : t));
      setIsModalOpen(false);
      Swal.fire("Updated", "Task updated successfully!", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update task", "error");
    }
  };

  return (
    <section className={`min-h-screen py-16 px-6 normal-font ${currentTheme === 'acid' ? "bg-gradient-to-br from-white via-indigo-50 to-indigo-100" : "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900"}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-3xl font-bold mb-8 ${currentTheme === 'acid' ? "text-indigo-700" : "text-indigo-300"}`}>My Posted Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500">You haven't posted any tasks yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className={`table-auto w-full border text-sm ${
                currentTheme === "acid" ? "bg-white" : "bg-gray-800 text-white"
              }`}>
              <thead>
                <tr className={`${currentTheme === "acid" ? "bg-indigo-100" : "bg-indigo-400"}`}>
                  <th className="p-3 border">Title</th>
                  <th className="p-3 border">Completion Date</th>
                  <th className="p-3 border">Payable</th>
                  <th className="p-3 border">Workers Needed</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id} className="border">
                    <td className="p-3 border">{task.task_title}</td>
                    <td className="p-3 border">{task.completion_date}</td>
                    <td className="p-3 border">${task.payable_amount}</td>
                    <td className="p-3 border">{task.required_workers}</td>
                    <td className="p-3 flex gap-4 items-center">
                    <button onClick={() => handleEdit(task)} title="Update">
                      <FaEdit className="text-indigo-500 hover:text-indigo-700 text-lg" />
                    </button>
                    <button onClick={() => handleDelete(task)} title="Delete">
                      <FaTrashAlt className="text-red-500 hover:text-red-700 text-lg" />
                    </button>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Update Modal */}
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className={`mx-auto max-w-lg p-6 rounded-xl shadow-lg ${currentTheme === 'acid' ? "bg-white" : "bg-gray-800 text-white"}`}>
              <Dialog.Title className="text-xl font-semibold mb-4">Update Task</Dialog.Title>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input type="text" value={editTask?.task_title || ""} onChange={e => setEditTask(prev => ({ ...prev, task_title: e.target.value }))} className="w-full p-2 border rounded" required />
                <textarea rows="3" value={editTask?.task_detail || ""} onChange={e => setEditTask(prev => ({ ...prev, task_detail: e.target.value }))} className="w-full p-2 border rounded" required />
                <textarea rows="3" value={editTask?.submission_info || ""} onChange={e => setEditTask(prev => ({ ...prev, submission_info: e.target.value }))} className="w-full p-2 border rounded" required />
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">Update</button>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </section>
  );
};

export default MyTasks;
