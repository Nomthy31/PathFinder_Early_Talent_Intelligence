import React, { useState } from "react";
import GradeThreeActivities from "./components/activities/GradeThreeActivities";
import "./App.css";

const categories = ["Hospitality", "Tech", "Agriculture", "Engineering", "Health Science"];

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [studentId, setStudentId] = useState("student123"); // Example ID; replace with auth later

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>PathFinder — Grade 3 Learning</h1>
      </header>

      {!selectedCategory ? (
        <div className="category-selection">
          <h2>Select a Category</h2>
          <div className="category-grid">
            {categories.map((category) => (
              <button
                key={category}
                className="category-btn"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <button
            className="back-btn"
            onClick={() => setSelectedCategory(null)}
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
}

export default App;
