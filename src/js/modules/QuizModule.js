import { API_LIST_URL, API_QUIZ_CONFIG } from "@js/config";
import { state } from "@js/state";

import { quizService } from "@js/services/quizService";
import { quizUI } from "@js/ui/quizUI";
import { popupModule } from "./PopupModule";
import { carouselModule } from "./CarouselModule";
import { timerModule } from "./TimerModule";

class QuizModule {
  constructor(selector) {
    this.holder = document.querySelector(selector);
    this.url = API_LIST_URL;
    this.mode = "list";
  }

  init() {
    if (!this.holder) return;
    // this.search();
    this.handleQuizSelect();
  }

  handleQuizSelect() {
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

      timerModule.setTimer();
      carouselModule.init();
      popupModule.open();
    });
  }

  async search(url = this.url) {
    try {
      const quizData = await quizService(url, this.mode);

      if (this.mode === "quiz") {
        state.questions = quizData;
      }

      // console.log(state.questions);

      this.mode === "list"
        ? quizUI.renderList(quizData)
        : quizUI.renderQuiz(quizData);
    } catch (error) {
      console.log(error);
    }
  }
}

export const quizModule = new QuizModule(".quiz-section");
