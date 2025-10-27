import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import styles from "./Feedback.module.css";

const Feedback = ({ type, message }) => {
  if (!type) return null;

  return (
    <div
      className={`${styles.feedback} ${
        type === "correct" ? styles.correct : styles.wrong
      }`}
    >
      {type === "correct" ? <CheckCircle size={30} /> : <XCircle size={30} />}
      <p>{message}</p>
    </div>
  );
};

export default Feedback;
