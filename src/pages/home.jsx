// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, Users, Settings, LogOut } from "lucide-react";
import logo from "../assets/pathfinder-logo.png";

const Home = ({ classes }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [uniqueClasses, setUniqueClasses] = useState([]);

  // ✅ Load from props or localStorage on mount
  useEffect(() => {
    let classList = classes;
    if (!classList || classList.length === 0) {
      const teacher = JSON.parse(localStorage.getItem("teacher"));
      classList = teacher?.classes || [];
    }

    // ✅ Remove duplicate grades (like 3B appearing multiple times for diff subjects)
    const filtered = classList.filter(
      (value, index, self) =>
        index === self.findIndex((c) => c.grade === value.grade)
    );
    setUniqueClasses(filtered);
  }, [classes]);

  // ✅ Total unique learners (assume each class has its own learner count)
  const totalLearners = uniqueClasses.reduce(
    (sum, cls) => sum + (Number(cls.learners) || 0),
    0
  );

  // ✅ Total unique classes
  const totalClasses = uniqueClasses.length;

  const navItems = [
    { name: "Home", icon: <LayoutDashboard size={20} />, path: "/home" },
    { name: "Classes", icon: <BookOpen size={20} />, path: "/classes" },
    { name: "Manage Learners", icon: <Users size={20} />, path: "/students" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-5 border-b flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          <h1
            className="text-xl font-bold tracking-wide"
            style={{ color: "#6fb7de" }}
          >
            Teacher Portal
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 p-2 rounded-lg font-semibold transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {item.icon} {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#6fb7de" }}>
          Welcome Back, Teacher
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Total Learners", value: totalLearners, bg: "bg-blue-100 text-blue-700" },
            { title: "Total Classes", value: totalClasses, bg: "bg-purple-100 text-purple-700" },
            { title: "Average Performance", value: "--%", bg: "bg-pink-100 text-pink-700" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className={`rounded-xl p-5 shadow-md ${stat.bg}`}
            >
              <h3 className="text-sm opacity-80">{stat.title}</h3>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
