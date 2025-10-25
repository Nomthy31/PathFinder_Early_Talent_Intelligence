// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BookOpen, Users, Settings } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/home" },
    { name: "Classes", icon: <BookOpen size={18} />, path: "/classes" },
    { name: "Learners", icon: <Users size={18} />, path: "/managelearners" },
    { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-lg p-4 flex flex-col">
      <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        SmartSchool
      </h1>

      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
