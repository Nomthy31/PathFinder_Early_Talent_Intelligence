import React, { useState, useEffect } from "react";
import { BookOpen, CheckCircle2, XCircle } from "lucide-react";
import styles from "./SeniorEnglishActivity.module.css";
import { supabase } from "../../../../lib/supabaseClient"; // adjust path

const englishQuestions = [
  {
    question: "Identify the verb: 'The cat chased the mouse.'",
    options: ["cat", "chased", "mouse"],
    answer: "chased",
  },
  {
    question: "Choose the correct form: 'She ___ to school every day.'",
    options: ["go", "goes", "going"],
    answer: "goes",
  },
  {
    question: "Find the synonym of 'intelligent':",
    options: ["clever", "lazy", "tired"],
    answer: "clever",
  },
  {
    question: "Select the correct sentence:",
    options: [
      "He don’t like apples.",
      "He doesn’t likes apples.",
      "He doesn’t like apples.",
    ],
    answer: "He doesn’t like apples.",
  },
];

const SeniorEnglishActivity = ({ grade = "Senior" }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Stats tracking
  const [userStats, setUserStats] = useState([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [retries, setRetries] = useState(0);

  const handleSelect = (option) => {
    const timeSpent = Date.now() - questionStartTime;
    const correct = option === englishQuestions[index].answer;

    // Save attempt
    setUserStats((prev) => [
      ...prev,
      {
        question: englishQuestions[index].question,
        correct,
        retries,
        timeSpent,
        usedLinguistic: true,
      },
    ]);

    setSelected(option);
    setFeedback(correct ? "correct" : "wrong");

    if (correct) setScore((prev) => prev + 1);
    else setRetries((prev) => prev + 1);

    if (index === englishQuestions.length - 1) {
      setTimeout(() => setCompleted(true), 800);
    } else {
      setTimeout(() => nextQuestion(), 800);
    }
  };

  const nextQuestion = () => {
    setIndex((prev) => prev + 1);
    setSelected("");
    setFeedback("");
    setQuestionStartTime(Date.now());
    setRetries(0);
  };

  // Save stats to Supabase when completed
  useEffect(() => {
    if (!completed || userStats.length === 0) return;

    const totalQuestions = userStats.length;
    const correctAnswers = userStats.filter((q) => q.correct).length;
    const avgTime =
      userStats.reduce((acc, q) => acc + q.timeSpent, 0) / totalQuestions;
    const avgRetries =
      userStats.reduce((acc, q) => acc + q.retries, 0) / totalQuestions;
    const percentLinguistic =
      (userStats.filter((q) => q.correct && q.usedLinguistic).length / totalQuestions) * 100;

    const stats = {
      student_id: "mock-student-001", // replace with logged-in student ID
      subject: "English",
      grade,
      total_questions: totalQuestions,
      correct_answers: correctAnswers,
      avg_time: avgTime,
      avg_retries: avgRetries,
      percent_linguistic: percentLinguistic,
      created_at: new Date().toISOString(),
    };

    supabase
      .from("student_activity_stats")
      .insert([stats])
      .then(({ error }) => {
        if (error) console.error("❌ Failed to save English stats:", error);
        else console.log("✅ English stats saved!", stats);
      });
  }, [completed, userStats]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <BookOpen className={styles.icon} size={36} /> English Mastery
      </h2>

      {!completed ? (
        <>
          <p className={styles.question}>{englishQuestions[index].question}</p>

          <div className={styles.options}>
            {englishQuestions[index].options.map((option) => (
              <button
                key={option}
                className={`${styles.optionBtn} ${selected === option ? styles.selected : ""}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className={styles.feedback}>
            {feedback === "correct" && (
              <div className={`${styles.message} ${styles.correct}`}>
                <CheckCircle2 size={22} /> Correct!
              </div>
            )}
            {feedback === "wrong" && (
              <div className={`${styles.message} ${styles.wrong}`}>
                <XCircle size={22} /> Try again!
              </div>
            )}
          </div>

          <div className={styles.score}>Score: {score}</div>
        </>
      ) : (
        <div className={styles.completionScreen}>
          <CheckCircle2 className={styles.bigIcon} size={60} color="green" />
          <h3>Excellent work!</h3>
          <p>
            You scored <strong>{score}</strong> out of {englishQuestions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default SeniorEnglishActivity;
