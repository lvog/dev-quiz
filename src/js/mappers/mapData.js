const mapListData = (data) => {
  return data.map((quiz) => {
    const { id, title, description, difficulty } = quiz;
    return {
      id,
      title,
      description,
      difficulty,
    };
  });
};

const mapQuizData = (data) => {
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

export const mapData = (quizData, mode) => {
  const data = quizData.data;
  return mode === "list" ? mapListData(data) : mapQuizData(data);
};
