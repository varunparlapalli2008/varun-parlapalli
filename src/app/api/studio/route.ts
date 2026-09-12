import { NextRequest, NextResponse } from "next/server";
import { getAllContentForStudio, saveStudioContent } from "@/lib/content-store";

const AUTHORIZED_OWNER = "varunparlapalli2008@gmail.com";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("x-owner-auth-email");
  if (!authHeader || authHeader.trim().toLowerCase() !== AUTHORIZED_OWNER) {
    return NextResponse.json(
      { error: "Unauthorized. Content management is strictly restricted to the verified owner account." },
      { status: 403 }
    );
  }

  const data = await getAllContentForStudio();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("x-owner-auth-email");
  if (!authHeader || authHeader.trim().toLowerCase() !== AUTHORIZED_OWNER) {
    return NextResponse.json(
      { error: "Unauthorized. Mutations are restricted to varunparlapalli2008@gmail.com." },
      { status: 403 }
    );
  }

  try {
    const updatedData = await req.json();
    if (!updatedData || !updatedData.profile || !updatedData.projects) {
      return NextResponse.json({ error: "Invalid content payload structure." }, { status: 400 });
    }

    const success = await saveStudioContent(updatedData);
    if (!success) {
      return NextResponse.json({ error: "Failed to persist content update to storage." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Portfolio content successfully published." });
  } catch (error) {
    console.error("Studio mutation error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
