import { BaseResponseDTO, PaginationResponseDTO } from "@/models";
import { HistoryDTO } from "@/models/history";

import api from "./api";

export const getHistories = async ({
  page,
  keyword,
}: {
  page: string;
  keyword: string;
}): Promise<BaseResponseDTO<PaginationResponseDTO<HistoryDTO>>> => {
  return await api.get(
    `/histories/search?page=${page}&size=10&keyword=${encodeURIComponent(keyword)}`
  );
};
