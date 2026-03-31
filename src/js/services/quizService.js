import { getData } from "@js/utils/getData";
import { mapData } from "@js/mappers/mapData";

export const quizService = async (url, list) => {
  const data = await getData(url);
  return mapData(data, list);
};
