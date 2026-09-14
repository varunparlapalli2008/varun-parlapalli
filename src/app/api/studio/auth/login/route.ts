import { NextRequest, NextResponse } from "next/server";
import { 
  verifyAdminCredentials, 
  createSessionToken, 
  getSessionCookieOptions 
} from "@/lib/studio-auth.server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, password } = body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const authResult = verifyAdminCredentials(email, password);
    if (!authResult.valid) {
      return NextResponse.json(
        { error: authResult.error || "Incorrect email or password." },
        { status: authResult.missingConfig ? 500 : 401 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const token = createSessionToken(cleanEmail);
    const cookieOptions = getSessionCookieOptions();

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful.",
      user: {
        email: cleanEmail
      }
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
