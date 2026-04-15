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

      // console.log("userAnswer", userAnswer);

      const correctAnswer = question.answers.find((answer) => answer.isCorrect);

      // console.log("correctAnswer", correctAnswer);

      const selectedAnswer = question.answers.find(
        (answer) => answer.id === userAnswer?.answerId,
      );

      // console.log("selectedAnswer", selectedAnswer);

      const isCorrect = selectedAnswer?.id === correctAnswer?.id;

      // console.log("isCorrect", isCorrect);

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
