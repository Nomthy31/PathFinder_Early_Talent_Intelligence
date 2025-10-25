// src/hooks/useActivityTracker.js
import { useState, useEffect } from "react";

export default function useActivityTracker(subject) {
  const [userStats, setUserStats] = useState([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [subject]); // reset when new subject starts

  const recordAnswer = (isCorrect, usedVisual = false, usedDrawing = false) => {
    const timeSpent = Date.now() - questionStartTime;

    setUserStats((prev) => [
      ...prev,
      {
        timeSpent,
        retries,
        usedVisual,
        usedDrawing,
        correct: isCorrect,
      },
    ]);

    if (!isCorrect) setRetries((r) => r + 1);
    else setRetries(0);
  };

  const calculateMetrics = () => {
    const data = userStats;
    const avg = (sum) => (data.length ? sum / data.length : 0);

    const averageTime = avg(data.reduce((a, q) => a + q.timeSpent, 0));
    const averageRetries = avg(data.reduce((a, q) => a + q.retries, 0));
    const averageAccuracy =
      (data.filter((q) => q.correct).length / data.length) * 100 || 0;
    const usesDrawingRatio =
      data.filter((q) => q.usedDrawing).length / data.length || 0;
    const percentVisual =
      (data.filter((q) => q.usedVisual && q.correct).length / data.length) *
        100 || 0;

    return {
      avg_time: averageTime,
      percent_visual: percentVisual,
      percent_numeric: 100 - percentVisual,
      percent_drawing: usesDrawingRatio * 100,
      avg_retries: averageRetries,
      avg_accuracy: averageAccuracy,
      uses_drawing_ratio: usesDrawingRatio,
    };
  };

  return { userStats, recordAnswer, calculateMetrics };
}
