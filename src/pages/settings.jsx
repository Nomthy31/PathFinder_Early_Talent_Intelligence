// src/pages/Settings.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, Users, Settings, LogOut } from "lucide-react";

const SettingsPage = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", icon: <LayoutDashboard size={20} />, path: "/home" },
    { name: "Classes", icon: <BookOpen size={20} />, path: "/classes" },
    { name: "Manage Students", icon: <Users size={20} />, path: "/students" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-5 border-b flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-wide text-blue-600">Teacher Portal</h1>
        </div>
        <nav className="flex-1 p-4 space-y-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 p-2 rounded-lg font-semibold transition ${
                  isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <button className="flex items-center gap-3 text-red-600 hover:bg-red-50 p-2 rounded-lg transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-blue-600">Settings</h2>
        <p className="mt-4 text-gray-700">
          This is the Settings page. We’ll add user preferences and configuration options here later.
        </p>
      </main>
    </div>
  );
};

export default SettingsPage;
