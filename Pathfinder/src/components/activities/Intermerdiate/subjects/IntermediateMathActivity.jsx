import React, { useState } from "react";
import { Calculator, CheckCircle2, XCircle } from "lucide-react";
import styles from "./IntermediateMathActivity.module.css";

const generateQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operations = ["+", "-"];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  const answer = operation === "+" ? num1 + num2 : num1 - num2;
  return { num1, num2, operation, answer };
};

const IntermediateMathActivity = () => {
  const [question, setQuestion] = useState(generateQuestion());
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    if (parseInt(input) === question.answer) {
      setFeedback("correct");
      setScore(score + 1);
      playSound("success");
      setTimeout(() => {
        setQuestion(generateQuestion());
        setInput("");
        setFeedback("");
      }, 1000);
    } else {
      setFeedback("wrong");
      playSound("error");
    }
  };

  const playSound = (type) => {
    const url =
      type === "success"
        ? "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
        : "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg";

    const audio = new Audio(url);
    audio.currentTime = 0;
    audio.volume = 0.7;
    audio.play().catch((err) => console.warn("⚠️ Audio blocked:", err));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <Calculator className={styles.icon} /> Quick Math!
      </h2>

      <div className={styles.problem}>
        <p className={styles.question}>
          {question.num1} {question.operation} {question.num2} = ?
        </p>

        <input
          type="number"
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Your answer"
        />
        <button className={styles.submitBtn} onClick={handleSubmit}>
          Check
        </button>
      </div>

      <div className={styles.feedback}>
        {feedback === "correct" && (
          <div className={`${styles.feedbackMsg} ${styles.correct}`}>
            <CheckCircle2 size={20} /> Correct!
          </div>
        )}
        {feedback === "wrong" && (
          <div className={`${styles.feedbackMsg} ${styles.wrong}`}>
            <XCircle size={20} /> Try again!
          </div>
        )}
      </div>

      <div className={styles.score}>Score: {score}</div>
    </div>
  );
};

export default IntermediateMathActivity;
