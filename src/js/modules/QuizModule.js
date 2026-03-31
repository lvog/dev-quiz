import { quizService } from "@js/services/quizService";
import { quizUI } from "@js/ui/quizUI";
import { API_LIST_URL } from "@js/config";

class QuizModule {
  constructor(selector) {
    this.holder = document.querySelector(selector);
    this.track = null;
    this.url = API_LIST_URL;
    this.list = true;
  }

  init() {
    if (!this.holder) return;
    this.findElements();
    this.search();
  }

  findElements() {
    this.track = this.holder.querySelector(".quiz-track");
    this.btn = this.holder.querySelector(".btn");
  }

  async search(url = this.url, list = this.list) {
    try {
      const quizData = await quizService(url, list);

      list ? quizUI.renderList(quizData) : quizUI.renderQuiz(quizData);
    } catch (error) {
      console.log(error);
    }
  }
}

export const quizModule = new QuizModule(".quiz-slider");
