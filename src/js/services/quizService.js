import { getData } from "@js/utils/getData";
import { mapData } from "@js/mappers/mapData";

export const quizServiсe = async () => {
  const url = "http://localhost:3001/quiz";
  const data = await getData(url);
  return mapData(data);
};
