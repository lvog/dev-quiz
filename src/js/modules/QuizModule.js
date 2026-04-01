import { quizService } from "@js/services/quizService";
import { quizUI } from "@js/ui/quizUI";
import { API_LIST_URL, API_QUIZ_CONFIG } from "@js/config";
import { popupModule } from "./PopupModule";

class QuizModule {
  constructor(selector) {
    this.holder = document.querySelector(selector);
    this.slider = null;
    this.url = API_LIST_URL;
    this.mode = "list";
  }

  init() {
    if (!this.holder) return;
    this.findElements();
    this.search();
    this.handleEvents();
  }

  findElements() {
    this.slider = this.holder.querySelector(".quiz-slider");
  }

  handleEvents() {
    this.holder.addEventListener("click", async (e) => {
      const btn = e.target.closest(".popup-open");

      if (!btn) return;
      e.preventDefault();

      const id = btn.dataset.id;

      if (!id) return;

      const { apiUrl, answer } = API_QUIZ_CONFIG;
      const url = `${apiUrl}${id}&${answer}`;

      this.mode = "quiz";

      await this.search(url);
      popupModule.open();
    });
  }

  async search(url = this.url) {
    try {
      const quizData = await quizService(url, this.mode);

      this.mode === "list"
        ? quizUI.renderList(quizData)
        : quizUI.renderQuiz(quizData);
    } catch (error) {
      console.log(error);
    }
  }
}

export const quizModule = new QuizModule(".quiz-section");
