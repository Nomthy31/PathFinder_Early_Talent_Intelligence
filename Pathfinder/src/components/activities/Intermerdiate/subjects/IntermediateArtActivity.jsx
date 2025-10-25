import React, { useState } from "react";
import { Paintbrush, CheckCircle2, XCircle } from "lucide-react";
import styles from "./IntermediateArtActivity.module.css";

const questions = [
  { question: "What colors make green?", options: ["Red + Blue", "Blue + Yellow", "Red + Yellow"], answer: "Blue + Yellow" },
  { question: "Which of these is a warm color?", options: ["Blue", "Red", "Green"], answer: "Red" },
  { question: "Which color is opposite of blue on the color wheel?", options: ["Yellow", "Orange", "Orange-red"], answer: "Orange" },
  { question: "What do we call a light version of a color?", options: ["Tint", "Shade", "Tone"], answer: "Tint" },
];

const IntermediateArtActivity = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  const handleSelect = (option) => {
    setSelected(option);
    if (option === questions[index].answer) {
      setFeedback("correct");
      setScore(score + 1);
      playSound("success");
      setTimeout(() => nextQuestion(), 1000);
    } else {
      setFeedback("wrong");
      playSound("error");
    }
  };

  const nextQuestion = () => {
    setFeedback("");
    setSelected("");
    if (index < questions.length - 1) setIndex(index + 1);
    else setIndex(0);
  };

  const playSound = (type) => {
    const url =
      type === "success"
        ? "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
        : "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg";

    const audio = new Audio(url);
    audio.currentTime = 0;
    audio.volume = 0.7;
    audio.play().catch((err) => console.warn("⚠️ Audio playback blocked:", err));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <Paintbrush className={styles.icon} /> Art & Color Quiz
      </h2>

      <p className={styles.question}>{questions[index].question}</p>

      <div className={styles.options}>
        {questions[index].options.map((option) => (
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
    </div>
  );
};

export default IntermediateArtActivity;
