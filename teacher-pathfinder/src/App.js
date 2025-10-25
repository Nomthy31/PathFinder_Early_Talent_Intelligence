// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth pages
import TeacherSignup from "./pages/signup";
import TeacherLogin from "./pages/login";

// Main pages
import Home from "./pages/home";
import Classes from "./pages/classes";
import Students from "./pages/managelearners";
import SettingsPage from "./pages/settings";

function App() {
  const storedTeacher = JSON.parse(localStorage.getItem("teacherData")) || {};
  const [classes, setClasses] = useState(storedTeacher.classes || []);

  // Keep localStorage updated whenever classes change
  useEffect(() => {
    if (storedTeacher.name) {
      localStorage.setItem(
        "teacherData",
        JSON.stringify({ ...storedTeacher, classes })
      );
    }
  }, [classes]);

  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<TeacherSignup setClasses={setClasses} />} />
        <Route path="/login" element={<TeacherLogin />} />

        {/* Main pages */}
        <Route path="/home" element={<Home classes={classes} />} />
        <Route
          path="/classes"
          element={<Classes classes={classes} setClasses={setClasses} />}
        />
        <Route path="/students" element={<Students />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
