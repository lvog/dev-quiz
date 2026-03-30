export const mapData = (quizData) => {
  return quizData.data.map((quiz) => {
    const { id, text, type, difficulty, explanation, answers } = quiz;
    return {
      id,
      text,
      type,
      difficulty,
      explanation,
      answers,
    };
  });
};
