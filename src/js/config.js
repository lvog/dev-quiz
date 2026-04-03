export const API_KEY = process.env.API_KEY;

export const API_LIST_URL =
  "https://quizapi.io/api/v1/quizzes?category=programming&limit=10";

export const API_QUIZ_URL = "https://quizapi.io/api/v1/questions?quiz_id=";

export const API_QUIZ_CONFIG = {
  apiUrl: "https://quizapi.io/api/v1/questions?quiz_id=",
  answer: "include_answers=true",
};
