"use server";

import { cookies } from "next/headers";

export const setupAuth = async () => {
  const cookieStorage = await cookies();
  const accessToken = cookieStorage.get("accessToken")?.value;

  if (!accessToken) return { status: false, data: { accessToken: null, refreshToken: null } };

  const refreshToken = cookieStorage.get("refreshToken")?.value;

  return { status: true, data: { accessToken, refreshToken } };
};
