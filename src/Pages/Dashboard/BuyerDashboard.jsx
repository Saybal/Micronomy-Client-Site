import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigation } from "react-router";
import { AuthContext } from "../../Shared/Hooks/AuthProvider";
import { useTheme } from "../../Shared/Hooks/useTheme";
import { FaBell, FaBars } from "react-icons/fa";
import Loading from "../../Shared/Components/Loader/Loading";
import Footer from "../../Shared/Components/Footer/Footer";

const BuyerDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [theme, settheme] = useState(
    localStorage.getItem("Theme") ? localStorage.getItem("Theme") : "acid"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentTheme = useTheme();

  const handleToggle = (e) => {
    settheme(e.target.checked ? "sunset" : "acid");
  };

  useEffect(() => {
    localStorage.setItem("Theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        currentTheme === "acid"
          ? "bg-gradient-to-br from-white via-indigo-50 to-indigo-100 text-gray-800"
          : "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white"
      }`}
    >
      {/* Header */}
      <header className="flex justify-between items-center p-4 shadow-md border-b">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>
          <NavLink to='/'><img className="w-24 md:w-28 lg:w-32" src={`${currentTheme === 'acid' ? "https://i.ibb.co/Wvk54fZn/4398c26a-a040-4029-ad54-988c0c52b7fc-removalai-preview.png" : "https://i.ibb.co/TMrPS0h2/f9ba89de-5b50-4e8d-b2bc-0d1068d6b188-removalai-preview.png"}`} alt="" /></NavLink>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-sm text-right">
            <p className="font-medium">Coins: 280</p>
            <p className="text-xs">{user?.displayName} | Buyer</p>
          </div>
          <img
            src={user?.photoURL || "https://i.ibb.co/Jk7KDyk/avatar.png"}
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-indigo-400"
          />
          <button className="relative text-xl" title="Notifications">
            <FaBell />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </button>
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" onChange={handleToggle} />

            {/* moon icon */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>

            {/* sun icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
          </label>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed border-r z-10 md:relative md:translate-x-0 transform top-18 left-0 w-64 h-[calc(100%-4rem)] shadow-lg transition-transform duration-300 ease-in-out ${
            currentTheme === "acid" ? "bg-white/90" : "bg-gray-700/90"
          } md:bg-none lg:bg-none ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:top-0 md:h-auto md:block md:static`}
        >
          <nav className="p-4 space-y-2">
            <a
              href="/dashboard/buyerstats"
              className={`block font-medium hover:text-indigo-600`}
            >
              Stats
            </a>
            <a
              href="/dashboard/add-task"
              className="block font-medium hover:text-indigo-600"
            >
              Add a task
            </a>
            <a
              href={`/dashboard/mytasks`}
              className="block font-medium hover:text-indigo-600"
            >
              My Tasks
            </a>
            <a
              href="/dashboard/taskreview"
              className="block font-medium hover:text-indigo-600"
            >
              Task to Review 
            </a>
            <a
              href="/dashboard/purchase-coin"
              className="block font-medium hover:text-indigo-600"
            >
              Purchase Coins 
            </a>
            <a
              href="/dashboard/profile"
              className="block font-medium hover:text-indigo-600"
            >
              Profile
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto relative">
          {isLoading && (
            <div className="absolute inset-0 z-50 bg-opacity-30 bg-black flex justify-center items-center">
              <Loading />
            </div>
          )}
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm border-t">
        <Footer/>
      </footer>
    </div>
  );
};

export default BuyerDashboard;
