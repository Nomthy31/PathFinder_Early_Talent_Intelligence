// src/pages/TeacherLogin.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TeacherLogin() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const teacherData = localStorage.getItem("teacher");
    if (!teacherData) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    if (!teacher || teacher.name !== name || teacher.surname !== surname || teacher.password !== password) {
      alert("Invalid credentials!");
      return;
    }
    alert(`Welcome back, ${teacher.name}!`);
    navigate("/home"); // ✅ home is the first screen
  };

  const handleForgotPassword = () => {
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    if (!teacher) {
      alert("No account found. Please signup first.");
      return;
    }
    alert(`Your password is: ${teacher.password}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #eef2f7, #d9e2ef)" }}>
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Teacher Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter first name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Surname</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Enter surname"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p
              className="text-blue-500 text-sm mt-1 cursor-pointer hover:underline"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </p>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg text-white font-semibold transition-colors"
            style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
