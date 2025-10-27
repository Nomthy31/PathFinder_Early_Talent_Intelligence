// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [uniqueId, setUniqueId] = useState("");
  const [grade, setGrade] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!uniqueId || !grade) {
      alert("Please enter email and Grade!");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ uniqueId, grade }));
    navigate("/home");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #7DD1E0, #CFA0F0)" }}
    >
      {/* ✨ Floating sparkles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full opacity-50 w-1 h-1 animate-sparkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Login Card */}
      <div
        className="p-8 rounded-2xl shadow-xl w-96 flex flex-col items-center relative z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.6))",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Profile icon */}
        <div className="flex justify-center mb-6">
          <div
            className="h-20 w-20 rounded-full flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(135deg, #7DD1E0, #CFA0F0)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Learner Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4 w-full">
          {/* Unique ID */}
          <div>
            <label className="block text-gray-800 mb-1">Unique ID</label>
            <input
              type="text"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              className="w-full px-4 py-2 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/70 bg-white/80 placeholder-gray-400 text-gray-900"
              placeholder="Enter your unique ID"
            />
          </div>

          {/* Grade */}
          <div>
            <label className="block text-gray-800 mb-1">Grade</label>
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-2 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/70 bg-white/80 placeholder-gray-400 text-gray-900"
              placeholder="Enter your grade (e.g., 6A)"
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full text-white font-semibold py-2 rounded-lg transition-all shadow-lg"
            style={{
              background: "linear-gradient(135deg, #7DD1E0, #CFA0F0)",
            }}
          >
            Login
          </button>
        </form>
      </div>

      {/* ✨ Animation styles */}
      <style>
        {`
          @keyframes sparkle {
            0%,100% { transform: translateY(0) scale(1); opacity: 0.5; }
            50% { transform: translateY(-10px) scale(1.2); opacity: 1; }
          }
          .animate-sparkle {
            animation: sparkle 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
