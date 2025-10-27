// src/components/common/CategorySelect.jsx
import React from "react";
import { Star } from "lucide-react";
import styles from "./CategorySelect.module.css";

const categories = [
  { id: "Hospitality", label: "Hospitality" },
  { id: "Tech", label: "Tech" },
  { id: "Agriculture", label: "Agriculture" },
  { id: "Engineering", label: "Engineering" },
  { id: "Health Science", label: "Health Science" },
];

const CategorySelect = ({ onSelect }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Choose a Category</h2>
      <div className={styles.grid}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={styles.categoryBtn}
            onClick={() => onSelect(cat.id)}
          >
            <Star size={24} className="mr-2" />
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelect;
