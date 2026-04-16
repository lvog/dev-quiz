export const mapData = (quizData) => {
  const data = quizData.data;
  return data.map((quiz) => {
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
