class QuizUI {
  constructor(selector) {
    this.holder = document.querySelector(selector);
    this.template = document.querySelector("#quiz-template");
  }

  clear() {
    if (this.holder) {
      this.holder.innerHTML = "";
    }
  }

  render(data) {
    if (!this.holder || !this.template) return;

    data.forEach((el) => {
      const template = this.template.content.cloneNode(true);
      template.querySelector(".tag").textContent = el.difficulty;
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
        label.appendChild(customLabel);
        label.appendChild(customRadio);
        fragment.appendChild(label);
      });

      answersHolder.appendChild(fragment);
      this.holder.appendChild(template);
    });
  }
}

export const quizUI = new QuizUI(".quiz-track");
