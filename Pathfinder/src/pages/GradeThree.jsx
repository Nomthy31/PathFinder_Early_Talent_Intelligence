// src/components/activities/GradeThree.jsx
import React, { useState } from "react";
import GradeThreeActivities from "./GradeThreeActivities";
import CategorySelect from "../common/CategorySelect";

const GradeThree = ({ studentId }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      {!selectedCategory ? (
        <CategorySelect onSelect={setSelectedCategory} />
      ) : (
        <div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-4 px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            ← Back to Categories
          </button>

          <GradeThreeActivities
            studentId={studentId}
            selectedCategory={selectedCategory}
          />
        </div>
      )}
    </div>
  );
};

export default GradeThree;
