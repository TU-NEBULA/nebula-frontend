import { BaseResponseDTO } from "@/models";
import { AllStarDTO } from "@/models/star";

import api from "./api";

export const getAllStars = async (): Promise<BaseResponseDTO<AllStarDTO>> => {
  return await api.get("/stars");
};
