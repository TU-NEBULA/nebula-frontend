import { BaseResponseDTO } from "@/models";
import { CreateCategoryDTO, GetCategoryDTO } from "@/models/category";

import { api } from "./api";

export const getCategories = async (): Promise<BaseResponseDTO<GetCategoryDTO>> => {
  return api.get("/api/v1/stars/categories");
};

export const createCategory = async (name: string): Promise<BaseResponseDTO<CreateCategoryDTO>> => {
  return api.post("/api/v1/stars/categories", { name });
};
