import React, { useState } from "react";
import { Volume2, Smile, BookOpen } from "lucide-react";
import styles from "./FoundationEnglishActivity.module.css"; // ✅ fixed import

const letters = [
  {
    letter: "A",
    word: "Apple",
    sound: "https://assets.mixkit.co/sfx/preview/mixkit-interface-click-1126.mp3",
  },
  {
    letter: "B",
    word: "Ball",
    sound: "https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3",
  },
  {
    letter: "C",
    word: "Cat",
    sound: "https://assets.mixkit.co/sfx/preview/mixkit-funny-fail-low-tone-2876.mp3",
  },
];

const FoundationEnglishActivity = () => {
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);

  const currentLetter = letters[current];

  const playSound = () => {
    const audio = new Audio(currentLetter.sound);
    audio
      .play()
      .then(() => console.log("Sound played"))
      .catch((err) => console.warn("Playback blocked:", err));
  };

  const handleSubmit = () => {
    if (input.toUpperCase() === currentLetter.letter) {
      setFeedback("correct");
      setScore(score + 1);
      setTimeout(() => nextLetter(), 1000);
    } else {
      setFeedback("wrong");
    }
  };

  const nextLetter = () => {
    const next = (current + 1) % letters.length;
    setCurrent(next);
    setFeedback("");
    setInput("");
  };

  return (
    <div className={styles.englishActivity}>
      <h2>
        <BookOpen className={styles.icon} /> Learn Letters!
      </h2>

      <div className={styles.letterCard}>
        <div className={styles.letter}>{currentLetter.letter}</div>
        <p className={styles.word}>for {currentLetter.word}</p>
        <button className={styles.soundBtn} onClick={playSound}>
          <Volume2 size={20} /> Hear Sound
        </button>
      </div>

      <div className={styles.question}>
        <p>Type the letter you see:</p>
        <input
          type="text"
          maxLength={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSubmit}>Check</button>
      </div>

      <div className={styles.feedback}>
        {feedback === "correct" && <div className={styles.correct}>🌟 Great Job!</div>}
        {feedback === "wrong" && <div className={styles.wrong}>❌ Try Again!</div>}
      </div>

      <div className={styles.scoreboard}>
        <Smile size={20} /> Score: {score}
      </div>
    </div>
  );
};

export default FoundationEnglishActivity;
