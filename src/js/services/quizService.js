import { getData } from "@js/utils/getData";
import { mapData } from "@js/mappers/mapData";

export const quizService = async (url, mode) => {
  const data = await getData(url);
  return mapData(data, mode);
};
