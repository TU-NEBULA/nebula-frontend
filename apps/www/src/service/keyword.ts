import { BaseResponseDTO } from "@/models";

import api from "./api";

export const getKeywords = async (): Promise<BaseResponseDTO<string[]>> => {
  return await api.get("/keywords");
};
