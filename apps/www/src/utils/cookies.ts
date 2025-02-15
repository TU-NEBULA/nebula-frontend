"use server";

import { cookies } from "next/headers";

export const setupAuth = async () => {
  const cookieStorage = await cookies();
  const accessToken = cookieStorage.get("Authorization");
  console.log(accessToken);
};
