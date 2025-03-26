import { BaseResponseDTO } from "@/models";
import { CreateCategoryDTO, GetCategoryDTO } from "@/models/category";

import { api } from "./api";

export const getCategories = async (): Promise<BaseResponseDTO<GetCategoryDTO>> => {
  return (await api.get("/stars/categories")).data;
};

export const createCategory = async (name: string): Promise<BaseResponseDTO<CreateCategoryDTO>> => {
  return (await api.post("/stars/categories", { name })).data;
};
