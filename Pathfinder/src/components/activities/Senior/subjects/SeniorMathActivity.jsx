// SeniorMathActivity.jsx
import React, { useState } from "react";
import { Calculator, CheckCircle2, XCircle } from "lucide-react";
import styles from "./SeniorMathActivity.module.css";

const mathQuestions = [
  { question: "Solve: 5x = 20", answer: "4" },
  { question: "Simplify: 12 ÷ 3 + 2", answer: "6" },
  { question: "Find x: 3x + 2 = 11", answer: "3" },
  { question: "Simplify: (8 + 4) × 2", answer: "24" },
  { question: "Solve: 15 - (3 × 4)", answer: "3" },
];

const SeniorMathActivity = () => {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    if (input.trim() === mathQuestions[index].answer) {
      setFeedback("correct");
      setScore((prev) => prev + 1);
      setTimeout(nextQuestion, 1000);
    } else {
      setFeedback("wrong");
    }
  };

  const nextQuestion = () => {
    setInput("");
    setFeedback("");
    setIndex((prev) => (prev + 1) % mathQuestions.length);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <Calculator className={styles.icon} /> Math Challenge
      </h2>

      <div className={styles.questionCard}>
        <p className={styles.question}>{mathQuestions[index].question}</p>

        <div className={styles.inputArea}>
          <input
            type="text"
            placeholder="Enter your answer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleSubmit} className={styles.submitBtn}>
            Submit
          </button>
        </div>

        {feedback === "correct" && (
          <div className={`${styles.feedback} ${styles.correct}`}>
            <CheckCircle2 /> Correct!
          </div>
        )}
        {feedback === "wrong" && (
          <div className={`${styles.feedback} ${styles.wrong}`}>
            <XCircle /> Try again!
          </div>
        )}
      </div>

      <div className={styles.score}>Score: {score}</div>
    </div>
  );
};

export default SeniorMathActivity;
