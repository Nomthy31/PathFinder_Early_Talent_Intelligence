import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import {
  Smile,
  Frown,
  Star,
  Square,
  Circle,
  Triangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./FoundationActivities.module.css";

// ✅ Import subject-specific activities
import FoundationMathActivity from "./subjects/FoundationMathActivity";
import FoundationEnglishActivity from "./subjects/FoundationEnglishActivity";
import FoundationArtActivity from "./subjects/FoundationArtActivity";

// ✅ Supabase client
import { supabase } from "../../../lib/supabaseClient";

const FoundationActivities = ({ subject, grade, onBack }) => {
  // States
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState("neutral");
  const [completed, setCompleted] = useState(false);
  const [shapes, setShapes] = useState([
    { id: "circle", label: "Circle", color: "#60a5fa", icon: <Circle /> },
    { id: "square", label: "Square", color: "#f87171", icon: <Square /> },
    { id: "triangle", label: "Triangle", color: "#fbbf24", icon: <Triangle /> },
  ]);
  const [slots] = useState(["circle", "square", "triangle"]);

  // 🎯 Tracking metrics
  const [userStats, setUserStats] = useState([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [retries, setRetries] = useState(0);

  // 🔊 Play sounds
  const playSound = (type) => {
    const url =
      type === "success"
        ? "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
        : "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg";
    const audio = new Audio(url);
    audio.volume = 0.7;
    audio.play().catch((err) => console.warn("Audio blocked:", err));
  };

  // 🎤 Voice feedback
  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.pitch = 1.1;
      utterance.rate = 0.9;
      utterance.volume = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  // 🎨 Drag & drop shape matching
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { destination, draggableId } = result;
    const timeSpent = Date.now() - questionStartTime;
    const correct = destination.droppableId === draggableId;

    // Update stats
    setUserStats((prev) => [
      ...prev,
      {
        subject,
        grade,
        timeSpent,
        retries,
        usedDrawing: true, // shape matching counts as drawing
        usedVisual: true, // visual interaction
        correct,
      },
    ]);

    if (!correct) {
      setRetries(retries + 1);
      setFeedback("wrong");
      playSound("error");
      speak("Oops! Try again!");
      return;
    }

    setFeedback("correct");
    playSound("success");
    speak("Great job!");
    setShowConfetti(true);

    setShapes((prev) => prev.filter((s) => s.id !== draggableId));

    if (shapes.length === 1) {
      setTimeout(() => setCompleted(true), 400);
      speak("You matched all the shapes! Well done!");
    }

    setTimeout(() => setShowConfetti(false), 2000);
    setRetries(0);
    setQuestionStartTime(Date.now());
  };

  // 📝 Compute and send stats to Supabase when completed
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
      student_id: "mock-student-001", // replace with logged-in user ID
      subject,
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
        if (error) console.error("Failed to save stats:", error);
        else console.log("Saved stats successfully!");
      });
  }, [completed, userStats, subject, grade]);

  // ✅ Render subject-specific activity
  const renderActivity = () => {
    switch (subject.toLowerCase()) {
      case "mathematics":
        return <FoundationMathActivity grade={grade} />;
      case "english":
        return <FoundationEnglishActivity grade={grade} />;
      case "art":
        return <FoundationArtActivity grade={grade} />;
      default:
        return <p>No activity found for this subject.</p>;
    }
  };

  return (
    <div className={styles.foundationContainer}>
      {showConfetti && <Confetti />}
      <button className={styles.backButton} onClick={onBack}>
        ← Back
      </button>

      <h2 className={styles.activityTitle}>{subject}</h2>
      <p className={styles.gradeInfo}>Grade {grade} | Foundation Phase</p>

      <AnimatedMascot feedback={feedback} />

      <div className={styles.activitiesWrapper}>
        {/* Left: Shape Matching Game */}
        <div className={styles.shapeSection}>
          <h3 className={styles.subTitle}>Shape Matching Game</h3>
          <p className={styles.instructions}>
            Drag the shapes into the correct outlines!
          </p>

          <DragDropContext onDragEnd={handleDragEnd}>
            <div className={styles.shapeBoard}>
              <Droppable droppableId="shapes" direction="horizontal">
                {(provided) => (
                  <div
                    className={styles.shapeRow}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {shapes.map((shape, index) => (
                      <Draggable key={shape.id} draggableId={shape.id} index={index}>
                        {(provided) => (
                          <motion.div
                            className={styles.shapeItem}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              backgroundColor: shape.color,
                              ...provided.draggableProps.style,
                            }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {shape.icon}
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <div className={styles.slotsRow}>
                {slots.map((slot) => (
                  <Droppable droppableId={slot} key={slot}>
                    {(provided) => (
                      <div
                        className={styles.shapeSlot}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {slot === "circle" && <Circle color="#60a5fa" size={70} />}
                        {slot === "square" && <Square color="#f87171" size={70} />}
                        {slot === "triangle" && <Triangle color="#fbbf24" size={70} />}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </div>
          </DragDropContext>
        </div>

        {/* Right: Subject Activity */}
        <div className={styles.subjectSection}>{renderActivity()}</div>
      </div>

      {completed && (
        <motion.div
          className={styles.congrats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Star size={70} color="#facc15" />
          <p>Excellent work!</p>
        </motion.div>
      )}
    </div>
  );
};

// Mascot Component
const AnimatedMascot = ({ feedback }) => {
  const variants = {
    neutral: { scale: 1 },
    correct: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.8 },
    },
    wrong: {
      scale: [1, 0.9, 1],
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div className={styles.mascot} variants={variants} animate={feedback}>
      <AnimatePresence mode="wait">
        {feedback === "correct" && <Smile size={80} color="#10b981" key="happy" />}
        {feedback === "wrong" && <Frown size={80} color="#ef4444" key="sad" />}
        {feedback === "neutral" && <Smile size={80} color="#3b82f6" key="neutral" />}
      </AnimatePresence>
    </motion.div>
  );
};

export default FoundationActivities;
