import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCoins } from "react-icons/fa";
import Swal from "sweetalert2";
import { useTheme } from "../../Hooks/useTheme";

const Top_Workers = () => {

  const currentTheme = useTheme();
  const [workers, setWorkers] = useState([]);
  useEffect(() => {
    axios
      .get("https://micronomy.vercel.app/allworkers")
      .then((res) => {
        if (res.data) {
          setWorkers(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: {err},
        });
        console.error("Error fetching workers:", err);
      });
  }, []);
  return (
    <section className="relative normal-font">
      <div className="relative py-16 px-4 lg:px-10">
        <h2 className="font-bold mb-4">Top Workers</h2>
        <p className={`${
            currentTheme === "acid" ? "text-indigo-600" : "text-indigo-300"
          } mb-10 text-3xl md:text-4xl`}>Meet our most dedicated earners</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {workers.slice(0,6).map((worker) => (
            <div
              key={worker.id}
              className="relative rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              {/* Background Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-center opacity-5 pointer-events-none"
                style={{
                  backgroundImage: "url('https://i.ibb.co/5XX3c1C6/image.png')",
                }}
              ></div>

              {/* Content Wrapper */}
              <div className="relative flex flex-col flex-1">
                {/* Top Info */}
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                  <div className="flex gap-2 items-center">
                    <img
                      src={worker.image}
                      alt={worker.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                    />
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-base-content">
                        {worker.name}
                      </h3>
                      <p className="text-sm text-base-600">
                        {worker.profession}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-yellow-500 font-semibold mt-1">
                    <FaCoins className="mr-1" />
                    <span>{worker.coins} Coins</span>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="flex flex-col flex-1 p-5">
                  <p className="text-base-900 text-justify text-sm mb-4">
                    {worker.about}
                  </p>
                  <div className="mt-auto">
                    <button className="bg-indigo-400 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg transition ">
                      About Me
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Top_Workers;
