import { NextResponse } from "next/server";
import { STUDIO_COOKIE_NAME } from "@/lib/studio-auth.server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully."
  });

  response.cookies.set({
    name: STUDIO_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });

  return response;
}
