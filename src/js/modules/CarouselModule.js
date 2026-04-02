import { quizEngine } from "@js/logic/QuizEngine";
import { quizUI } from "@js/ui/quizUI";
import { popupModule } from "./PopupModule";

class CarouselModule {
  constructor(selector) {
    this.holder = document.querySelector(selector);
    this.slider = null;
    this.track = null;
    this.slides = [];
    this.totalHolder = null;
    this.currentHolder = null;
    this.transform = 0;
    this.slideWidth = 0;
    this.total = 0;
    this.current = 1;
    this.progress = 0;
  }

  init() {
    if (!this.holder) return;

    this.findElements();
    this.reset();
    this.updateLayout();
    this.bindResize();
    this.handleEvents();
  }

  reset() {
    this.holder.classList.remove("is-animated");
    this.current = 1;
    this.transform = 0;
    this.progress = 0;
  }

  bindResize() {
    window.addEventListener("resize", () => this.updateLayout());
  }

  findElements() {
    this.slider = this.holder.querySelector(".quiz-slider");
    this.track = this.slider.querySelector(".quiz-track");
    this.totalHolder = this.holder.querySelector(".total");
    this.currentHolder = this.holder.querySelector(".current");
    this.progressBar = this.holder.querySelector(".quiz-progress-bar");
    this.slides = this.slider.querySelectorAll(".quiz-slide");
  }

  updateLayout() {
    this.total = this.slides.length;
    this.slideWidth = this.slider.offsetWidth;
    this.slides.forEach((slide) => {
      slide.style.width = `${this.slideWidth}px`;
    });
    this.track.style.width = `${this.slideWidth * this.total}px`;
    this.track.style.transform = `translateX(${this.transform}px)`;

    this.currentHolder.textContent = this.current;
    this.totalHolder.textContent = this.total;
    this.progress = Math.ceil((this.current / this.total) * 100);
    this.progressBar.style.width = `${this.progress}%`;
  }

  handleEvents() {
    this.holder.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-next");
      const input = e.target.closest("input");

      if (input) {
        quizEngine.validate();
      }

      if (!btn) return;
      e.preventDefault();

      this.current++;
      this.transform = (this.current - 1) * this.slideWidth;

      const form = btn.closest(".quiz-form");
      const inputs = [...form.querySelectorAll("input")];
      const activeInput = inputs.find((input) => input.checked);
      const answer = {
        questionId: form.id,
        answerId: activeInput.dataset.question,
        answerText: activeInput.value,
      };
      quizEngine.saveAnswer(answer);

      if (this.current > this.total) {
        const results = quizEngine.getResults();
        console.log(results);
        quizUI.renderResult(results);
        popupModule.close();
        return;
      }

      this.updateUI();
    });
  }

  updateUI() {
    this.holder.classList.add("is-animated");

    this.progress = Math.ceil((this.current / this.total) * 100);
    this.progressBar.style.width = `${this.progress}%`;

    this.currentHolder.textContent = this.current;
    this.track.style.transform = `translateX(-${this.transform}px)`;
  }
}

export const carouselModule = new CarouselModule(".quiz");
