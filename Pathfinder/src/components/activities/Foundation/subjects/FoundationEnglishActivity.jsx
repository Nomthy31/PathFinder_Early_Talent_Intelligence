import React, { useState, useEffect } from "react";
import { Volume2, Smile, BookOpen } from "lucide-react";
import styles from "./FoundationEnglishActivity.module.css";
import { supabase } from "../../../../lib/supabaseClient"; // adjust path if needed

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

const FoundationEnglishActivity = ({ grade = "Foundation" }) => {
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Tracking for Supabase
  const [userStats, setUserStats] = useState([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [retries, setRetries] = useState(0);

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

  // 🔊 Play letter sound + TTS
  const playSound = () => {
    const audio = new Audio(currentLetter.sound);
    audio
      .play()
      .then(() => console.log("Sound played"))
      .catch((err) => console.warn("Playback blocked:", err));

    speak(`${currentLetter.letter} for ${currentLetter.word}`);
  };

  // 🗣️ Text-to-speech helper
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
    synth.cancel();
    synth.speak(utterance);
  };

  const handleSubmit = () => {
    const timeSpent = Date.now() - questionStartTime;
    const correct = input.toUpperCase() === currentLetter.letter;

    // Record attempt with linguistic flag
    setUserStats((prev) => [
      ...prev,
      {
        subject: "English",
        grade,
        timeSpent,
        retries,
        usedDrawing: false,
        usedVisual: true,
        usedLinguistic: true, // ✅ track English specifically
        correct,
      },
    ]);

    if (correct) {
      setFeedback("correct");
      setScore(score + 1);
      speak("Great job!");
      if (current === letters.length - 1) {
        setTimeout(() => setCompleted(true), 1000);
      } else {
        setTimeout(() => nextLetter(), 1200);
      }
    } else {
      setFeedback("wrong");
      setRetries(retries + 1);
      speak("Oops! Try again!");
    }
  };

  const nextLetter = () => {
    const next = (current + 1) % letters.length;
    setCurrent(next);
    setFeedback("");
    setInput("");
    setQuestionStartTime(Date.now());
  };

  // ✅ Auto-save stats when activity completes
  useEffect(() => {
    if (!completed || userStats.length === 0) return;

    const avgTime =
      userStats.reduce((acc, q) => acc + q.timeSpent, 0) / userStats.length;
    const avgAccuracy =
      (userStats.filter((q) => q.correct).length / userStats.length) * 100;
    const avgRetries =
      userStats.reduce((acc, q) => acc + q.retries, 0) / userStats.length;
    const percentDrawing =
      (userStats.filter((q) => q.usedDrawing).length / userStats.length) * 100;
    const percentVisual =
      (userStats.filter((q) => q.usedVisual).length / userStats.length) * 100;
    const percentLinguistic =
      (userStats.filter((q) => q.usedLinguistic && q.correct).length /
        userStats.length) *
        100 || 0;

    const stats = {
      student_id: "mock-student-001", // replace with logged-in user ID
      subject: "English",
      grade,
      avg_time: avgTime,
      avg_accuracy: avgAccuracy,
      avg_retries: avgRetries,
      percent_drawing: percentDrawing,
      percent_visual: percentVisual,
      percent_linguistic: percentLinguistic,
      created_at: new Date().toISOString(),
    };

    supabase
      .from("student_activity_stats")
      .insert([stats])
      .then(({ error }) => {
        if (error) console.error("❌ Error saving English stats:", error);
        else console.log("✅ English stats saved to Supabase");
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
