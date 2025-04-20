import { NextResponse } from "next/server";

import { removeAuth } from "@/utils/cookies";

export async function POST() {
  try {
    await removeAuth();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Logout failed:", err);

    return NextResponse.json(
      {
        success: false,
        error: "Could not clear authentication cookies.",
      },
      { status: 500 }
    );
  }
}
