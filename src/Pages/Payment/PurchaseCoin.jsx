import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaCoins } from "react-icons/fa";
import banner from "../../assets/purchase coin.mp4";
import ShinyText from "../../../reactBits/ShinyText/ShinyText";
import RotatingText from "../../../reactBits/RotatingText";
import { useTheme } from "../../Shared/Hooks/useTheme";
import Swal from "sweetalert2";
import axios from "axios";
// import { useTheme } from "../../Shared/Hooks/useTheme";

// const plans = [
//   { coins: 10, amount: 1 },
//   { coins: 150, amount: 10 },
//   { coins: 500, amount: 20 },
//   { coins: 1000, amount: 35 },
// ];



const PurchaseCoin = () => {
  // const navigate = useNavigate();

  // const handlePurchase = (amount, coins) => {
  //   navigate("/checkout", { state: { amount, coins } });
  // };

  const [plans, setPlans] = useState([]);

useEffect(() => {
  axios.get("/purchase-plans")
    .then((response) => {
      setPlans(response.data);
    })
    .catch((error) => {
       
Swal.fire({
  icon: "error",
  title: "Oops...",
  text: error.message,
  
});
    });
},[]);

  const currentTheme = useTheme();
  console.log("Current Theme:", currentTheme);


  return (
    <section className="min-h-screen normal-font">
      {/* Banner */}
      <div className="relative h-[60vh] bg-black w-full z-5 overflow-hidden flex items-center justify-center">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src={banner} type="video/mp4" />
        </video>
        <div className="relative w-full z-10 text-center text-white">
                  <h1 className="flex gap-2 justify-center items-center text-4xl md:text-5xl text-center font-extrabold mb-4">
                      Purchase
            <RotatingText
              texts={ [ "Coins", "Boost", "Opportunities", "Freedom", "Victory" ]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-yellow-400 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </h1>
          <ShinyText text="Buy coins to post tasks and boost your opportunities" disabled={false} speed={5} className='custom-class text-lg md:text-xl font-medium' />
        </div>
      </div>

      {/* Coin Plans */}
          <div className={`py-16 px-6  max-w-7xl mx-auto text-center
  ${currentTheme === 'acid' ? "bg-gradient-to-tr from-yellow-100 via-white to-yellow-50 " : "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900"}
  transition-colors duration-500`}>
              <div className="max-w-7xl mx-auto text-center ">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-amber-600 mb-8"
        >
          Purchase Coins
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-700 mb-12"
        >
          Select a coin pack and get started immediately!
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((info, idx) => (
            <motion.div
              key={info._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.2 }}
              className="bg-white shadow-xl rounded-2xl p-6 border border-amber-300 hover:border-amber-500"
            >
              <div className="flex items-center justify-center text-amber-500 mb-4">
                <FaCoins className="text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {info.coins} Coins
              </h3>
              <p className="text-lg text-gray-600 mb-4">Only ${info.price}</p>
              {/* <button
                onClick={() => handlePurchase(amount, coins)}
                className="btn w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg"
              >
                Buy Now
              </button> */}
              <a href={`payment/${info._id}`}
        
                className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg"
              >
                Buy Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default PurchaseCoin;
