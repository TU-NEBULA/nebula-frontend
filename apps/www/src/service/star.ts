import { STAR } from "@/constants/star";
import { BaseResponseDTO } from "@/models";
import { DeleteStarDTO, Star2DDTO } from "@/models/star";
import { AllStarDTO, StarProps } from "@repo/types";

import api from "./api";
import apiV2 from "./api-v2";

export const getAllStars = async (): Promise<BaseResponseDTO<AllStarDTO>> => {
  return await api.get("/stars", { next: { tags: [STAR.GET_ALL] } });
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

export const get2DStars = async (): Promise<BaseResponseDTO<Star2DDTO[]>> => {
  return await apiV2.get("/stars/2D");
};
