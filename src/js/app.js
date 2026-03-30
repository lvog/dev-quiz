import "../styles/style.scss";
import { getData } from "./utils/getData";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await getData("http://localhost:3001/quiz");
    console.log("DATA:", data);
  } catch (error) {
    console.error("FRONT ERROR:", error);
  }
});
