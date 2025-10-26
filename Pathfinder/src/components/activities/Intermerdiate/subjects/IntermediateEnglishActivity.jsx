import React, { useState, useEffect } from "react";
import { BookOpen, CheckCircle2, XCircle } from "lucide-react";
import styles from "./IntermediateEnglishActivity.module.css";
import { supabase } from "../../../../lib/supabaseClient"; // ✅ make sure this path matches your structure

const words = [
  { question: "Select the correct spelling:", options: ["beutiful", "beautiful", "beatiful"], answer: "beautiful" },
  { question: "Which word is a noun?", options: ["run", "dog", "quickly"], answer: "dog" },
  { question: "Choose the synonym of 'happy':", options: ["sad", "joyful", "angry"], answer: "joyful" },
  { question: "Which word is an adjective?", options: ["bright", "run", "slowly"], answer: "bright" },
  { question: "Choose the correct article: ___ apple", options: ["a", "an", "the"], answer: "an" },
];

const IntermediateEnglishActivity = ({ grade = "Intermediate" }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  // 🎯 tracking stats
  const [userStats, setUserStats] = useState([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [retries, setRetries] = useState(0);

  const handleSelect = (option) => {
    setSelected(option);
    const timeSpent = Date.now() - questionStartTime;
    const correct = option === words[index].answer;

    // record individual question stats
    setUserStats((prev) => [
      ...prev,
      {
        subject: "English",
        grade,
        timeSpent,
        retries,
        usedDrawing: false,
        usedVisual: true,
        correct,
      },
    ]);

    if (correct) {
      setFeedback("correct");
      setScore(score + 1);
      playSound("success");

      if (index === words.length - 1) {
        setTimeout(() => setCompleted(true), 1000);
      } else {
        setTimeout(() => nextQuestion(), 1000);
      }
    } else {
      setFeedback("wrong");
      setRetries(retries + 1);
      playSound("error");
    }
  };

  const nextQuestion = () => {
    setFeedback("");
    setSelected("");
    setIndex((prev) => (prev < words.length - 1 ? prev + 1 : prev));
    setQuestionStartTime(Date.now());
  };

  // 🔊 sound function (unchanged)
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

  // ✅ Send stats to Supabase after completion
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

    const stats = {
      student_id: "mock-student-001", // ✅ replace with logged-in user ID later
      subject: "English",
      grade,
      avg_time: avgTime,
      avg_accuracy: avgAccuracy,
      avg_retries: avgRetries,
      percent_drawing: percentDrawing,
      percent_visual: percentVisual,
      created_at: new Date().toISOString(),
    };

    supabase
      .from("student_activity_stats")
      .insert([stats])
      .then(({ error }) => {
        if (error) console.error("❌ Failed to save English stats:", error);
        else console.log("✅ English stats saved successfully!");
      });
  }, [completed]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <BookOpen className={styles.icon} /> English Challenge
      </h2>

      {!completed ? (
        <>
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
        </>
      ) : (
        <div className={styles.completionScreen}>
          <CheckCircle2 className={styles.bigIcon} size={60} color="green" />
          <h3>Excellent work!</h3>
          <p>
            You scored <strong>{score}</strong> out of {words.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default IntermediateEnglishActivity;
