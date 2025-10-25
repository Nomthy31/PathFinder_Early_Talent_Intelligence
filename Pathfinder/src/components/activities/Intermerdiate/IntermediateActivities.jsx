import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { Brain, Star, CheckCircle, XCircle } from "lucide-react";
import styles from "./IntermediateActivities.module.css";
import IntermediateMathActivity from "./subjects/IntermediateMathActivity";
import IntermediateEnglishActivity from "./subjects/IntermediateEnglishActivity";
import IntermediateArtActivity from "./subjects/IntermediateArtActivity";

// ✅ Supabase client
import { supabase } from "../../../lib/supabaseClient";

const IntermediateActivities = ({ subject, grade, onBack }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);

  // 📝 Tracking metrics
  const [userStats, setUserStats] = useState([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [retries, setRetries] = useState(0);

  const patternQuestion = {
    question: "Which shape completes the pattern?",
    sequence: ["🔺", "🔹", "🔺", "🔹", "❓"],
    options: ["🔺", "🔸", "🔹", "⚫"],
    correct: "🔺",
  };

  // 🔊 Sound feedback
  const playSound = (type) => {
    const audio = new Audio(
      type === "success"
        ? "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
        : "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
    );
    audio.play().catch((err) => console.log("Audio error:", err));
  };

  const handleAnswer = (option, usedVisual = true, usedDrawing = false) => {
    const timeSpent = Date.now() - questionStartTime;

    const correct = option === patternQuestion.correct;

    // Store stats
    setUserStats((prev) => [
      ...prev,
      {
        subject,
        grade,
        timeSpent,
        retries,
        usedVisual,
        usedDrawing,
        correct,
      },
    ]);

    if (correct) {
      setFeedback("correct");
      playSound("success");
      setTimeout(() => setCompleted(true), 1000);
    } else {
      setRetries(retries + 1);
      setFeedback("wrong");
      playSound("error");
    }

    setSelectedAnswer(option);
    setQuestionStartTime(Date.now());
  };

  // Compute and send stats to Supabase when activity is completed
  useEffect(() => {
    if (!completed || userStats.length === 0) return;

    const avgTime =
      userStats.reduce((acc, q) => acc + q.timeSpent, 0) / userStats.length;
    const avgAccuracy =
      (userStats.filter((q) => q.correct).length / userStats.length) * 100;
    const avgRetries =
      userStats.reduce((acc, q) => acc + q.retries, 0) / userStats.length;
    const percentDrawing =
      (userStats.filter((q) => q.usedDrawing).length / userStats.length) * 100;
    const percentVisual =
      (userStats.filter((q) => q.usedVisual).length / userStats.length) * 100;

    const stats = {
      student_id: "mock-student-001", // replace with real user ID
      subject,
      grade,
      avg_time: avgTime,
      avg_accuracy: avgAccuracy,
      avg_retries: avgRetries,
      percent_drawing: percentDrawing,
      percent_visual: percentVisual,
      created_at: new Date().toISOString(),
    };

    supabase
      .from("student_activity_stats")
      .insert([stats])
      .then(({ error }) => {
        if (error) console.error("Failed to save stats:", error);
        else console.log("Saved stats successfully!");
      });
  }, [completed]);

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
