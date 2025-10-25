import React from "react";
import { Book, Brush, Calculator, FlaskRound, Heart } from "lucide-react";
import "./SubjectSelect.css";

const subjects = [
  { name: "Mathematics", icon: <Calculator size={28} /> },
  { name: "English", icon: <Book size={28} /> },
  { name: "Arts", icon: <Brush size={28} /> },
];

const SubjectSelect = ({ onSelect }) => {
  return (
    <div className="subject-select">
      <h1>Choose a Subject</h1>
      <div className="subject-grid">
        {subjects.map((subject) => (
          <button
            key={subject.name}
            className="subject-card"
            onClick={() => onSelect(subject.name)}
          >
            {subject.icon}
            <span>{subject.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelect;
