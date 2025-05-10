import { BaseResponseDTO } from "@/models";

import { apiV1 } from "../apis/api-v1";

export const getKeywords = async (): Promise<BaseResponseDTO<string[]>> => {
  return (await apiV1.get("/keywords")).data;
};
