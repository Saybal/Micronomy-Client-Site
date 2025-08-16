import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useTheme } from "../../Shared/Hooks/useTheme";
import { motion } from "framer-motion";

const ManageUsers = () => {
  const currentTheme = useTheme();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const [buyersRes, workersRes, adminsRes] = await Promise.all([
        axios.get("http://localhost:3000/allbuyers"),
        axios.get("http://localhost:3000/allworkers"),
        axios.get("http://localhost:3000/alladmins"),
      ]);

      const combined = [
        ...buyersRes.data.map((user) => ({ ...user, source: "buyer" })),
        ...workersRes.data.map((user) => ({ ...user, source: "worker" })),
        ...adminsRes.data.map((user) => ({ ...user, source: "admin" })),
      ];

      setUsers(combined);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (user) => {
    try {
      await axios.delete(
        `/${
          user.source === "buyer" ? "allbuyers" : "allworkers"
        }/${user.user_email}`
      );
      Swal.fire("Removed", "User deleted successfully", "success");
      fetchUsers();
    } catch (err) {
      Swal.fire("Error", "Failed to remove user", "error");
    }
  };

  const handleRoleChange = async (user, newRole) => {
    if (newRole === user.role) return;
    try {
      // Remove from current
      const sourcePath =
        user.source === "buyer"
          ? "allbuyers"
          : user.source === "worker"
          ? "allworkers"
            : "alladmins";
      
      const encodedEmail = encodeURIComponent(user.email);
      
      await axios.delete(`/${sourcePath}/${encodedEmail}`);

      // Add to target
      const newUser = { ...user, role: newRole };
      delete newUser._id;
      delete newUser.source;

      const newPath =
        newRole === "buyer"
          ? "allbuyers"
          : newRole === "worker"
          ? "allworkers"
            : "alladmins";
      
      await axios.post(`/${newPath}`,newUser);

      Swal.fire({
        title: "Updated!",
        text: `${user.name} is now a ${newRole}.`,
        icon: "success",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });

      fetchUsers();
    } catch (err) {
      Swal.fire("Error", "Failed to update role", "error");
      console.error("Error updating role:", err.message);
    }
  };

  return (
    <section
      className={`normal-font min-h-screen py-16 px-6 ${
        currentTheme === "acid"
          ? "bg-gradient-to-br from-white via-indigo-50 to-indigo-100 text-gray-800"
          : "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Manage Users</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Photo</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Coins</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <motion.tr
                  key={user.email}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b"
                >
                  <td className="p-3">
                    <img
                      src={user.image}
                      alt="user"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user, e.target.value)}
                      className={`border px-2 py-1 rounded ${
                        currentTheme === "sunset" ? "bg-gray-600" : ""
                      } `}
                    >
                      <option value="admin">Admin</option>
                      <option value="buyer">Buyer</option>
                      <option value="worker">Worker</option>
                    </select>
                  </td>
                  <td className="p-3">{user.coins || 0}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(user)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageUsers;
