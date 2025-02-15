"use server";

import { cookies } from "next/headers";

export const setupAuth = async () => {
  const cookieStorage = await cookies();
  const accessToken = cookieStorage.get("Authorization");

  if (!accessToken) return false;

  const refreshToken = cookieStorage.get("refreshToken");
  cookieStorage.set("accessToken", accessToken.value);
  cookieStorage.set("refreshToken", refreshToken.value);
  cookieStorage.delete("Authorization");

  return true;
};

export const removeAuth = async () => {
  const cookieStorage = await cookies();
  cookieStorage.delete("accessToken");
  cookieStorage.delete("refreshToken");
};
