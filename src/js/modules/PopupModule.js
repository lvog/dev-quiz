import { eventBus } from "@js/utils/eventBus";

class PopupModule {
  constructor(selector) {
    this.holder = document.querySelector(selector);
    this.popupSelector = ".popup";
    this.closeBtnSelector = ".popup-close";
  }

  init() {
    this.handleEvents();
    this.listen();
  }

  listen() {
    eventBus.on("quiz:start", () => this.open());
    eventBus.on("quiz:finished", () => this.close());
  }

  handleEvents() {
    this.holder.addEventListener("click", (e) => {
      const isCloseBtn = e.target.closest(this.closeBtnSelector);
      const isPopup = e.target.closest(this.popupSelector);

      if (isCloseBtn || !isPopup) {
        this.close();
        eventBus.emit("quiz:cancelled");
        return;
      }
    });
  }

  open() {
    document.body.classList.add("popup-active");
  }

  close() {
    document.body.classList.remove("popup-active");
  }
}

export const popupModule = new PopupModule(".quiz-section");
