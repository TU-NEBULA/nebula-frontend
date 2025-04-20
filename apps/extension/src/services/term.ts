import { BaseResponseDTO } from "@/models";
import { TermDTO } from "@/models/term";

import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const postTerm = async (token: string, body: { [key: string]: boolean }) => {
  return await axios.post(
    `${baseUrl}/terms/agree`,
    { agreeMap: body },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getTerm = async (token: string): Promise<BaseResponseDTO<TermDTO[]>> => {
  return await axios.get(`${baseUrl}/terms`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
