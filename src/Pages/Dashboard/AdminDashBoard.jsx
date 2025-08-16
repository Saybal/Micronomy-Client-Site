import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigation } from "react-router";
import { AuthContext } from "../../Shared/Hooks/AuthProvider";
import { useTheme } from "../../Shared/Hooks/useTheme";
import { FaBell, FaBars } from "react-icons/fa";
import Loading from "../../Shared/Components/Loader/Loading";
import Footer from "../../Shared/Components/Footer/Footer";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

const AdminDashboard = ({ coin }) => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [theme, settheme] = useState(localStorage.getItem("Theme") || "acid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentTheme = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handleToggle = (e) => {
    settheme(e.target.checked ? "sunset" : "acid");
  };

  useEffect(() => {
    localStorage.setItem("Theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (showPopup) {
      axios.get("https://micronomy.vercel.app/notifications?toRole=admin")
        .then((res) => {
          const sorted = res.data.sort((a, b) => new Date(b.time) - new Date(a.time));
          setNotifications(sorted);
        })
        .catch(console.error);
    }
  }, [showPopup]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${currentTheme === "acid" ? "bg-gradient-to-br from-white via-indigo-50 to-indigo-100 text-gray-800" : "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white"}`}>
      {/* Header */}
      <header className="flex justify-between items-center p-4 shadow-md border-b relative">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-xl" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>
          <NavLink to='/'><img className="w-24 md:w-28 lg:w-32" src={`${currentTheme === 'acid' ? "https://i.ibb.co/Wvk54fZn/4398c26a-a040-4029-ad54-988c0c52b7fc-removalai-preview.png" : "https://i.ibb.co/TMrPS0h2/f9ba89de-5b50-4e8d-b2bc-0d1068d6b188-removalai-preview.png"}`} alt="logo" /></NavLink>
        </div>

        <div className="flex items-center gap-4 relative">
          <div className="hidden sm:block text-sm text-right">
            <p className="font-medium">Coins: {coin}</p>
            <p className="text-xs">{user?.displayName} | Admin</p>
          </div>
          <img src={user?.photoURL || "https://i.ibb.co/Jk7KDyk/avatar.png"} alt="User" className="w-10 h-10 rounded-full border-2 border-indigo-400" />
          <button className="relative text-xl" title="Notifications" onClick={() => setShowPopup(!showPopup)}>
            <FaBell />
            {notifications.length > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>}
          </button>
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleToggle} />
            <svg className="swap-off h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21.64,13a1,1,0,0,0-1.05-.14...Z" />
            </svg>
            <svg className="swap-on h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M5.64,17l-.71.71a1,1,0...Z" />
            </svg>
          </label>

          <AnimatePresence>
            {showPopup && (
              <motion.div
                ref={popupRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`absolute right-0 top-14 z-50 w-96 max-h-96 overflow-y-auto rounded-lg shadow-xl border ${currentTheme === "acid" ? "bg-white border-indigo-200" : "bg-gray-800 border-indigo-600"}`}
              >
                <div className="p-4 font-bold border-b border-indigo-300">Notifications</div>
                <ul className="divide-y divide-indigo-100 dark:divide-indigo-600">
                  {notifications.length === 0 ? (
                    <li className="p-4 text-sm text-center text-gray-500">No notifications</li>
                  ) : (
                    notifications.map((note, i) => (
                      <li key={i} className="p-4 hover:bg-indigo-50 dark:hover:bg-gray-700 cursor-pointer">
                        <p className="text-sm mb-1">{note.message}</p>
                        <p className="text-xs text-gray-400">{new Date(note.time).toLocaleString()}</p>
                      </li>
                    ))
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className={`fixed border-r z-10 md:relative md:translate-x-0 transform top-18 left-0 w-64 h-[calc(100%-4rem)] shadow-lg transition-transform duration-300 ease-in-out ${currentTheme === "acid" ? "bg-white/90" : "bg-gray-700/90"} md:bg-none lg:bg-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:top-0 md:h-auto md:block md:static`}>
          <nav className="p-4 space-y-2">
            <a href="/dashboard/adminstates" className={`block font-medium hover:text-indigo-600`}>Stats</a>
            <a href="/dashboard/withdrawrequest" className={`block font-medium hover:text-indigo-600`}>Withdraw</a>
            <a href="/dashboard/manage-tasks" className="block font-medium hover:text-indigo-600">Manage Tasks</a>
            <a href={`/dashboard/manage-users`} className="block font-medium hover:text-indigo-600">Manage Users</a>
            <a href="/dashboard/profile" className="block font-medium hover:text-indigo-600">Profile</a>
          </nav>
        </aside>

        <main className="flex-1 overflow-auto relative">
          {isLoading && (
            <div className="absolute inset-0 z-50 bg-opacity-30 bg-black flex justify-center items-center">
              <Loading />
            </div>
          )}
          <Outlet />
        </main>
      </div>

      <footer className="text-center text-sm border-t">
        <Footer />
      </footer>
    </div>
  );
};

export default AdminDashboard;
