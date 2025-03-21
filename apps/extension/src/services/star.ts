import { BaseResponseDTO } from "@/models";
import { CompleteSummarizeStarDTO, SummarizeStarDTO } from "@/models/star";
import { CompleteSummarizeStarProps, SummarizeStarProps } from "@/types/star";

import { api } from "./api";

export const createStar = async ({
  title,
  siteUrl,
  htmlFile,
}: SummarizeStarProps): Promise<BaseResponseDTO<SummarizeStarDTO>> => {
  return (await api.post(`/api/v1/stars?title=${title}&siteUrl=${siteUrl}`, htmlFile)).data;
};

export const completeCreateStar = async ({
  starId,
  body,
}: {
  starId: string;
  body: CompleteSummarizeStarProps;
}): Promise<BaseResponseDTO<CompleteSummarizeStarDTO>> => {
  return (await api.patch(`/api/v1/stars/complete/${starId}`, body)).data;
};
