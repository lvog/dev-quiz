class QuizUI {
  constructor(selector) {
    this.holder = document.querySelector(selector);
    this.quizTemplate = this.holder.querySelector("#quiz-template");
    this.listTemplate = this.holder.querySelector("#quiz-list-template");
    this.listHolder = this.holder.querySelector(".quiz-list");
    this.quizHolder = this.holder.querySelector(".quiz-slider");
  }

  renderList(data) {
    // if (!this.listHolder || !this.listTemplate) return;
    console.log("here list");

    this.listHolder.innerHTML = "";

    data.forEach((el) => {
      const template = this.listTemplate.content.cloneNode(true);
      const badge = template.querySelector(".badge");
      badge.classList.add(`${el.difficulty.toLowerCase()}`);
      badge.textContent = el.difficulty;

      template.querySelector("h2").textContent = el.title;
      template.querySelector("p").textContent = el.description;

      const btn = template.querySelector(".btn");
      btn.dataset.id = el.id;
      this.listHolder.appendChild(template);
    });
  }

  renderQuiz(data) {
    // if (!this.quizHolder || !this.quizTemplate) return;

    console.log("here quiz");

    this.quizHolder.innerHTML = "";
    console.log(data);

    data.forEach((el) => {
      const template = this.quizTemplate.content.cloneNode(true);
      template.querySelector(".badge").textContent = el.difficulty;
      template.querySelector(".h3").textContent = el.text;

      const answersHolder = template.querySelector(".answers-holder");

      const fragment = document.createDocumentFragment();

      el.answers.forEach((answer) => {
        const label = document.createElement("label");
        label.classList.add("answer");

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `question-${el.id}`;
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

      answersHolder.appendChild(fragment);
      this.quizHolder.appendChild(template);
    });
  }
}

export const quizUI = new QuizUI(".quiz-section");
