// src/pages/Classes.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, Users, Settings, LogOut, Plus, Trash2, Edit, Search } from "lucide-react";
import logo from "../assets/pathfinder-logo.png";

const Classes = ({ classes, setClasses }) => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({ name: "", grade: "", learners: 0 });

  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddClass = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.grade) return alert("Please fill all fields!");
    if (editingClass) {
      setClasses(classes.map((cls) =>
        cls.id === editingClass.id ? { ...editingClass, ...formData, learners: Number(formData.learners) } : cls
      ));
    } else {
      const id = classes.length ? classes[classes.length - 1].id + 1 : 1;
      setClasses([...classes, { id, ...formData, learners: Number(formData.learners) }]);
    }
    setEditingClass(null);
    setFormData({ name: "", grade: "", learners: 0 });
    setShowForm(false);
  };

  const handleDelete = (id) => setClasses(classes.filter((cls) => cls.id !== id));
  const handleEdit = (cls) => {
    setEditingClass(cls);
    setFormData({ name: cls.name, grade: cls.grade, learners: cls.learners });
    setShowForm(true);
  };

  const navItems = [
    { name: "Home", icon: <LayoutDashboard size={20} />, path: "/home" },
    { name: "Classes", icon: <BookOpen size={20} />, path: "/classes" },
    { name: "Manage Learners", icon: <Users size={20} />, path: "/students" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-600">Classes</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg shadow-md hover:scale-105 transition-transform bg-gradient-to-r from-green-400 to-blue-500"
          >
            <Plus size={18} /> Add Class
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
          />
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-left">
            <thead className="bg-blue-100 text-blue-700">
              <tr>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Learners</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((cls) => (
                <motion.tr
                  key={cls.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-medium">{cls.name}</td>
                  <td className="py-3 px-4">{cls.grade}</td>
                  <td className="py-3 px-4">{cls.learners}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => handleEdit(cls)} className="text-blue-500 hover:text-blue-700 mr-2">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(cls.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm"
            >
              <h3 className="text-lg font-bold text-blue-600 mb-4">
                {editingClass ? "Edit Class" : "Add New Class"}
              </h3>
              <form onSubmit={handleAddClass} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Grade</label>
                  <input
                    type="text"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Learners</label>
                  <input
                    type="number"
                    value={formData.learners}
                    min={0}
                    onChange={(e) => setFormData({ ...formData, learners: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditingClass(null); }}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Classes;
