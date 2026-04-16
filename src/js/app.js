import "../styles/style.scss";

import { quizUI } from "@js/ui/quizUI";

import { quizModule } from "@js/modules/QuizModule";
import { popupModule } from "@js/modules/PopupModule";
import { timerModule } from "@js/modules/TimerModule";
import { carouselModule } from "@js/modules/CarouselModule";

import { quizEngine } from "@js/logic/QuizEngine";

import { setYear } from "@js/utils/setYear";
import { scrollAnimation } from "@js/utils/ScrollAnimation";

document.addEventListener("DOMContentLoaded", () => {
  quizUI.listen();
  quizEngine.listen();
  timerModule.listen();
  carouselModule.listen();
  quizModule.init();
  popupModule.init();
  setYear();
  scrollAnimation.init();
});
