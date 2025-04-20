import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json({ success: true }, { status: 200 });

    res.cookies.delete("accessToken");
    res.cookies.delete("refreshToken");

    return res;
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
