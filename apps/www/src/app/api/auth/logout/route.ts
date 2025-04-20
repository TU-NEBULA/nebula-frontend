import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true }, { status: 200 });

  res.cookies.delete({
    name: "accessToken",
    domain: ".nebula-ai.kr",
    path: "/",
    sameSite: "none",
    secure: true,
  });
  res.cookies.delete({
    name: "refreshToken",
    domain: ".nebula-ai.kr",
    path: "/",
    sameSite: "none",
    secure: true,
  });

  return res;
}
