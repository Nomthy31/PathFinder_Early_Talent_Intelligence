import React, { useState, useEffect } from "react";
import { BookOpen, CheckCircle2, XCircle } from "lucide-react";
import styles from "./SeniorEnglishActivity.module.css";

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

const SeniorEnglishActivity = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    if (option === englishQuestions[index].answer) {
      setFeedback("correct");
      setScore(score + 1);

      if (index === englishQuestions.length - 1) {
        setCompleted(true);
      } else {
        setTimeout(() => nextQuestion(), 1000);
      }
    } else {
      setFeedback("wrong");
    }
  };

  const nextQuestion = () => {
    setSelected("");
    setFeedback("");
    setIndex((index + 1) % englishQuestions.length);
  };

  // ✅ Trigger backend save when complete
  useEffect(() => {
    if (completed) {
      console.log("✅ English activity completed. Ready to send to Supabase.");
      // Parent (FoundationActivities / SeniorActivities) handles Supabase insert
    }
  }, [completed]);

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
                className={`${styles.optionBtn} ${
                  selected === option ? styles.selected : ""
                }`}
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
            You scored <strong>{score}</strong> out of{" "}
            {englishQuestions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default SeniorEnglishActivity;
