import React, { useState } from "react";
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

const FoundationActivities = ({ subject, grade, onBack }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState("neutral");
  const [completed, setCompleted] = useState(false);
  const [shapes, setShapes] = useState([
    { id: "circle", label: "Circle", color: "#60a5fa", icon: <Circle /> },
    { id: "square", label: "Square", color: "#f87171", icon: <Square /> },
    { id: "triangle", label: "Triangle", color: "#fbbf24", icon: <Triangle /> },
  ]);
  const [slots] = useState(["circle", "square", "triangle"]);

  // ✅ Play fun success/error sounds
  const playSound = (type) => {
    const url =
      type === "success"
        ? "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
        : "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg";
    const audio = new Audio(url);
    audio.volume = 0.7;
    audio.play().catch((err) => console.warn("Audio blocked:", err));
  };

  // 🧠 Choose subject activity
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

  // 🔊 Voice feedback
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
    const { destination } = result;

    if (destination.droppableId === result.draggableId) {
      setFeedback("correct");
      playSound("success");
      speak("Great job!");
      setShowConfetti(true);
      setShapes((prev) => prev.filter((s) => s.id !== result.draggableId));

      if (shapes.length === 1) {
        setTimeout(() => setCompleted(true), 400);
        speak("You matched all the shapes! Well done!");
      }

      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      setFeedback("wrong");
      playSound("error");
      speak("Oops! Try again!");
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
        {/* 🎮 Left: Shape Matching Game */}
        <div className={styles.shapeSection}>
          <h3 className={styles.subTitle}>Shape Matching Game</h3>
          <p className={styles.instructions}>Drag the shapes into the correct outlines!</p>

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

        {/* 📘 Right: Subject-Specific Activity */}
        <div className={styles.subjectSection}>{renderActivity()}</div>
      </div>

      {completed && (
        <motion.div
          className={styles.congrats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Star size={70} color="#facc15" />
          <p>Excellent work! 🎉</p>
        </motion.div>
      )}
    </div>
  );
};

// 🧸 Mascot Component
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
        {feedback === "correct" && (
          <Smile size={80} color="#10b981" key="happy" />
        )}
        {feedback === "wrong" && <Frown size={80} color="#ef4444" key="sad" />}
        {feedback === "neutral" && (
          <Smile size={80} color="#3b82f6" key="neutral" />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FoundationActivities;
