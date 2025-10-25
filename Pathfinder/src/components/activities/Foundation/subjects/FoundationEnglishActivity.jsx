import React, { useState, useEffect } from "react";
import { Volume2, Smile, BookOpen } from "lucide-react";
import styles from "./FoundationEnglishActivity.module.css";

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

  // ✅ Load voices when ready
  const [voicesReady, setVoicesReady] = useState(false);
  useEffect(() => {
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      if (synth.getVoices().length > 0) {
        setVoicesReady(true);
      } else {
        synth.onvoiceschanged = () => setVoicesReady(true);
      }
    }
  }, []);

  // 🔊 Function to play sound
  const playSound = () => {
    const audio = new Audio(currentLetter.sound);
    audio
      .play()
      .then(() => console.log("Sound played"))
      .catch((err) => console.warn("Playback blocked:", err));

    // 👄 Speak the word too
    speak(`${currentLetter.letter} for ${currentLetter.word}`);
  };

  // 🗣️ Speak helper
  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 0.9;
    utterance.rate = 0.8;
    utterance.volume = 1;
    utterance.voice = voices.find((v) => v.lang.startsWith("en")) || null;

    synth.cancel(); // stop previous speech
    synth.speak(utterance);
  };

  const handleSubmit = () => {
    if (input.toUpperCase() === currentLetter.letter) {
      setFeedback("correct");
      setScore(score + 1);
      speak("Great job!");
      setTimeout(() => nextLetter(), 1200);
    } else {
      setFeedback("wrong");
      speak("Oops! Try again!");
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
        {feedback === "correct" && (
          <div className={styles.correct}>🌟 Great Job!</div>
        )}
        {feedback === "wrong" && (
          <div className={styles.wrong}>❌ Try Again!</div>
        )}
      </div>

      <div className={styles.scoreboard}>
        <Smile size={20} /> Score: {score}
      </div>
    </div>
  );
};

export default FoundationEnglishActivity;
