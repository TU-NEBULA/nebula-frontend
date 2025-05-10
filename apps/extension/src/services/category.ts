import { BaseResponseDTO } from "@/models";
import { CreateCategoryDTO, GetCategoryDTO } from "@/models/category";

import { apiV1 } from "../apis/api-v1";

export const getCategories = async (): Promise<BaseResponseDTO<GetCategoryDTO>> => {
  return (await apiV1.get("/stars/categories")).data;
};

export const createCategory = async (name: string): Promise<BaseResponseDTO<CreateCategoryDTO>> => {
  return (await apiV1.post("/stars/categories", { name })).data;
};
