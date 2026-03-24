const BUILDER_URL = process.env.BUILDER_URL || "http://builder:4000";

export interface BuildStatus {
  building: boolean;
  lastBuild: string | null;
  lastError: string | null;
}

export async function triggerBuild(): Promise<{ status: string } | { error: string }> {
  const res = await fetch(`${BUILDER_URL}/api/build`, { method: "POST" });
  return res.json();
}

export async function getBuildStatus(): Promise<BuildStatus> {
  const res = await fetch(`${BUILDER_URL}/api/status`);
  return res.json();
}
