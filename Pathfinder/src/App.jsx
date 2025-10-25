import React, { useState } from "react";
import { BookOpen, ArrowLeftCircle, Star } from "lucide-react";
import SubjectSelect from "./components/subjectsSelect";
import Activities from "./components/activities";
import styles from "./App.module.css";

const App = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);

  // Step 1: Select Subject
  if (!selectedSubject) {
    return (
      <div className={styles.pageWrapper}>
        <BookOpen className={styles.mainIcon} size={80} />
        <h1 className={styles.title}>Pathfinder Learning Activities</h1>
        <p className={styles.subtitle}>
          Choose a subject to begin your adventure!
        </p>
        <SubjectSelect onSelect={(subject) => setSelectedSubject(subject)} />
      </div>
    );
  }

  // Step 2: Select Grade
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
