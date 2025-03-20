import { BaseResponseDTO } from "@/models";
import { CategoryDTO } from "@/models/category";

import api from "./api";

export const getCategories = async (): Promise<BaseResponseDTO<CategoryDTO>> => {
  return await api.get("/stars/categories");
};

export const createCategory = async (name: string): Promise<BaseResponseDTO<null>> => {
  return await api.post("/stars/categories", { name });
};
