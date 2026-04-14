import { eventBus } from "@js/utils/eventBus";

class QuizUI {
  constructor(selector) {
    this.holder = document.querySelector(selector);
    this.mainBlockTemplate = this.holder.querySelector("#main-block-template");
    this.quizTemplate = this.holder.querySelector("#quiz-template");
    this.listTemplate = this.holder.querySelector("#quiz-list-template");
    this.resultTemplate = this.holder.querySelector("#result-template");
    this.answerTemplate = this.holder.querySelector("#answer-template");
    this.quizHolder = this.holder.querySelector(".quiz-track");
    this.mainHolder = this.holder.querySelector(".main-info-block");
  }

  listen() {
    eventBus.on("quiz:finished", ({ results, time }) => {
      this.renderResult(results, time);
    });
  }

  // --- Main Content ---

  renderMainBlock(data) {
    if (!this.mainHolder || !this.mainBlockTemplate) return;

    const { title, description } = data;

    const template = this.mainBlockTemplate.content.cloneNode(true);

    template.querySelector("h1").textContent = title;
    template.querySelector("p").textContent = description;
    this.mainHolder.appendChild(template);
  }

  renderList(data) {
    if (!this.mainHolder || !this.listTemplate) return;

    // console.log("here list");

    const listHolder = document.createElement("ul");
    listHolder.classList.add("quiz-list");
    this.mainHolder.appendChild(listHolder);

    data.forEach((el) => {
      const template = this.listTemplate.content.cloneNode(true);

      const badge = template.querySelector(".badge");
      this.setBadge(badge, el.difficulty);

      template.querySelector(".question .num").textContent = el.questionCount;
      template.querySelector("h2").textContent = el.title;
      template.querySelector("p").textContent = el.description;

      const btn = template.querySelector(".btn");
      btn.dataset.id = el.id;
      listHolder.appendChild(template);
    });
  }

  // --- Quiz ---

  renderQuiz(data) {
    if (!this.quizHolder || !this.quizTemplate) return;

    // console.log("here quiz");

    this.quizHolder.innerHTML = "";

    data.forEach((el) => {
      const template = this.quizTemplate.content.cloneNode(true);

      template.querySelector(".quiz-form").id = el.id;

      const badge = template.querySelector(".badge");
      this.setBadge(badge, el.difficulty);

      template.querySelector(".h3").textContent = el.text;

      const answersHolder = template.querySelector(".answers-holder");
      answersHolder.appendChild(this.renderLabel(el.answers, el.id));

      this.quizHolder.appendChild(template);
    });
  }

  renderLabel(data, id) {
    const fragment = document.createDocumentFragment();

    data.forEach((answer) => {
      const label = document.createElement("label");
      label.classList.add("answer");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${id}`;
      radio.dataset.question = answer.id;
      radio.value = answer.text;

      const customRadio = document.createElement("span");
      customRadio.classList.add("custom-radio");

      const customLabel = document.createElement("span");
      customLabel.classList.add("custom-label");
      customLabel.textContent = answer.text;

      label.appendChild(radio);
      label.appendChild(customRadio);
      label.appendChild(customLabel);
      fragment.appendChild(label);
    });

    return fragment;
  }

  // --- Result ---

  renderResult(data, time) {
    if (!this.mainHolder || !this.resultTemplate) return;

    this.clearMainHolder();

    const questionNum = data.length;
    const correctNum = data.filter((el) => el.isCorrect).length;
    const wrongNum = data.filter((el) => !el.isCorrect).length;
    const result = Math.ceil((correctNum / questionNum) * 100);

    const { minutes, seconds } = time;

    const template = this.resultTemplate.content.cloneNode(true);

    template.querySelector(".result-num").textContent = `${result}%`;
    template.querySelector(".correct-num").textContent = correctNum;
    template.querySelector(".wrong-num").textContent = wrongNum;

    template.querySelector(".time-num .minutes").textContent = minutes;

    template.querySelector(".time-num .seconds").textContent = seconds;

    const answersList = template.querySelector(".answers-list");
    answersList.appendChild(this.renderAnswers(data));

    this.mainHolder.appendChild(template);
  }

  renderAnswers(data) {
    const fragment = document.createDocumentFragment();

    data.forEach((el) => {
      const template = this.answerTemplate.content.cloneNode(true);

      template.querySelector(".question-text .text").textContent = el.question;

      const answerHolder = template.querySelector(".answer-text");
      el.isCorrect
        ? answerHolder.classList.add("correct")
        : answerHolder.classList.add("wrong");

      const answerText = template.querySelector(".answer-text .text");
      answerText.textContent = el.userAnswer;

      template.querySelector(".explanation-text .text").textContent =
        el.explanation;
      fragment.appendChild(template);
    });

    return fragment;
  }

  // --- Utils ---

  clearMainHolder() {
    this.mainHolder.innerHTML = "";
  }

  setBadge(badge, difficulty) {
    badge.classList.add(difficulty.toLowerCase());
    badge.textContent = difficulty;
  }
}

export const quizUI = new QuizUI(".quiz-section");
