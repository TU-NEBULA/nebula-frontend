import { BaseResponseDTO } from "@/models";
import { TrendKeywordDTO } from "@/models/keyword";

import api from "./api";

export const getKeywords = async (): Promise<BaseResponseDTO<string[]>> => {
  return await api.get("/keywords");
};

export const getTrendKeywords = async (): Promise<BaseResponseDTO<TrendKeywordDTO>> => {
  return await api.get("/keywords/trending", { next: { revalidate: 60 } });
};
