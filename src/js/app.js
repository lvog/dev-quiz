import "../styles/style.scss";
import { quizModule } from "@js/modules/QuizModule";
import { popupModule } from "@js/modules/PopupModule";
import { quizUI } from "./ui/quizUI";
import { timerModule } from "./modules/TimerModule";
import { carouselModule } from "./modules/CarouselModule";

document.addEventListener("DOMContentLoaded", () => {
  quizUI.listen();
  timerModule.listen();
  carouselModule.listen();
  quizModule.init();
  popupModule.init();
});
