import React, { useEffect } from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import error_light from "../../../public/error_light.json"
import error_dark from "../../../public/error_dark.json"
import { useTheme } from "../Hooks/useTheme";

const Error = () => {
  useEffect(() => {
    document.title = "Error 404";
  }, []);
    
    const currentTheme = useTheme();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Lottie className="w-[25rem] md:w-[30rem] lg:w-[60rem]"  animationData={currentTheme === 'acid' ? error_light : error_dark}/>
      <button className="btn bg-indigo-500 border-none text-white font-bold">
        {" "}
        <Link to="/">Go Back Home</Link>{" "}
      </button>
    </div>
  );
};

export default Error;