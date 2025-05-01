import { BaseResponseDTO } from "@/models";
import { UserInfoDTO } from "@/models/user";

import api from "./api";

export const getUserInfo = async (): Promise<BaseResponseDTO<UserInfoDTO>> => {
  return await api.get("/users");
};
