import React from "react";
import { useNavigate } from "react-router";

const AboutSection = () => {
  const navigate = useNavigate();

  const fullContent =
    "Our platform transforms the way freelancers and buyers connect by blending transparency, speed, and trust. With secure payments, real-time notifications, smart dashboards, and easy task management, we ensure both buyers and workers achieve more with less effort. Every feature is designed to remove complexity—so you can focus on doing great work or finding the right talent. Whether you’re posting, bidding, submitting, or withdrawing, everything is handled with clarity and efficiency. This platform is built for the future of work, where opportunity meets skill in one trusted place.";

  const previewContent = fullContent.split(" ").slice(0, 60).join(" ") + "...";

  return (
    <section className="flex flex-col md:flex-row items-center gap-10 py-16 px-6 max-w-7xl mx-auto">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://i.ibb.co/9ymnXfQ/freelancer.png"
          alt="About Platform"
          className="rounded-2xl shadow-lg"
        />
      </div>

      {/* Right Side - Content */}
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-600">
          Empowering Freelancers and Buyers with Trust, Speed, and Clarity.
        </h2>
        <p className="text-gray-700 text-base leading-relaxed mb-6">
          {previewContent}
        </p>
        <button
          onClick={() => navigate("/learn-more")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Learn More
        </button>
      </div>
    </section>
  );
};

export default AboutSection;
