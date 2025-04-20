import { NextResponse } from "next/server";

import { getCookie } from "@/utils/cookies";

export async function GET() {
  try {
    const accessToken = (await getCookie("accessToken"))?.value || "";

    return NextResponse.json({ success: true, accessToken });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
