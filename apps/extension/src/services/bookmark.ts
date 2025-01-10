import { BaseResponseDTO } from "@/models";
import { SummarizeBookmarkDTO } from "@/models/bookmark";

import { api } from "./api";

export const summarizeBookmark = async (data: {
  url: string;
  html_content: string;
}): Promise<BaseResponseDTO<SummarizeBookmarkDTO>> => {
  return await api.post("/api/extract_data", data);
};
