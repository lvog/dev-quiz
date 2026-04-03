class TimerModule {
  constructor(selector) {
    this.holder = document.querySelector(selector);
    this.minutesHolder = this.holder.querySelector(".minutes");
    this.secondsHolder = this.holder.querySelector(".seconds");

    this.minutes = 0;
    this.seconds = 0;

    this.startTime = null;
    this.timerId = null;
  }

  setTimer() {
    this.startTime = Date.now();

    this.render();

    this.timerId = setInterval(() => {
      this.updateTime();
      this.render();
    }, 1000);
  }

  clearTimer() {
    clearInterval(this.timerId);
    this.timerId = null;

    this.minutes = 0;
    this.seconds = 0;

    this.render();
  }

  getTime() {
    return {
      minutes: this.minutes,
      seconds: this.seconds,
    };
  }

  updateTime() {
    const spentTime = Date.now() - this.startTime;

    const totalSeconds = Math.floor(spentTime / 1000);

    this.minutes = Math.floor(totalSeconds / 60);
    this.seconds = totalSeconds % 60;
  }

  render() {
    const seconds = this.seconds >= 10 ? this.seconds : `0${this.seconds}`;

    this.minutesHolder.textContent = this.minutes;
    this.secondsHolder.textContent = seconds;
  }
}

export const timerModule = new TimerModule(".quiz-time");
