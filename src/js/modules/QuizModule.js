import { API_QUIZ_CONFIG } from "@js/config";
import { state } from "@js/state";
import { quizes, mainInfo, errorMessage } from "@js/data";

import { eventBus } from "@js/utils/eventBus";
import { quizResultsStorage } from "@js/utils/quizResultsStorage";

import { quizService } from "@js/services/quizService";
import { quizUI } from "@js/ui/quizUI";

class QuizModule {
  constructor(selector) {
    this.holder = document.querySelector(selector);
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

      window.scrollTo(0, 0);

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

  loadList() {
    quizUI.clearMainHolder();
    quizUI.renderMainBlock(mainInfo);

    const results = quizResultsStorage.getResults();

    quizUI.renderList(quizes, results);
  }

  async loadQuiz(id) {
    const { apiUrl, answer } = API_QUIZ_CONFIG;
    const url = `${apiUrl}${id}&${answer}`;

    state.resetAnswers();
    quizUI.removeLoader();
    quizUI.renderLoader();

    const data = await this.search(url);

    if (!data || !data.length) {
      quizUI.clearMainHolder();
      quizUI.removeLoader();
      quizUI.renderMainBlock(mainInfo);
      quizUI.renderError(errorMessage);
      return;
    }

    state.questions = data;
    state.currentQuizId = id;

    quizUI.removeLoader();
    quizUI.renderQuiz(data);

    eventBus.emit("quiz:start");
  }

  async search(url) {
    try {
      const data = await quizService(url);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export const quizModule = new QuizModule(".quiz-section");
