import { BaseResponseDTO, PaginationResponseDTO } from "@/models";
import { HistoryDTO } from "@/models/history";

import api from "./api";

export const getHistories = async (
  page: string
): Promise<BaseResponseDTO<PaginationResponseDTO<HistoryDTO>>> => {
  return await api.get(`/histories?page=${page}&size=10`);
};
