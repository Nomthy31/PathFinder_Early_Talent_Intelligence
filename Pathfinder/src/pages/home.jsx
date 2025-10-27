// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import robot from "../assets/robot-removebg-preview.png"; // Ensure this path is correct


export default function Home() {
  const [learner, setLearner] = useState(null);
  const navigate = useNavigate(); // ✅ Initialize navigation hook

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      // Temporary mock data (replace later with API)
      const mockLearnerData = {
        uniqueId: storedUser.uniqueId,
        grade: storedUser.grade,
        name: "Bonolo",
        surname: "Phele",
      };

      setTimeout(() => setLearner(mockLearnerData), 500);
    }
  }, []);

  if (!learner) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 text-blue-800 text-xl font-semibold">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative flex flex-col justify-start overflow-hidden"
      style={{ background: "linear-gradient(135deg, #6EE7B7, #3B82F6)" }}
    >
      {/* 🌟 Floating blobs */}
      <div className="absolute top-10 left-20 w-40 h-40 bg-purple-300 rounded-full opacity-30 animate-blob mix-blend-multiply filter blur-2xl"></div>
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-pink-300 rounded-full opacity-20 animate-blob animation-delay-2000 mix-blend-multiply filter blur-3xl"></div>
      <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-blue-300 rounded-full opacity-25 animate-blob animation-delay-4000 mix-blend-multiply filter blur-2xl"></div>

      {/* ✨ Floating sparkles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full opacity-70 w-1 h-1 animate-sparkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Personalized Heading */}
      <h1 className="text-2xl md:text-3xl font-bold mt-12 ml-8 md:ml-16 z-10 relative text-white">
        Welcome, {learner.name} {learner.surname} from Grade {learner.grade}!
      </h1>

      {/* Robot + Speech Bubble */}
      <div className="absolute bottom-0 right-0 mb-4 mr-4 flex flex-col items-end z-10 animate-bob">
        <div className="relative mb-2 bg-white rounded-2xl p-4 shadow-lg max-w-xs -translate-x-16 animate-slide-in">
          <p className="text-gray-800 font-semibold text-sm md:text-base">
            Hi {learner.name}! I'm your learning buddy 🤖 ready to explore?
          </p>
          <div className="absolute right-4 bottom-0 w-4 h-4 bg-white rotate-45 translate-y-2 shadow-md"></div>
        </div>

        <img
          src={robot}
          alt="Robot"
          className="w-80 md:w-96 h-auto object-contain drop-shadow-[0_0_20px_rgba(62,132,255,0.5)]"
        />
      </div>

      {/* 🚀 Button navigates to /app */}
      <div className="absolute bottom-8 left-8 z-10">
        <button
          onClick={() => navigate("/app")} // ✅ This takes you to her app
          className="w-44 h-44 md:w-52 md:h-52 rounded-full flex items-center justify-center text-center font-bold text-white shadow-[0_0_30px_rgba(0,0,0,0.2)] animate-breathe hover:scale-105 transition-transform hover:shadow-[0_0_60px_rgba(62,132,255,0.7)]"
          style={{
            background: "linear-gradient(135deg, #6EE7B7, #3B82F6)",
            boxShadow:
              "0 0 30px rgba(62, 132, 255, 0.6), inset 0 0 15px rgba(255,255,255,0.3)",
          }}
        >
          Press me <br /> to have fun
        </button>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          .animate-breathe { animation: breathe 2s ease-in-out infinite; }

          @keyframes bob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bob { animation: bob 3s ease-in-out infinite; }

          @keyframes blob {
            0%, 100% { transform: translate(0px,0px) scale(1); }
            33% { transform: translate(20px, -30px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob { animation: blob 8s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }

          @keyframes slideIn {
            0% { opacity: 0; transform: translateX(-50px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .animate-slide-in { animation: slideIn 1s ease-out forwards; }

          @keyframes sparkle {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
            50% { transform: translateY(-10px) scale(1.3); opacity: 1; }
          }
          .animate-sparkle { animation: sparkle 3s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
}
