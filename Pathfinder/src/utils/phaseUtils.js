export const getPhaseByGrade = (grade) => {
  if (grade >= 1 && grade <= 3) return "foundation";
  if (grade >= 4 && grade <= 6) return "intermediate";
  if (grade >= 7 && grade <= 9) return "senior";
  return null;
};
