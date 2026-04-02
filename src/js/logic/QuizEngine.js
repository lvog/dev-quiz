import { state } from "@js/state";

class QuizEngine {
  constructor(selector) {
    this.holder = document.querySelector(selector);
  }

  validate() {
    this.holder.addEventListener("change", (e) => {
      const radio = e.target.closest("input");

      if (!radio) return;

      radio.closest("form").classList.add("validate");
    });
  }

  saveAnswer(value) {
    state.answers.push(value);
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
