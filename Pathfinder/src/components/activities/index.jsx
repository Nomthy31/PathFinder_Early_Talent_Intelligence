import React from "react";
import FoundationActivities from "./Foundation/FoundationActivities";
import IntermediateActivities from  "./Intermerdiate/IntermediateActivities";
import SeniorActivities from "./Senior/SeniorActivities";
import { getPhaseByGrade } from "../../utils/phaseUtils";

const Activities = ({ subject, grade, onBack }) => {
  const phase = getPhaseByGrade(grade);

  switch (phase) {
    case "foundation":
      return (
        <FoundationActivities subject={subject} grade={grade} onBack={onBack} />
      );

    case "intermediate":
      return (
        <IntermediateActivities subject={subject} grade={grade} onBack={onBack} />
      );

    case "senior":
      return (
        <SeniorActivities subject={subject} grade={grade} onBack={onBack} />
      );

    default:
      return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>Invalid grade or missing phase data</h2>
          <button
            onClick={onBack}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "10px",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            Go Back
          </button>
        </div>
      );
  }
};

export default Activities;
