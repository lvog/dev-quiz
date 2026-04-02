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
    console.log(state.answers);
  }
}

export const quizEngine = new QuizEngine(".quiz");
