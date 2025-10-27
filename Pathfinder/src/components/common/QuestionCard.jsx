import React from "react";
import { motion } from "framer-motion";
import styles from "./QuestionCard.module.css";

const QuestionCard = ({
  question,
  options,
  selectedAnswer,
  onSelect,
  disabled,
  feedback,
}) => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className={styles.questionText}>{question}</h3>

      <div className={styles.options}>
        {options.map((option, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${styles.optionBtn} ${
              selectedAnswer === option
                ? feedback === "correct"
                  ? styles.correct
                  : styles.wrong
                : ""
            }`}
            onClick={() => onSelect(option)}
            disabled={disabled}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionCard;
