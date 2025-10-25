import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import logo from "../assets/pathfinder-logo.png";

const ManageLearners = ({ classes = [], setClasses = () => {} }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedClass, setSelectedClass] = useState("");
  const [learnerName, setLearnerName] = useState("");
  const [loadedClasses, setLoadedClasses] = useState([]);

  // ✅ Load classes automatically from localStorage if not passed as props
  useEffect(() => {
    const teacherData = JSON.parse(localStorage.getItem("teacherData")) || {};
    if (classes.length === 0 && teacherData.classes) {
      setLoadedClasses(teacherData.classes);
    } else {
      setLoadedClasses(classes);
    }
  }, [classes]);

  // ✅ Keep teacherData updated in localStorage
  useEffect(() => {
    const teacherData = JSON.parse(localStorage.getItem("teacherData")) || {};
    if (loadedClasses.length > 0) {
      localStorage.setItem(
        "teacherData",
        JSON.stringify({ ...teacherData, classes: loadedClasses })
      );
    }
  }, [loadedClasses]);

  const handleAddLearner = () => {
    if (!selectedClass || !learnerName.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    const updated = loadedClasses.map((cls) =>
      cls.className === selectedClass
        ? {
            ...cls,
            learnersList: [...(cls.learnersList || []), learnerName],
            learners: (cls.learnersList?.length || 0) + 1,
          }
        : cls
    );

    setLoadedClasses(updated);
    setLearnerName("");
  };

  const displayClasses = loadedClasses.length > 0 ? loadedClasses : [];

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
          Manage Learners
        </h2>

        {/* Add Learner Section */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block mb-1 font-semibold">Select Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Select Class --</option>
                {displayClasses.map((cls, i) => (
                  <option key={i} value={cls.className}>
                    {cls.className}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Learner Name</label>
              <input
                type="text"
                value={learnerName}
                onChange={(e) => setLearnerName(e.target.value)}
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400"
                placeholder="Enter learner name"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddLearner}
              className="px-6 py-2 rounded-lg text-white font-semibold transition-colors mt-2"
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
              }}
            >
              Add Learner
            </motion.button>
          </div>
        </div>

        {/* Learner List */}
        {selectedClass && (
          <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">
              Learners in {selectedClass}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {displayClasses
                .find((cls) => cls.className === selectedClass)
                ?.learnersList?.map((learner, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-blue-50 rounded-xl shadow-sm text-center text-gray-800 font-semibold"
                  >
                    {learner}
                  </motion.div>
                )) || (
                <p className="text-gray-500 italic">
                  No learners added yet for this class.
                </p>
              )}
            </div>
          </div>
        )}

        {/* 📝 Little note at the bottom */}
        <div className="mt-10 text-center text-gray-500 italic">
          Don’t mind this layout, still waiting for Cebo on how we should
          structure the tables 
        </div>
      </main>
    </div>
  );
};

export default ManageLearners;
