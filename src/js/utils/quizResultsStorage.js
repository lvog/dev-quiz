const STORAGE_KEY = "quiz_results";

export const quizResultsStorage = {
  getResults() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  },

  saveResult(quizId, result) {
    const results = this.getResults();

    results[quizId] = result;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  },
};
