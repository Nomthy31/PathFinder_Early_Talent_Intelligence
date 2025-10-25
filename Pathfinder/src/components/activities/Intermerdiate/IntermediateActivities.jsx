import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { Brain, Star, CheckCircle, XCircle } from "lucide-react";
import styles from "./IntermediateActivities.module.css";
import IntermediateMathActivity from "./subjects/IntermediateMathActivity";
import IntermediateEnglishActivity from "./subjects/IntermediateEnglishActivity";
import IntermediateArtActivity from "./subjects/IntermediateArtActivity";

const IntermediateActivities = ({ subject, grade, onBack }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);

  // 🔊 Sound feedback
  const playSound = (type) => {
    const audio = new Audio(
      type === "success"
        ? "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1a3c7b9dc3.mp3?filename=success-1-6297.mp3"
        : "https://cdn.pixabay.com/download/audio/2022/03/15/audio_00f9c8d21f.mp3?filename=error-1-126517.mp3"
    );
    audio.play();
  };

  const patternQuestion = {
    question: "Which shape completes the pattern?",
    sequence: ["🔺", "🔹", "🔺", "🔹", "❓"],
    options: ["🔺", "🔸", "🔹", "⚫"],
    correct: "🔺",
  };

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    if (option === patternQuestion.correct) {
      setFeedback("correct");
      playSound("success");
      setTimeout(() => setCompleted(true), 1000);
    } else {
      setFeedback("wrong");
      playSound("error");
    }
  };

  const renderActivity = () => {
    switch (subject.toLowerCase()) {
      case "mathematics":
        return <IntermediateMathActivity grade={grade} />;
      case "english":
        return <IntermediateEnglishActivity grade={grade} />;
      case "art":
        return <IntermediateArtActivity grade={grade} />;
      default:
        return <p>No activity found for this subject.</p>;
    }
  };

  return (
    <div className={styles.intermediateWrapper}>
      {completed && <Confetti numberOfPieces={180} recycle={false} />}

      <button className={styles.backButton} onClick={onBack}>
        ← Back
      </button>

      <div className={styles.header}>
        <Brain className={styles.icon} />
        <h2>{subject} - Intermediate Activity</h2>
      </div>
      <p className={styles.gradeInfo}>Grade {grade} | Intermediate Phase</p>

      <motion.div
        className={styles.quizCard}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className={styles.questionText}>{patternQuestion.question}</h3>

        <div className={styles.sequence}>
          {patternQuestion.sequence.map((item, i) => (
            <span key={i} className={styles.seqItem}>
              {item}
            </span>
          ))}
        </div>

        <div className={styles.options}>
          {patternQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`${styles.optionBtn} ${
                selectedAnswer === option
                  ? feedback === "correct"
                    ? styles.correct
                    : styles.wrong
                  : ""
              }`}
              onClick={() => handleAnswer(option)}
              disabled={completed}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {feedback && (
          <motion.div
            className={`${styles.feedback} ${
              feedback === "correct" ? styles.correct : styles.wrong
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {feedback === "correct" ? (
              <>
                <CheckCircle size={40} />
                <p>Great job! You got it right!</p>
              </>
            ) : (
              <>
                <XCircle size={40} />
                <p>Oops! Try again!</p>
              </>
            )}
          </motion.div>
        )}

        {completed && (
          <motion.div
            className={styles.completed}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Star className={styles.star} />
            <p>Warm-up Complete!</p>
          </motion.div>
        )}
      </motion.div>

      {completed && (
        <motion.div
          className={styles.subjectContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className={styles.subjectHeading}>
            Continue with {subject} activities
          </h2>
          {renderActivity()}
        </motion.div>
      )}
    </div>
  );
};

export default IntermediateActivities;
