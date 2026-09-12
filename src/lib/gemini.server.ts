// Server-only Gemini provider configuration
// Never import this file into client components

if (typeof window !== "undefined") {
  throw new Error("gemini.server.ts can only be executed on the server.");
}

/**
 * Checks if the Gemini API key is configured in the server environment.
 * Strictly reads only process.env.GEMINI_API_KEY.
 * Never logs or exposes the key.
 */
export function isGeminiConfigured(): boolean {
  const key = process.env.GEMINI_API_KEY;
  return typeof key === "string" && key.trim().length > 0;
}

/**
 * Retrieves the Gemini API key for server-side requests only.
 * Returns null if not configured.
 */
export function getGeminiApiKey(): string | null {
  if (!isGeminiConfigured()) {
    return null;
  }
  return process.env.GEMINI_API_KEY!.trim();
}

export interface GeminiMessagePart {
  text: string;
}

export interface GeminiContent {
  role: "user" | "model";
  parts: GeminiMessagePart[];
}

/**
 * Initiates a streaming request to Google Gemini API (gemini-2.5-flash).
 * The API key is sent strictly server-to-server and is never returned to the client.
 */
export async function streamGeminiContent(
  contents: GeminiContent[],
  signal?: AbortSignal
): Promise<Response> {
  const key = getGeminiApiKey();
  if (!key) {
    throw new Error("AI_NOT_CONFIGURED");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse`;

  return fetch(endpoint, {
    method: "POST",
    headers: {
  "Content-Type": "application/json",
  "x-goog-api-key": key
},
    body: JSON.stringify({
      contents,
      generationConfig: {
        maxOutputTokens: 900,
        temperature: 0.25
      }
    }),
    signal
  });
}
