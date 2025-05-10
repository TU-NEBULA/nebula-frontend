import { BaseResponseDTO } from "@/models";
import { CompleteSummarizeStarDTO, SummarizeStarDTO } from "@/models/star";
import { CompleteSummarizeStarProps, SummarizeStarProps } from "@/types/star";

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
