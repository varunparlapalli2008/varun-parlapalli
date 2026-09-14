import { NextRequest, NextResponse } from "next/server";
import { 
  verifyStudioPassword, 
  createSessionToken, 
  getSessionCookieOptions 
} from "@/lib/studio-auth.server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required." },
        { status: 400 }
      );
    }

    const authResult = verifyStudioPassword(password);
    if (!authResult.valid) {
      return NextResponse.json(
        { error: authResult.error || "Incorrect password." },
        { status: authResult.missingConfig ? 500 : 401 }
      );
    }

    const token = createSessionToken();
    const cookieOptions = getSessionCookieOptions();

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful."
    });

    response.cookies.set({
      ...cookieOptions,
      value: token
    });

    return response;
  } catch (error) {
    console.error("Studio login route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during authentication." },
      { status: 500 }
    );
  }
}
