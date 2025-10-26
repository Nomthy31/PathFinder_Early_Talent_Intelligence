import React, { useState } from "react";
import { BookOpen, CheckCircle2, XCircle } from "lucide-react";
import styles from "./IntermediateEnglishActivity.module.css";
import useActivityTracker from "../../../../hooks/useActivityTracker"; // adjust path

const words = [
  { question: "Select the correct spelling:", options: ["beutiful", "beautiful", "beatiful"], answer: "beautiful" },
  { question: "Which word is a noun?", options: ["run", "dog", "quickly"], answer: "dog" },
  { question: "Choose the synonym of 'happy':", options: ["sad", "joyful", "angry"], answer: "joyful" },
  { question: "Which word is an adjective?", options: ["bright", "run", "slowly"], answer: "bright" },
  { question: "Choose the correct article: ___ apple", options: ["a", "an", "the"], answer: "an" },
];

const IntermediateEnglishActivity = ({ grade = "Intermediate" }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const { recordAnswer, userStats } = useActivityTracker("English");

  const handleSelect = (option) => {
    const correct = option === words[index].answer;

    // Record answer in hook
    recordAnswer(correct, true, false); // usedVisual: true, usedDrawing: false

    setSelected(option);
    setFeedback(correct ? "correct" : "wrong");

    if (correct) setScore((prev) => prev + 1);

    if (index === words.length - 1) {
      setTimeout(() => setCompleted(true), 800);
    } else {
      setTimeout(() => nextQuestion(), 800);
    }
  };

  const nextQuestion = () => {
    setIndex((prev) => prev + 1);
    setSelected("");
    setFeedback("");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <BookOpen className={styles.icon} /> English Challenge
      </h2>

      {!completed ? (
        <>
          <p className={styles.question}>{words[index].question}</p>

          <div className={styles.options}>
            {words[index].options.map((option) => (
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
              <div className={`${styles.feedbackMsg} ${styles.correct}`}>
                <CheckCircle2 /> Correct!
              </div>
            )}
            {feedback === "wrong" && (
              <div className={`${styles.feedbackMsg} ${styles.wrong}`}>
                <XCircle /> Try again!
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
            You scored <strong>{score}</strong> out of {words.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default IntermediateEnglishActivity;
