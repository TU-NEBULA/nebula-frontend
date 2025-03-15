"use server";

import { cookies } from "next/headers";

export const setupAuth = async () => {
  const cookieStorage = await cookies();
  const accessToken = cookieStorage.get("Authorization")?.value;

  if (!accessToken) return { status: false, data: null };

  const refreshToken = cookieStorage.get("refreshToken")?.value;

  return { status: true, data: { accessToken, refreshToken } };
};

export const setTempToken = async () => {
  const cookieStorage = await cookies();
  const accessToken = cookieStorage.set("accessToken", "ey~");

  return !!accessToken;
};
