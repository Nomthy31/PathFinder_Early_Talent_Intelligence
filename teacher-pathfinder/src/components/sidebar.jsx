// src/components/SidebarLayout.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, Users, Settings, LogOut } from "lucide-react";
import logo from "../assets/pathfinder-logo.png";

const SidebarLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

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
          <h1 className="text-xl font-bold tracking-wide" style={{ color: "#6fb7de" }}>
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
            onClick={() => navigate("/login")}
            className="flex items-center gap-3 text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default SidebarLayout;
