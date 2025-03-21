import { BaseResponseDTO } from "@/models";
import { AllStarDTO, DeleteStarDTO } from "@/models/star";
import { StarProps } from "@/types/graph";

import api from "./api";

export const getAllStars = async (): Promise<BaseResponseDTO<AllStarDTO>> => {
  return await api.get("/stars");
};

export const getStarById = async (id: string): Promise<BaseResponseDTO<StarProps>> => {
  return await api.get(`/stars/${id}`);
};

export const updateStar = async ({
  id,
  content,
}: {
  id: string;
  content: {
    title: string;
    categoryName: string;
    summaryAI: string;
    userMemo: string;
    keywordList: string[];
  };
}): Promise<BaseResponseDTO<StarProps>> => {
  return await api.patch(`/stars/${id}`, content);
};

export const deleteStar = async (id: string): Promise<BaseResponseDTO<DeleteStarDTO>> => {
  return await api.patch(`/stars/${id}/deactivate`);
};

export const getStarByCategory = async (
  categoryId: string
): Promise<BaseResponseDTO<AllStarDTO>> => {
  return await api.get(`/stars/categories/${categoryId}`);
};

export const getStarByKeyword = async (keyword: string): Promise<BaseResponseDTO<AllStarDTO>> => {
  return await api.get(`/stars/keywords/${keyword}`);
};
