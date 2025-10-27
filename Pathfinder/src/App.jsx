import React, { useState } from "react";
import { ArrowLeftCircle, Star, BookOpen, Calculator, Pencil, Palette } from "lucide-react";
import Activities from "./components/activities";
import styles from "./App.module.css";

const subjects = [
  { name: "Mathematics", icon: <Calculator size={32} />, gradient: "linear-gradient(135deg, #60a5fa, #93c5fd)" },
  { name: "English", icon: <Pencil size={32} />, gradient: "linear-gradient(135deg, #f472b6, #f9a8d4)" },
  { name: "Arts", icon: <Palette size={32} />, gradient: "linear-gradient(135deg, #34d399, #6ee7b7)" },
];

const App = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);

  // Step 1: Select Subject
  if (!selectedSubject) {
    return (
      <div className={styles.pageWrapper}>
        {/* Heading + Book Icon at top */}
        <div className={styles.headingContainer}>
          <BookOpen className={styles.mainIcon} size={50} />
          <h1 className={styles.title}>Pathfinder Learning Activities</h1>
        </div>
        <p className={styles.subtitleAboveSubjects}>Choose a subject to begin your adventure!</p>

        {/* Horizontal subject boxes */}
        <div className={styles.subjectContainer}>
          {subjects.map((subject) => (
            <div
              key={subject.name}
              className={styles.subjectBox}
              onClick={() => setSelectedSubject(subject.name)}
              style={{ background: subject.gradient }}
            >
              <div className="mb-2">{subject.icon}</div>
              <div>{subject.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Step 2: Select Grade (unchanged from your original)
  if (!selectedGrade) {
    return (
      <div className={styles.pageWrapper}>
        <h1 className={styles.title}>{selectedSubject}</h1>
        <p className={styles.subtitle}>Select your grade to begin:</p>

        <div className={styles.gradeGrid}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((grade) => (
            <button
              key={grade}
              className={`${styles.gradeButton} ${
                grade < 4
                  ? styles.foundation
                  : grade < 7
                  ? styles.intermediate
                  : styles.senior
              }`}
              onClick={() => setSelectedGrade(grade)}
            >
              <Star size={20} />
              Grade {grade}
            </button>
          ))}
        </div>

        <button
          className={styles.backButton}
          onClick={() => setSelectedSubject(null)}
        >
          <ArrowLeftCircle size={20} />
          Back to Subjects
        </button>
      </div>
    );
  }

  // Step 3: Load Activities
  return (
    <Activities
      subject={selectedSubject}
      grade={selectedGrade}
      onBack={() => setSelectedGrade(null)}
    />
  );
};

export default App;
