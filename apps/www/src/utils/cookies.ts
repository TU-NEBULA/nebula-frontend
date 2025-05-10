"use server";

import { cookies } from "next/headers";

export const getCookie = async (name: string) => {
  const cookieStorage = await cookies();
  const value = cookieStorage.get(name);
  return value;
};

export const removeAuth = async () => {
  const cookieStorage = await cookies();
  cookieStorage.delete({
    name: "accessToken",
    domain: ".nebula-ai.kr",
    path: "/",
    sameSite: "none",
    secure: true,
  });
  cookieStorage.delete({
    name: "refreshToken",
    domain: ".nebula-ai.kr",
    path: "/",
    sameSite: "none",
    secure: true,
  });
};
