import React, { useState } from "react";
import { Calculator, CheckCircle2, XCircle } from "lucide-react";
import styles from "./FoundationMathActivity.module.css"; // ✅ fixed import spacing

// Function to generate random math questions
const generateQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operations = ["+", "-"];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  const answer = operation === "+" ? num1 + num2 : num1 - num2;
  return { num1, num2, operation, answer };
};

const FoundationMathActivity = () => {
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
    const audio = new Audio(
      type === "success"
        ? "https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3"
        : "https://assets.mixkit.co/sfx/preview/mixkit-funny-fail-low-tone-2876.mp3"
    );

    audio
      .play()
      .then(() => console.log(`${type} sound played`))
      .catch((err) => console.warn("Playback issue:", err));
  };

  return (
    <div className={styles.foundationMath}>
      <h2>
        <Calculator className={styles.icon} /> Quick Math!
      </h2>

      <div className={styles.problem}>
        <p className={styles.question}>
          {question.num1} {question.operation} {question.num2} = ?
        </p>

        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Your answer"
        />
        <button onClick={handleSubmit}>Check</button>
      </div>

      <div className={styles.feedback}>
        {feedback === "correct" && (
          <div className={styles.correct}>
            <CheckCircle2 size={20} /> Correct!
          </div>
        )}
        {feedback === "wrong" && (
          <div className={styles.wrong}>
            <XCircle size={20} /> Try again
          </div>
        )}
      </div>

      <div className={styles.scoreboard}>Score: {score}</div>
    </div>
  );
};

export default FoundationMathActivity;
