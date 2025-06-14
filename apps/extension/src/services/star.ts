import { apiV1 } from "@/apis/api-v1";
import { BaseResponseDTO } from "@/models";
import { CompleteSummarizeStarDTO, SummarizeStarDTO } from "@/models/star";
import { CompleteSummarizeStarProps, SummarizeStarProps } from "@/types/star";
import { AllStarDTO, StarProps } from "@repo/types";

import { apiV2 } from "../apis/api-v2";

export const createStar = async ({
  title,
  siteUrl,
  htmlFile,
}: SummarizeStarProps): Promise<BaseResponseDTO<SummarizeStarDTO>> => {
  return (await apiV2.post(`/stars?title=${title}&siteUrl=${siteUrl}`, htmlFile)).data;
};

export const completeCreateStar = async (
  body: CompleteSummarizeStarProps
): Promise<BaseResponseDTO<CompleteSummarizeStarDTO>> => {
  return (await apiV2.post("/stars/save", body)).data;
};

export const getStars = async (): Promise<BaseResponseDTO<AllStarDTO>> => {
  return (await apiV1.get("/stars")).data;
};

export const getStarById = async (id: string): Promise<BaseResponseDTO<StarProps>> => {
  return (await apiV1.get(`/stars/${id}`)).data;
};

export const updateStar = async ({
  id,
  body,
}: {
  id: string;
  body: {
    title: string;
    categoryName: string;
    summaryAI: string;
    userMemo: string;
    keywordList: string[];
  };
}): Promise<BaseResponseDTO<StarProps>> => {
  return (await apiV1.patch(`/stars/${id}`, body)).data;
};
