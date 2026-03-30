import { quizServiсe } from "@js/services/quizService";
import { quizUI } from "@js/ui/quizUI";

class QuizModule {
  constructor(selector) {
    this.holder = document.querySelector(selector);
    this.track = null;
  }

  init() {
    if (!this.holder) return;
    this.findElements();
    this.search();
  }

  findElements() {
    this.track = this.holder.querySelector(".slick-track");
    this.btn = this.holder.querySelector(".btn");
  }

  async search() {
    try {
      const quizData = await quizServiсe();
      quizUI.render(quizData);
    } catch (error) {
      console.log(error);
    }
  }
}

export const quizModule = new QuizModule(".quiz-slider");
