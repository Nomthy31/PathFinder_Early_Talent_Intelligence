import React, { useState } from "react";
import { Palette, CheckCircle2, XCircle } from "lucide-react";
import styles from "./SeniorArtActivity.module.css";

const artQuestions = [
  {
    question: "Which of the following is a principle of design?",
    options: ["Harmony", "Color", "Texture"],
    answer: "Harmony",
  },
  {
    question: "What emotion does the color red often represent?",
    options: ["Calm", "Anger", "Sadness"],
    answer: "Anger",
  },
  {
    question: "Which element of art is about the lightness or darkness of a color?",
    options: ["Value", "Form", "Space"],
    answer: "Value",
  },
  {
    question: "Which artist is known for painting the Mona Lisa?",
    options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh"],
    answer: "Leonardo da Vinci",
  },
];

const SeniorArtActivity = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  const handleSelect = (option) => {
    setSelected(option);
    if (option === artQuestions[index].answer) {
      setFeedback("correct");
      setScore(score + 1);
      setTimeout(() => nextQuestion(), 1000);
    } else {
      setFeedback("wrong");
    }
  };

  const nextQuestion = () => {
    setSelected("");
    setFeedback("");
    setIndex((index + 1) % artQuestions.length);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <Palette className={styles.icon} size={36} /> Art & Design Mastery
      </h2>

      <p className={styles.question}>{artQuestions[index].question}</p>

      <div className={styles.options}>
        {artQuestions[index].options.map((option) => (
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
    </div>
  );
};

export default SeniorArtActivity;
