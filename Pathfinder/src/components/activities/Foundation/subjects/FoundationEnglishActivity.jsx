import React, { useState, useEffect } from "react";
import { Volume2, Smile, BookOpen } from "lucide-react";
import styles from "./FoundationEnglishActivity.module.css";
import { supabase } from "../../../../lib/supabaseClient";
import useActivityTracker from "../../../hooks/useActivityTracker";

const letters = [
  { letter: "A", word: "Apple", sound: "https://assets.mixkit.co/sfx/preview/mixkit-interface-click-1126.mp3" },
  { letter: "B", word: "Ball", sound: "https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3" },
  { letter: "C", word: "Cat", sound: "https://assets.mixkit.co/sfx/preview/mixkit-funny-fail-low-tone-2876.mp3" },
];

const FoundationEnglishActivity = ({ grade = "Foundation" }) => {
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  // ✅ Use the hook for tracking stats
  const { userStats, recordAnswer, calculateMetrics } = useActivityTracker("English");

  const currentLetter = letters[current];

  // Load voices for TTS
  const [voicesReady, setVoicesReady] = useState(false);
  useEffect(() => {
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      if (synth.getVoices().length > 0) setVoicesReady(true);
      else synth.onvoiceschanged = () => setVoicesReady(true);
    }
  }, []);

  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 0.9;
    utterance.rate = 0.8;
    utterance.voice = voices.find((v) => v.lang.startsWith("en")) || null;
    synth.cancel();
    synth.speak(utterance);
  };

  const playSound = () => {
    const audio = new Audio(currentLetter.sound);
    audio.play().catch((err) => console.warn("Playback blocked:", err));
    speak(`${currentLetter.letter} for ${currentLetter.word}`);
  };

  const handleSubmit = () => {
    const correct = input.toUpperCase() === currentLetter.letter;

    // Record stats using the hook
    recordAnswer(correct, true, false); // usedVisual = true, usedDrawing = false
    setFeedback(correct ? "correct" : "wrong");

    if (correct) setScore(score + 1);
    else setFeedback("wrong");

    if (current === letters.length - 1) setCompleted(true);
    else setTimeout(() => nextLetter(), 800);
  };

  const nextLetter = () => {
    setCurrent((prev) => (prev + 1) % letters.length);
    setFeedback("");
    setInput("");
  };

  // Save stats to Supabase on completion
  useEffect(() => {
    if (!completed) return;

    const metrics = calculateMetrics();
    const stats = {
      student_id: "mock-student-001",
      subject: "English",
      grade,
      ...metrics,
      created_at: new Date().toISOString(),
    };

    supabase
      .from("student_activity_stats")
      .insert([stats])
      .then(({ error }) => {
        if (error) console.error("❌ Error saving stats:", error);
        else console.log("✅ Stats saved!", stats);
      });
  }, [completed]);

  return (
    <div className={styles.englishActivity}>
      <h2>
        <BookOpen className={styles.icon} /> Learn Letters!
      </h2>

      {!completed ? (
        <>
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
        </>
      ) : (
        <div className={styles.complete}>
          <Smile size={40} color="green" />
          <h3>Well done!</h3>
          <p>
            You scored <strong>{score}</strong> out of {letters.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default FoundationEnglishActivity;
