import { BaseResponseDTO } from "@/models";
import { CreateCategoryDTO, GetCategoryDTO } from "@/models/category";

import { api } from "./api";

export const getCategories = async (): Promise<BaseResponseDTO<GetCategoryDTO>> => {
  return (await api.get("/api/v1/stars/categories")).data;
};

export const createCategory = async (name: string): Promise<BaseResponseDTO<CreateCategoryDTO>> => {
  return (await api.post("/api/v1/stars/categories", { name })).data;
};
