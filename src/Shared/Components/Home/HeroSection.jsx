import React, { useEffect, useState } from "react";
import video from "../../../assets/Hero-video.mp4";
import mobilevideo from "../../../assets/Mobile-video.mp4";
const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  // !For detecting screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      {/* Background Video for Desktop */}
      {!isMobile && (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* GIF/Image for Mobile */}
      {isMobile && (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={mobilevideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Content Over Video */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-4 bg-black/40 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Turn Minutes into Money
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Join thousands earning from micro tasks every day.
        </p>
        <button className="bg-indigo-300 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-400 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
