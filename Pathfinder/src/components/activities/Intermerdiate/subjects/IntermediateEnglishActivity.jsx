import React, { useState } from "react";
import { BookOpen, CheckCircle2, XCircle } from "lucide-react";
import styles from "./IntermediateEnglishActivity.module.css";

const words = [
  { question: "Select the correct spelling:", options: ["beutiful", "beautiful", "beatiful"], answer: "beautiful" },
  { question: "Which word is a noun?", options: ["run", "dog", "quickly"], answer: "dog" },
  { question: "Choose the synonym of 'happy':", options: ["sad", "joyful", "angry"], answer: "joyful" },
  { question: "Which word is an adjective?", options: ["bright", "run", "slowly"], answer: "bright" },
  { question: "Choose the correct article: ___ apple", options: ["a", "an", "the"], answer: "an" },
];

const IntermediateEnglishActivity = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  const handleSelect = (option) => {
    setSelected(option);
    if (option === words[index].answer) {
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
    if (index < words.length - 1) setIndex(index + 1);
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
        <BookOpen className={styles.icon} /> English Challenge
      </h2>

      <p className={styles.question}>{words[index].question}</p>

      <div className={styles.options}>
        {words[index].options.map((option) => (
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

export default IntermediateEnglishActivity;
