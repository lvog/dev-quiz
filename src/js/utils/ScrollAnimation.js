class ScrollAnimation {
  constructor({
    selector = ".animate",
    activeClass = "is-visible",
    threshold = 0.2,
    rootMargin = "0px",
    once = true,
  } = {}) {
    this.selector = selector;
    this.elements = [];
    this.activeClass = activeClass;
    this.once = once;

    this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
      threshold,
      rootMargin,
    });
  }

  init() {
    this.elements = document.querySelectorAll(this.selector);

    if (!this.elements.length) return;

    this.elements.forEach((el) => this.observer.observe(el));
  }

  handleIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(this.activeClass);

        if (this.once) {
          this.observer.unobserve(entry.target);
        }
      } else {
        if (!this.once) {
          entry.target.classList.remove(this.activeClass);
        }
      }
    });
  }
}

export const scrollAnimation = new ScrollAnimation();
