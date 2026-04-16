export const setYear = () => {
  const element = document.querySelector(".year");
  const date = new Date();
  const year = date.getFullYear();

  if (element) {
    element.textContent = year;
  }
};
