import React, { useState } from "react";
import { Palette, CheckCircle, XCircle } from "lucide-react";
import styles from "./FoundationArtActivity.module.css"; // ✅ fixed syntax

const colors = ["red", "blue", "yellow", "green", "purple"];

const ArtsActivity = () => {
  const [targetColor, setTargetColor] = useState(randomColor());
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  function randomColor() {
    const colorOptions = ["red", "blue", "yellow", "green", "purple"];
    return colorOptions[Math.floor(Math.random() * colorOptions.length)];
  }

  const handleColorClick = (color) => {
    if (color === targetColor) {
      setFeedback("correct");
      setScore(score + 1);
      playSound("success");
      setTimeout(() => {
        setTargetColor(randomColor());
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
        : "https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3"
    );
    audio
      .play()
      .then(() => console.log(`${type} sound played`))
      .catch((err) => console.log("Audio playback blocked:", err));
  };

  return (
    <div className={styles.artsActivity}>
      <h2>
        <Palette className={styles.icon} /> Color Match!
      </h2>

      <p className={styles.instruction}>
        Tap the color that matches <strong>{targetColor.toUpperCase()}</strong>
      </p>

      <div className={styles.colorGrid}>
        {colors.map((color) => (
          <button
            key={color}
            className={styles.colorBtn}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
          />
        ))}
      </div>

      <div className={styles.feedback}>
        {feedback === "correct" && (
          <div className={styles.correct}>
            <CheckCircle size={20} /> Well done!
          </div>
        )}
        {feedback === "wrong" && (
          <div className={styles.wrong}>
            <XCircle size={20} /> Try again!
          </div>
        )}
      </div>

      <div className={styles.scoreboard}>Score: {score}</div>
    </div>
  );
};

export default ArtsActivity;
