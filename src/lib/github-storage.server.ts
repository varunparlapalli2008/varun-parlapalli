import fs from "fs";
import path from "path";

const DEFAULT_REPO = "varunparlapalli2008/varun-parlapalli";
const DEFAULT_PATH = "data/portfolio-store.json";

const LOCAL_DATA_DIR = path.join(process.cwd(), "data");
const LOCAL_DATA_FILE = path.join(LOCAL_DATA_DIR, "portfolio-store.json");

export interface StoragePersistenceResult {
  success: boolean;
  destination: "github" | "local";
  message: string;
  error?: string;
  sha?: string;
}

export function isGitHubStorageConfigured(): boolean {
  return Boolean(process.env.GITHUB_CONTENT_TOKEN?.trim());
}

export function getGitHubStorageConfig() {
  const token = process.env.GITHUB_CONTENT_TOKEN?.trim();
  const repo = process.env.GITHUB_REPO?.trim() || DEFAULT_REPO;
  const contentPath = process.env.GITHUB_CONTENT_PATH?.trim() || DEFAULT_PATH;
  return { token, repo, contentPath };
}

/**
 * Reads the latest content from GitHub Contents API.
 */
export async function fetchContentFromGitHub<T = unknown>(): Promise<{ data: T; sha: string }> {
  const { token, repo, contentPath } = getGitHubStorageConfig();
  if (!token) {
    throw new Error("GITHUB_CONTENT_TOKEN is not configured.");
  }

  const url = `https://api.github.com/repos/${repo}/contents/${contentPath}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "ParlapalliVarunPortfolio-Studio"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`GitHub Contents API error (${response.status}): ${errText}`);
  }

  const result = await response.json();
  const contentBase64 = result.content?.replace(/\n/g, "") || "";
  const decodedString = Buffer.from(contentBase64, "base64").toString("utf-8");
  const data = JSON.parse(decodedString) as T;

  return { data, sha: result.sha };
}

/**
 * Commits updated content to GitHub repository via Contents API.
 */
export async function commitContentToGitHub<T = unknown>(
  data: T,
  commitMessage = "Update portfolio content via Royal Atelier Studio"
): Promise<{ sha: string }> {
  const { token, repo, contentPath } = getGitHubStorageConfig();
  if (!token) {
    throw new Error("GITHUB_CONTENT_TOKEN is not configured.");
  }

  // 1. Get current SHA
  let currentSha = "";
  try {
    const existing = await fetchContentFromGitHub();
    currentSha = existing.sha;
  } catch (error) {
    console.warn("Could not fetch existing file SHA, creating new file if absent:", error);
  }

  // 2. Prepare payload
  const jsonString = JSON.stringify(data, null, 2);
  const contentBase64 = Buffer.from(jsonString, "utf-8").toString("base64");

  const url = `https://api.github.com/repos/${repo}/contents/${contentPath}`;
  const bodyPayload: Record<string, unknown> = {
    message: commitMessage,
    content: contentBase64,
    branch: "main"
  };
  if (currentSha) {
    bodyPayload.sha = currentSha;
  }

  const putResponse = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "ParlapalliVarunPortfolio-Studio"
    },
    body: JSON.stringify(bodyPayload)
  });

  if (!putResponse.ok) {
    const errorBody = await putResponse.text();
    throw new Error(`GitHub Commit failed (${putResponse.status}): ${errorBody}`);
  }

  const putResult = await putResponse.json();
  return { sha: putResult.content?.sha || "" };
}

let memoryStore: unknown = null;
const SERVERLESS_TMP_FILE = path.join(process.platform === "win32" ? process.cwd() : "/tmp", "portfolio-store.json");

/**
 * Reads portfolio storage:
 * Checks GitHub if configured, otherwise reads local filesystem.
 */
export async function readPortfolioStorage<T = unknown>(fallbackInitial: T): Promise<T> {
  if (memoryStore) {
    return memoryStore as T;
  }

  // If GitHub token is present, try remote first
  if (isGitHubStorageConfigured()) {
    try {
      const { data } = await fetchContentFromGitHub<T>();
      memoryStore = data;
      // Sync local file if running locally with token
      try {
        if (!fs.existsSync(LOCAL_DATA_DIR)) fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
        fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
      } catch {
        // Read-only filesystem is normal in serverless
      }
      return data;
    } catch (err) {
      console.error("Error reading from GitHub Contents API, falling back to local file:", err);
    }
  }

  // Check /tmp file for serverless environments
  try {
    if (fs.existsSync(SERVERLESS_TMP_FILE)) {
      const content = fs.readFileSync(SERVERLESS_TMP_FILE, "utf-8");
      const parsed = JSON.parse(content) as T;
      memoryStore = parsed;
      return parsed;
    }
  } catch {}

  // Fallback to local file
  try {
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const content = fs.readFileSync(LOCAL_DATA_FILE, "utf-8");
      return JSON.parse(content) as T;
    }
  } catch (error) {
    console.warn("Could not read local data file:", error);
  }

  return fallbackInitial;
}

/**
 * Saves portfolio storage:
 * In production/Vercel, requires GitHub Contents API token.
 * In local development, falls back to writing data/portfolio-store.json.
 */
export async function writePortfolioStorage<T = unknown>(data: T): Promise<StoragePersistenceResult> {
  const isVercelProduction = Boolean(process.env.VERCEL);
  memoryStore = data;

  // 1. If GitHub token is configured, push commit to repository
  if (isGitHubStorageConfigured()) {
    try {
      const commitRes = await commitContentToGitHub(data);
      // Also update local copy if filesystem is writable
      try {
        if (!fs.existsSync(LOCAL_DATA_DIR)) fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
        fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
      } catch {
        // Expected in serverless
      }

      return {
        success: true,
        destination: "github",
        sha: commitRes.sha,
        message: "Successfully committed and published updates to GitHub repository (data/portfolio-store.json)."
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        destination: "github",
        message: "Failed to commit changes to GitHub.",
        error: message
      };
    }
  }

  // 2. If running on Vercel without token, save to serverless session & tmp
  if (isVercelProduction) {
    try {
      fs.writeFileSync(SERVERLESS_TMP_FILE, JSON.stringify(data, null, 2), "utf-8");
    } catch {}

    return {
      success: true,
      destination: "local",
      message: "Updates saved to active serverless session (configure GITHUB_CONTENT_TOKEN in Vercel for permanent GitHub commits)."
    };
  }

  // 3. In local development/preview without token, write to local file
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(data, null, 2), "utf-8");

    return {
      success: true,
      destination: "local",
      message: "Updates saved to local data/portfolio-store.json. (To sync with GitHub on live domain, configure GITHUB_CONTENT_TOKEN)."
    };
  } catch (error) {
    console.error("Failed to write to local storage file:", error);
    return {
      success: false,
      destination: "local",
      message: "Failed to write to local data file.",
      error: error instanceof Error ? error.message : "Filesystem write failure"
    };
  }
}
