import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Confetti from "react-confetti";
import Feedback from "../common/Feedback"; // imported
import styles from "./../../styles/GradeThreeActivities.module.css";

// ---------------- Supabase Setup ----------------
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ------------------ Utility ------------------
const shuffleArray = (arr) => [...arr].sort(() => 0.5 - Math.random());

// ------------------ Activity Data ------------------
export const activitiesData = {
  Hospitality: [
    { question: "Which item do we use to clean our hands before eating?", options: ["Soap", "Book", "Spoon", "Napkin"], correct: "Soap", skill: "Health" },
    { question: "You are setting a table. What goes next to the plate on the right?", options: ["Fork", "Spoon", "Cup", "Napkin"], correct: "Spoon", skill: "Analytical" },
    { question: "When a friend drops their food, what should you do?", options: ["Laugh at them", "Help them clean up", "Ignore it", "Call the teacher"], correct: "Help them clean up", skill: "Social" },
    { question: "Which food is the healthiest choice for lunch?", options: ["Fried chips", "Apple and sandwich", "Candy", "Cake"], correct: "Apple and sandwich", skill: "Health" },
  ],
  Tech: [
    { question: "Which of these is a computer device?", options: ["Tablet", "Spoon", "Pencil", "Cup"], correct: "Tablet", skill: "Technical" },
    { question: "If you see a pop-up asking for your password, what should you do?", options: ["Type it quickly", "Ignore it and tell an adult", "Send it to friends", "Click all buttons"], correct: "Ignore it and tell an adult", skill: "Analytical" },
    { question: "Arrange these in order: Turn on → Type → Save", options: ["Turn on", "Type", "Save"], correct: "Correct sequence", skill: "Technical" },
    { question: "Which symbol means power on a computer?", options: ["🔋", "⏻", "💡", "📶"], correct: "⏻", skill: "Analytical" },
  ],
  Agriculture: [
    { question: "Which of these helps plants grow?", options: ["Water", "Sand", "Plastic", "Paint"], correct: "Water", skill: "Analytical" },
    { question: "Where do cows live?", options: ["Farm", "Ocean", "Sky", "House"], correct: "Farm", skill: "Analytical" },
    { question: "What should we do with empty bottles?", options: ["Throw them anywhere", "Recycle or reuse them", "Hide them", "Burn them"], correct: "Recycle or reuse them", skill: "Social" },
    { question: "What color are healthy leaves?", options: ["Brown", "Green", "Black", "Yellow"], correct: "Green", skill: "Creative" },
  ],
  Engineering: [
    { question: "Which tool is used to tighten screws?", options: ["Hammer", "Screwdriver", "Brush", "Ruler"], correct: "Screwdriver", skill: "Technical" },
    { question: "What shape is the strongest for building bridges?", options: ["Triangle", "Circle", "Square", "Heart"], correct: "Triangle", skill: "Analytical" },
    { question: "If your toy car doesn’t move, what should you check first?", options: ["Batteries", "Color", "Name", "Price"], correct: "Batteries", skill: "Technical" },
    { question: "Which of these floats on water?", options: ["Stone", "Paper", "Brick", "Metal ball"], correct: "Paper", skill: "Analytical" },
  ],
  "Health Science": [
    { question: "How many times should you brush your teeth each day?", options: ["Once", "Twice", "Four times", "Never"], correct: "Twice", skill: "Health" },
    { question: "Which part of the body helps us see?", options: ["Hands", "Ears", "Eyes", "Nose"], correct: "Eyes", skill: "Health" },
    { question: "You have a cut on your finger. What should you do first?", options: ["Ignore it", "Wash it and cover it", "Show your friends", "Touch it often"], correct: "Wash it and cover it", skill: "Health" },
    { question: "Which of these helps you stay strong and healthy?", options: ["Sleeping well", "Skipping meals", "Not exercising", "Playing late"], correct: "Sleeping well", skill: "Health" },
  ],
};

