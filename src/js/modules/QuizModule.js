import { API_LIST_URL, API_QUIZ_CONFIG } from "@js/config";
import { state } from "@js/state";
import { eventBus } from "@js/utils/eventBus";
import { quizes, mainInfo, errorMessages } from "@js/data";

import { quizService } from "@js/services/quizService";
import { quizUI } from "@js/ui/quizUI";

class QuizModule {
  constructor(selector) {
    this.holder = document.querySelector(selector);
    this.url = API_LIST_URL;
    this.mode = "list";
  }

  init() {
    if (!this.holder) return;
    this.loadList();
    this.handleQuizSelect();
    this.handleBackBtn();
  }

  handleBackBtn() {
    this.holder.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-back");

      if (!btn) return;

      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      this.loadList();
    });
  }

  handleQuizSelect() {
    this.holder.addEventListener("click", async (e) => {
      const btn = e.target.closest(".popup-open");

      if (!btn) return;
      e.preventDefault();

      const id = btn.dataset.id;

      if (!id) return;

      this.loadQuiz(id);
    });
  }

  async loadList() {
    this.mode = "list";

    quizUI.renderLoader();

    // const data = await this.search();

    quizUI.clearMainHolder();
    quizUI.renderMainBlock(mainInfo);

    // if (!data || !data.length) {
    //   quizUI.renderError(errorMessages.list);
    //   return;
    // }

    quizUI.renderList(quizes);
  }

  async loadQuiz(id) {
    const { apiUrl, answer } = API_QUIZ_CONFIG;
    const url = `${apiUrl}${id}&${answer}`;

    this.mode = "quiz";

    state.resetAnswers();

    quizUI.renderLoader();

    const data = await this.search(url);

    if (!data || !data.length) {
      quizUI.clearMainHolder();
      quizUI.renderMainBlock(mainInfo);
      quizUI.renderError(errorMessages.quiz);
      return;
    }

    state.questions = data;

    quizUI.renderQuiz(data);

    eventBus.emit("quiz:start");
  }

  async search(url = this.url) {
    try {
      const data = await quizService(url, this.mode);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export const quizModule = new QuizModule(".quiz-section");
