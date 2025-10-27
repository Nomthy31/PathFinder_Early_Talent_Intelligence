import React from "react";
import { ArrowLeftCircle } from "lucide-react";
import styles from "./BackButton.module.css";

const BackButton = ({ onClick, label = "Back" }) => {
  return (
    <button className={styles.backButton} onClick={onClick}>
      <ArrowLeftCircle size={20} />
      {label}
    </button>
  );
};

export default BackButton;
