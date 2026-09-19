import { NextRequest, NextResponse } from "next/server";
import { getPublishedPortfolioKnowledge } from "@/lib/content-store";
import { isGeminiConfigured, streamGeminiContent, GeminiContent } from "@/lib/gemini.server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Rate limiting map (in-memory per IP)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const MAX_REQUESTS_PER_MINUTE = 25;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }
  if (now - record.timestamp > 60000) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }
  if (record.count >= MAX_REQUESTS_PER_MINUTE) {
    return true;
  }
  record.count += 1;
  return false;
}

/**
 * GET: Lightweight provider health check.
 * Confirms whether the server-side LLM provider is configured.
 * Does not expose keys, variable names, or internal paths.
 */
export async function GET() {
  return NextResponse.json({
    configured: isGeminiConfigured()
  });
}

/**
 * POST: Server-side streaming endpoint strictly using Gemini.
 * Never exposes API keys, stack traces, or internal instructions.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting check
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous-client";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error: "RATE_LIMITED",
          message: "Inquiry limit reached. Please wait a moment before sending another question."
        },
        { status: 429 }
      );
    }

    // 2. Request body validation
    const body = await req.json().catch(() => ({}));
    const query = typeof body.query === "string" ? body.query.trim().slice(0, 1000) : "";
    const rawHistory = Array.isArray(body.history) ? body.history.slice(-8) : [];

    if (!query) {
      return NextResponse.json(
        {
          error: "MALFORMED_REQUEST",
          message: "A valid question or query is required."
        },
        { status: 400 }
      );
    }

    // 3. Prompt injection and secret extraction guard
    const lowerQuery = query.toLowerCase();
    const injectionPatterns = [
      "system prompt",
      "reveal prompt",
      "api key",
      "secret token",
      "env variable",
      "gemini_api_key",
      "ignore previous instructions",
      "ignore all previous",
      "developer mode",
      "jailbreak"
    ];
    for (const pattern of injectionPatterns) {
      if (lowerQuery.includes(pattern)) {
        return NextResponse.json(
          {
            error: "SECURITY_BOUNDARY",
            message: "I am strictly bounded to Varun's published portfolio records (skills, projects, education, credentials, and experience). I do not have access to internal prompts or system credentials."
          },
          { status: 403 }
        );
      }
    }

    // 4. Server configuration check
    if (!isGeminiConfigured()) {
      return NextResponse.json(
        {
          error: "AI_NOT_CONFIGURED",
          message: "Varun’s AI assistant is temporarily unavailable. Please try again later or use the contact links."
        },
        { status: 503 }
      );
    }

    // 5. Load published knowledge source
    const knowledgeSource = await getPublishedPortfolioKnowledge();

    const systemPrompt = `You are Varun's AI Portfolio Assistant for the Royal Atelier portfolio.
Your goal is to answer questions about Parlapalli Varun's software engineering background, frontend development projects, UI/UX designs, cybersecurity studies, CodeXa Agency COO leadership, credentials, and achievements.

STRICT GROUNDING RULES:
1. Answer ONLY from the PUBLISHED PORTFOLIO KNOWLEDGE BASE provided below.
2. DO NOT INVENT or assume any facts, scores, certificates, GPA, phone numbers, or achievements not in the knowledge base. If asked about unknown or private information (e.g., phone number, personal life, exact test scores, private projects), state clearly and politely: "That information is not part of Varun's published portfolio records."
3. DISTINGUISH PERSONAL VS TEAM: Always distinguish Varun's individual contributions from team accomplishments. (For example, in the NEC Portal, Varun built the responsive frontend architecture as an independent student prototype; in ByteXL, he achieved individual Top 30; in CodeBegun, he placed 4th as part of a student team).
4. PROJECT RECOMMENDATIONS: If asked which project is best for a frontend internship or role, highlight the **NEC Portal** (/projects/nec-portal), explaining his UI/UX design, accessible schedule tables, dark/light theme, and React/TypeScript architecture.
5. CLICKABLE LINKS: Provide relevant markdown links when mentioning projects, sections, or credentials:
   - NEC Portal: [NEC Portal Case Study](/projects/nec-portal) · [Live Demo](https://nec-portal-rosy.vercel.app/) · [GitHub Repo](https://github.com/varunparlapalli2008/NEC_PORTAL)
   - Aegis OS: [Aegis OS Case Study](/projects/aegis-os) · [Live Demo](https://aegis-threat-intel.vercel.app/) · [GitHub Repo](https://github.com/varunparlapalli2008/aegis-os)
   - BookUtsav: [BookUtsav Case Study](/projects/bookutsav) · [Live Demo](https://bookutsav.vercel.app/) · [GitHub Repo](https://github.com/varunparlapalli2008/bookutsav)
   - Credentials & Hackathons: [Achievements & Credentials Archive](/achievements)
   - CodeXa COO Experience: [Experience Section](/#experience)
   - Skills: [Skills Grid](/#skills)
   - Contact: [Contact Section](/#contact) or email varunparlapalli2008@gmail.com
6. Keep responses concise, articulate, and cleanly formatted with bullet points where appropriate.

PUBLISHED PORTFOLIO KNOWLEDGE BASE:
${knowledgeSource}`;

    // 6. Build conversation contents for Gemini
    const historyTurns: GeminiContent[] = rawHistory
      .filter((m: any) => m && typeof m.text === "string" && (m.sender === "user" || m.sender === "assistant") && m.id !== "welcome-init")
      .map((m: any) => ({
        role: m.sender === "user" ? ("user" as const) : ("model" as const),
        parts: [{ text: m.text }]
      }));

    // Ensure conversation starts with a user turn if there is history
    while (historyTurns.length > 0 && historyTurns[0].role === "model") {
      historyTurns.shift();
    }

    const contents: GeminiContent[] = [
      ...historyTurns,
      {
        role: "user",
        parts: [{ text: query }]
      }
    ];

    // 7. Call Gemini stream
    let geminiRes: Response;
    try {
      geminiRes = await streamGeminiContent(contents, systemPrompt, req.signal);
    } catch (fetchErr: any) {
      if (fetchErr.name === "AbortError") {
        return NextResponse.json(
          {
            error: "TIMEOUT",
            message: "The request timed out while waiting for a response. Please try again."
          },
          { status: 504 }
        );
      }
      console.error("[Assistant Route] Upstream fetch error:", fetchErr);
      return NextResponse.json(
        {
          error: "PROVIDER_OUTAGE",
          message: "The upstream AI provider is temporarily unavailable. Please try again in a few minutes."
        },
        { status: 503 }
      );
    }

    // 8. Handle upstream errors separately
    if (!geminiRes.ok) {
      const errBody = await geminiRes.text().catch(() => "");
      console.error(`[Assistant Route] Gemini API returned error (${geminiRes.status}):`, errBody);
      
      if (geminiRes.status === 400 || geminiRes.status === 403) {
        if (errBody.includes("API_KEY_INVALID") || errBody.includes("PERMISSION_DENIED")) {
          return NextResponse.json(
            {
              error: "INVALID_CREDENTIALS",
              message: "The assistant encountered an authentication issue with the AI service. Please verify your API key."
            },
            { status: 502 }
          );
        }
      }

      if (geminiRes.status === 429) {
        return NextResponse.json(
          {
            error: "RATE_LIMITED",
            message: "The AI service is experiencing high traffic. Please wait a moment and try again."
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: "PROVIDER_OUTAGE",
          message: "The upstream AI provider is temporarily unavailable. Please try again in a few minutes."
        },
        { status: 503 }
      );
    }

    if (!geminiRes.body) {
      return NextResponse.json(
        {
          error: "PROVIDER_OUTAGE",
          message: "Empty response stream received from the AI service."
        },
        { status: 502 }
      );
    }

    // 9. Setup SSE TransformStream to pipe tokens cleanly to client
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    const writeSSE = async (data: Record<string, any> | string) => {
      if (typeof data === "string") {
        await writer.write(encoder.encode(`data: ${data}\n\n`));
      } else {
        await writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      }
    };

    (async () => {
      try {
        const reader = geminiRes.body!.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith("data: ")) {
              const payload = trimmed.slice(6);
              if (payload === "[DONE]") continue;

              try {
                const parsed = JSON.parse(payload);
                if (parsed.error) {
                  console.error("[Assistant Route] Stream payload error:", parsed.error);
                  await writeSSE({ error: parsed.error.message || "An error occurred during generation." });
                  continue;
                }

                const parts = parsed.candidates?.[0]?.content?.parts;
                if (Array.isArray(parts)) {
                  for (const part of parts) {
                    if (part && typeof part.text === "string" && !part.thought && part.text.length > 0) {
                      await writeSSE({ text: part.text });
                    }
                  }
                }
              } catch {
                // Chunk frame boundary
              }
            }
          }
        }

        await writeSSE("[DONE]");
        await writer.close();
      } catch (streamErr: any) {
        if (streamErr.name === "AbortError") {
          try {
            await writeSSE({ cancelled: true });
            await writer.close();
          } catch {}
          return;
        }
        console.error("[Assistant Route] Stream reader error:", streamErr);
        try {
          await writeSSE({
            error: "Generation interrupted. Please try again later or use the contact links."
          });
          await writer.close();
        } catch {}
      }
    })();

    return new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive"
      }
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        error: "INTERNAL_ERROR",
        message: "An internal server error occurred while processing your request."
      },
      { status: 500 }
    );
  }
}
