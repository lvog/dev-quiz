import { state } from "@js/state";
import { eventBus } from "@js/utils/eventBus";
import { quizResultsStorage } from "@js/utils/quizResultsStorage";

class QuizEngine {
  constructor(selector) {
    this.holder = document.querySelector(selector);
  }

  listen() {
    eventBus.on("quiz:finished", ({ results, time }) => {
      this.getSummary(results);
    });
  }

  saveAnswer(value) {
    state.answers.push(value);
  }

  getSummary(results) {
    const total = results.length;
    const correct = results.filter((r) => r.isCorrect).length;
    const quizId = state.currentQuizId;

    if (quizId) {
      quizResultsStorage.saveResult(quizId, {
        correct,
        total,
      });
    }
  }

  getResults() {
    return state.questions.map((question) => {
      const userAnswer = state.answers.find(
        (answer) => answer.questionId === question.id,
      );

      const correctAnswer = question.answers.find((answer) => answer.isCorrect);

      const selectedAnswer = question.answers.find(
        (answer) => answer.id === userAnswer?.answerId,
      );

      const isCorrect = selectedAnswer?.id === correctAnswer?.id;

      return {
        question: question.text,
        explanation: question.explanation,
        userAnswer: selectedAnswer?.text || "No answer",
        correctAnswer: correctAnswer?.text,
        isCorrect,
      };
    });
  }
}

export const quizEngine = new QuizEngine(".quiz");