// ------------------ Main Component ------------------
function GradeThreeActivities({ studentId, selectedCategory }) {
  const [activities, setActivities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [activityStats, setActivityStats] = useState([]);
  const [currentRetries, setCurrentRetries] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  useEffect(() => {
    if (selectedCategory) {
      setActivities(shuffleArray(activitiesData[selectedCategory]));
      setCurrentIndex(0);
      setScore(0);
      setCompleted(false);
      setActivityStats([]);
      setSelectedOption(null);
      setCurrentRetries(0);
      setQuestionStartTime(Date.now());
    }
  }, [selectedCategory]);

  const normalize = (str) => str.trim().toLowerCase();

  const handleAnswer = (option) => {
    const currentQuestion = activities[currentIndex];
    const isCorrect = normalize(option) === normalize(currentQuestion.correct);
    const timeSpent = Date.now() - questionStartTime;

    setSelectedOption(option);
    if (!isCorrect) setCurrentRetries((prev) => prev + 1);

    if (isCorrect) {
      const newStat = {
        question: currentQuestion.question,
        selectedOption: option,
        correct: isCorrect,
        timeSpent,
        retries: currentRetries,
        skill: currentQuestion.skill,
      };
      setActivityStats((prev) => [...prev, newStat]);
      setScore((prev) => prev + 1);

      setTimeout(() => {
        if (currentIndex + 1 < activities.length) {
          setCurrentIndex(currentIndex + 1);
          setSelectedOption(null);
          setCurrentRetries(0);
          setQuestionStartTime(Date.now());
        } else {
          setCompleted(true);
          sendStatsToSupabase([...activityStats, newStat]);
        }
      }, 800);
    }
  };

  const sendStatsToSupabase = async (stats) => {
    if (!studentId) return;
    const totalTime = stats.reduce((acc, q) => acc + q.timeSpent, 0);
    const avgTime = totalTime / stats.length;
    const avgAccuracy = (stats.filter((q) => q.correct).length / stats.length) * 100;
    const avgRetries = stats.reduce((acc, q) => acc + q.retries, 0) / stats.length;

    const skillCounts = stats.reduce((acc, q) => {
      acc[q.skill] = (acc[q.skill] || 0) + 1;
      return acc;
    }, {});

    await supabase.from("student_activity_stats").insert([
      {
        student_id: studentId,
        subject: selectedCategory,
        grade: 3,
        avg_time: avgTime,
        avg_accuracy: avgAccuracy,
        avg_retries: avgRetries,
        skill_distribution: skillCounts,
        total_questions: stats.length,
      },
    ]);
  };

  if (!selectedCategory) return <p className="text-center mt-4">Select a category to start learning.</p>;
  if (activities.length === 0) return <p className="text-center mt-4">Loading activities...</p>;

  const currentQuestion = activities[currentIndex];
  const progressPercent = (currentIndex / activities.length) * 100;

  return (
    <div className={styles.container}>
      {completed && <Confetti className={styles.confettiContainer} numberOfPieces={200} recycle={false} />}

      <div className={styles.header}>
        <h2>{selectedCategory} — Grade 3 Activity</h2>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progressPercent}%` }}></div>
      </div>

      {!completed ? (
        <>
          <div className={styles.questionCard}>
            <p className={styles.questionText}>{currentQuestion.question}</p>
            <div className={styles.optionsGrid}>
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`${styles.optionBtn} ${
                    selectedOption
                      ? normalize(option) === normalize(currentQuestion.correct)
                        ? styles.correct
                        : normalize(option) === normalize(selectedOption)
                        ? styles.wrong
                        : ""
                      : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback */}
          {selectedOption && normalize(selectedOption) === normalize(currentQuestion.correct) && (
            <Feedback type="correct" message="Correct! Well done 🎉" />
          )}
          {selectedOption && normalize(selectedOption) !== normalize(currentQuestion.correct) && (
            <Feedback type="wrong" message={`Try again! Attempts: ${currentRetries}`} />
          )}
        </>
      ) : (
        <div className={styles.completed}>
          <h3>🎉 {selectedCategory} Completed!</h3>
          <p>Score: {score} / {activities.length}</p>
          <button
            className={styles.retryButton}
            onClick={() => {
              setCurrentIndex(0);
              setCompleted(false);
              setScore(0);
              setActivityStats([]);
              setSelectedOption(null);
            }}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}

export default GradeThreeActivities;
