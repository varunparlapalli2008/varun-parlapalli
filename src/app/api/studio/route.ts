import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllContentForStudio, saveStudioContent, type StorageData } from "@/lib/content-store";
import { getStudioSessionFromRequest } from "@/lib/studio-auth.server";

export async function GET(req: NextRequest) {
  const session = getStudioSessionFromRequest(req);
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized. You must be logged in as the verified portfolio owner to read studio content." },
      { status: 401 }
    );
  }

  try {
    const data = await getAllContentForStudio();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Studio GET error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve portfolio content." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = getStudioSessionFromRequest(req);
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized. You must be logged in as the verified portfolio owner to publish content updates." },
      { status: 401 }
    );
  }

  try {
    const updatedData = (await req.json().catch(() => null)) as StorageData | null;
    if (
      !updatedData || 
      !updatedData.profile || 
      !Array.isArray(updatedData.projects) || 
      !Array.isArray(updatedData.skills) || 
      !Array.isArray(updatedData.experience) || 
      !Array.isArray(updatedData.achievements) || 
      !Array.isArray(updatedData.credentials) || 
      !Array.isArray(updatedData.currentlyLearning)
    ) {
      return NextResponse.json(
        { error: "Invalid content payload structure. Expected complete portfolio data tree." },
        { status: 400 }
      );
    }

    const saveResult = await saveStudioContent(updatedData);

    if (!saveResult.success) {
      return NextResponse.json(
        { error: saveResult.message || "Failed to persist content update to storage." },
        { status: 500 }
      );
    }

    // Revalidate public routes and layout cache so updates appear immediately
    try {
      revalidatePath("/", "layout");
    } catch (revalError) {
      console.warn("Revalidation notice:", revalError);
    }

    return NextResponse.json({
      success: true,
      message: saveResult.message,
      destination: saveResult.destination,
      sha: saveResult.sha
    });
  } catch (error) {
    console.error("Studio mutation error:", error);
    return NextResponse.json(
      { error: "Internal server error while persisting updates." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  return POST(req);
}

export async function DELETE(req: NextRequest) {
  const session = getStudioSessionFromRequest(req);
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized. Delete mutations require an authenticated owner session." },
      { status: 401 }
    );
  }
  return NextResponse.json(
    { error: "Direct item deletion is managed via POST updates to the portfolio store." },
    { status: 400 }
  );
}
