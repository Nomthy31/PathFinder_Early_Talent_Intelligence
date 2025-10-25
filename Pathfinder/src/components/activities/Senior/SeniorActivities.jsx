import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Award, CheckCircle, XCircle } from "lucide-react";
import styles from "./SeniorActivities.module.css";

import SeniorMathActivity from "./subjects/SeniorMathActivity";
import SeniorEnglishActivity from "./subjects/SeniorEnglishActivity";
import SeniorArtActivity from "./subjects/SeniorArtActivity";

const SeniorActivities = ({ subject, grade, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // ✅ Subject-specific rendering
  const renderActivity = () => {
    switch (subject.toLowerCase()) {
      case "mathematics":
        return <SeniorMathActivity grade={grade} />;
      case "english":
        return <SeniorEnglishActivity grade={grade} />;
      case "art":
        return <SeniorArtActivity grade={grade} />;
      default:
        return <p>No activity found for this subject.</p>;
    }
  };

  // 🧠 Example quiz
  const questions = [
    {
      question: "Which of the following is a prime number?",
      options: ["12", "17", "21", "27"],
      correct: "17",
    },
    {
      question: "Simplify: 3(x + 4) = ?",
      options: ["3x + 4", "x + 12", "3x + 12", "7x"],
      correct: "3x + 12",
    },
    {
      question: "If y = 2x + 3 and x = 5, find y.",
      options: ["10", "11", "13", "7"],
      correct: "13",
    },
  ];

  const handleAnswer = (option) => {
    setSelectedAnswer(option);

    if (option === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 800);
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>
        ← Back
      </button>

      <div className={styles.header}>
        <BookOpen size={48} color="#1e3a8a" />
        <h2>{subject} - Senior Activity</h2>
      </div>

      <p className={styles.gradeInfo}>Grade {grade} | Senior Phase</p>

      <div className={styles.mainContent}>
        {/* 📘 Left: Subject-specific interactive activity */}
        <div className={styles.subjectPanel}>{renderActivity()}</div>

        {/* 🧩 Right: Quiz Section */}
        <div className={styles.quizPanel}>
          {!showResult ? (
            <motion.div
              className={styles.quizCard}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className={styles.questionText}>
                {currentQuestion + 1}. {questions[currentQuestion].question}
              </h3>

              <div className={styles.options}>
                {questions[currentQuestion].options.map((option, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${styles.optionBtn} ${
                      selectedAnswer === option
                        ? option === questions[currentQuestion].correct
                          ? styles.correct
                          : styles.wrong
                        : ""
                    }`}
                    onClick={() => handleAnswer(option)}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              <div className={styles.progress}>
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </motion.div>
          ) : (
            <motion.div
              className={styles.resultCard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Award size={60} color="#f59e0b" />
              <h3>Quiz Complete!</h3>
              <p>
                You scored <strong>{score}</strong> out of {questions.length}
              </p>

              {score / questions.length >= 0.7 ? (
                <div className={`${styles.feedback} ${styles.correct}`}>
                  <CheckCircle size={32} color="#16a34a" />
                  <p>Excellent work — you're mastering this topic!</p>
                </div>
              ) : (
                <div className={`${styles.feedback} ${styles.wrong}`}>
                  <XCircle size={32} color="#ef4444" />
                  <p>Keep practicing — you’ll get there!</p>
                </div>
              )}

              <button className={styles.retryButton} onClick={restartQuiz}>
                Retry Quiz
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeniorActivities;
