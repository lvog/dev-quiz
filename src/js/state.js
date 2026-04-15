export const state = {
  currentQuizID: null,
  questions: [],
  answers: [],
  resetAnswers() {
    state.answers = [];
  },
};
