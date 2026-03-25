const BUILDER_URL = process.env.BUILDER_URL || "http://builder:4000";

export interface BuildStatus {
  building: boolean;
  lastBuild: string | null;
  lastError: string | null;
}

export interface BuildRecord {
  id: string;
  startedAt: string;
  completedAt: string | null;
  status: "building" | "success" | "failed";
  error: string | null;
  durationMs: number;
}

export async function triggerBuild(): Promise<{ status: string } | { error: string }> {
  const res = await fetch(`${BUILDER_URL}/api/build`, { method: "POST" });
  return res.json();
}

export async function getBuildStatus(): Promise<BuildStatus> {
  const res = await fetch(`${BUILDER_URL}/api/status`);
  return res.json();
}

export async function getBuildHistory(): Promise<{ builds: BuildRecord[]; activeBuild: string | null }> {
  const res = await fetch(`${BUILDER_URL}/api/history`);
  return res.json();
}

export async function rollbackBuild(buildId: string) {
  const res = await fetch(`${BUILDER_URL}/api/rollback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ buildId }),
  });
  return res.json();
}

export async function triggerPreviewBuild() {
  const res = await fetch(`${BUILDER_URL}/api/preview-build`, { method: "POST" });
  return res.json();
}
