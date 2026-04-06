"use client";

import { useEffect, useState, useCallback, useTransition } from "react";
import { useToast } from "@/components/toast-provider";

interface BuildStatus {
  building: boolean;
  lastBuild: string | null;
  lastError: string | null;
  currentBuildId?: string | null;
}

interface BuildRecord {
  id: string;
  startedAt: string;
  completedAt: string | null;
  status: "building" | "success" | "failed";
  error: string | null;
  durationMs: number;
}

type Tab = "status" | "history" | "info" | "errors";

const SITE_URL = typeof window !== "undefined" ? window.location.origin.replace(":3000", "") : "";
const PREVIEW_URL = SITE_URL ? SITE_URL.replace(/:\d+$/, "") + ":9980" : "";

export function FloatingPanel() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("status");
  const [status, setStatus] = useState<BuildStatus | null>(null);
  const [builds, setBuilds] = useState<BuildRecord[]>([]);
  const [activeBuild, setActiveBuild] = useState<string | null>(null);
  const [buildStart, setBuildStart] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [rollbackTarget, setRollbackTarget] = useState<string | null>(null);
  const { toast } = useToast();

  // ── Fetch status ────────────────────────────────────────────────
  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/build");
      const data: BuildStatus = await res.json();
      setStatus(data);
    } catch {
      /* builder unreachable */
    }
  }, []);

  // ── Fetch history ───────────────────────────────────────────────
  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch("/api/build/history");
      const data = await res.json();
      setBuilds(data.builds ?? []);
      setActiveBuild(data.activeBuild ?? null);
    } catch {
      /* builder unreachable */
    }
  }, []);

  // ── Polling: status always, history only when panel open ────────
  useEffect(() => {
    fetchStatus();
    const ms = status?.building ? 2000 : 5000;
    const id = setInterval(() => {
      fetchStatus();
      if (open) fetchHistory();
    }, ms);
    return () => clearInterval(id);
  }, [open, status?.building, fetchStatus, fetchHistory]);

  // Load history when panel opens
  useEffect(() => {
    if (open) fetchHistory();
  }, [open, fetchHistory]);

  // ── Elapsed timer while building ───────────────────────────────
  useEffect(() => {
    if (status?.building) {
      const building = builds.find((b) => b.status === "building");
      const start = building ? new Date(building.startedAt).getTime() : Date.now();
      setBuildStart(start);
    } else {
      setBuildStart(null);
    }
  }, [status?.building, builds]);

  useEffect(() => {
    if (!buildStart) { setElapsed(0); return; }
    const id = setInterval(() => setElapsed(Date.now() - buildStart), 1000);
    return () => clearInterval(id);
  }, [buildStart]);

  // ── Actions ─────────────────────────────────────────────────────
  const handleDeploy = () => {
    startTransition(async () => {
      await fetch("/api/build", { method: "POST" });
      toast("Deploy triggered", "info");
      setTimeout(fetchStatus, 1000);
      setTimeout(fetchHistory, 1500);
    });
  };

  const handlePreviewBuild = () => {
    startTransition(async () => {
      await fetch("/api/build/preview", { method: "POST" });
      toast("Preview build triggered", "info");
      setTimeout(fetchStatus, 1000);
    });
  };

  const handleRollback = (buildId: string) => {
    startTransition(async () => {
      const res = await fetch("/api/build/rollback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buildId }),
      });
      setRollbackTarget(null);
      if (res.ok) {
        toast("Rolled back successfully", "success");
        fetchHistory();
      } else {
        toast("Rollback failed", "error");
      }
    });
  };

  // ── Helpers ─────────────────────────────────────────────────────
  const formatTime = (iso: string) => new Date(iso).toLocaleString();
  const formatDuration = (ms: number) => `${(ms / 1000).toFixed(1)}s`;
  const formatElapsed = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
  };

  const isBuilding = status?.building ?? false;
  const hasError = !isBuilding && !!status?.lastError;

  const successCount = builds.filter((b) => b.status === "success").length;
  const failedCount = builds.filter((b) => b.status === "failed").length;

  const dotColor = isBuilding
    ? "bg-yellow-400 animate-pulse"
    : hasError
      ? "bg-red-500"
      : "bg-green-500";

  // ── Closed: floating button ─────────────────────────────────────
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-gray-900 text-white shadow-lg flex items-center justify-center hover:bg-gray-800 transition-all hover:scale-105"
        title={hasError ? `Open dashboard panel — ${failedCount} error(s)` : "Open dashboard panel"}
      >
        <span className={`absolute top-2 right-2 w-3 h-3 rounded-full ${dotColor} ring-2 ring-gray-900`} />
        {failedCount > 0 && !isBuilding && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white">
            {failedCount > 9 ? "9+" : failedCount}
          </span>
        )}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      </button>
    );
  }

  // ── Open: panel ─────────────────────────────────────────────────
  const tabs: { key: Tab; label: string }[] = [
    { key: "status", label: "Status" },
    { key: "history", label: "History" },
    { key: "errors", label: "Errors" },
    { key: "info", label: "Site Info" },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 w-96 max-h-[80vh] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
          <span className="text-sm font-semibold text-gray-800">
            {isBuilding ? "Building..." : hasError ? "Last build failed" : "System OK"}
          </span>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="text-gray-400 hover:text-gray-600 p-1"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 text-xs font-medium py-2.5 transition-colors ${
              tab === t.key
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* ── Status Tab ─────────────────────────────────────────── */}
        {tab === "status" && (
          <div className="p-4 space-y-4">
            {/* Current state */}
            <div className="rounded-lg bg-gray-50 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Status</span>
                <span className={`text-xs font-semibold ${
                  isBuilding ? "text-yellow-600" : hasError ? "text-red-600" : "text-green-600"
                }`}>
                  {isBuilding ? "BUILDING" : hasError ? "FAILED" : "IDLE"}
                </span>
              </div>

              {isBuilding && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Elapsed</span>
                    <span className="text-xs font-mono text-yellow-700">{formatElapsed(elapsed)}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full animate-pulse" style={{ width: "60%" }} />
                  </div>
                </>
              )}

              {!isBuilding && status?.lastBuild && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Last deploy</span>
                  <span className="text-xs text-gray-700">{formatTime(status.lastBuild)}</span>
                </div>
              )}

              {hasError && (
                <div className="mt-1 p-2 bg-red-50 border border-red-100 rounded text-xs text-red-600 break-words">
                  {status?.lastError}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleDeploy}
                disabled={isPending || isBuilding}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isBuilding ? "Building..." : "Deploy Now"}
              </button>
              <button
                onClick={handlePreviewBuild}
                disabled={isPending || isBuilding}
                className="flex-1 px-3 py-2 bg-amber-500 text-white rounded-lg text-xs font-medium hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Preview Build
              </button>
            </div>
          </div>
        )}

        {/* ── History Tab ────────────────────────────────────────── */}
        {tab === "history" && (
          <div className="divide-y divide-gray-100">
            {builds.length === 0 ? (
              <div className="p-4 text-center text-xs text-gray-400">No builds yet</div>
            ) : (
              builds.map((b) => (
                <div key={b.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StatusDot status={b.status} />
                      <span className="font-mono text-xs text-gray-700">
                        {b.id.replace("build-", "")}
                      </span>
                      {b.id === activeBuild && (
                        <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold">
                          LIVE
                        </span>
                      )}
                    </div>
                    <StatusBadge status={b.status} />
                  </div>

                  <div className="mt-1 flex items-center justify-between text-[11px] text-gray-400">
                    <span>{formatTime(b.startedAt)}</span>
                    <span>{b.durationMs ? formatDuration(b.durationMs) : "-"}</span>
                  </div>

                  {b.error && (
                    <p className="mt-1 text-[11px] text-red-500 truncate" title={b.error}>{b.error}</p>
                  )}

                  {b.status === "success" && b.id !== activeBuild && (
                    <div className="mt-2">
                      {rollbackTarget === b.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-gray-500">Rollback to this build?</span>
                          <button
                            onClick={() => handleRollback(b.id)}
                            disabled={isPending}
                            className="px-2 py-0.5 bg-red-500 text-white rounded text-[11px] hover:bg-red-600 disabled:opacity-50"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setRollbackTarget(null)}
                            className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-[11px] hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setRollbackTarget(b.id)}
                          className="text-[11px] text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          Rollback to this version
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* ── Errors Tab ────────────────────────────────────────── */}
        {tab === "errors" && (
          <div className="p-4 space-y-3">
            {/* Build errors */}
            {builds.filter((b) => b.status === "failed").length > 0 ? (
              <>
                <span className="text-xs font-semibold text-gray-700">Build Errors</span>
                <div className="space-y-2">
                  {builds.filter((b) => b.status === "failed").slice(0, 5).map((b) => (
                    <div key={b.id} className="bg-red-50 border border-red-100 rounded-md p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] text-red-800">{b.id.replace("build-", "")}</span>
                        <span className="text-[10px] text-red-500">{formatTime(b.startedAt)}</span>
                      </div>
                      <p className="text-xs text-red-600 break-words">{b.error}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <span className="text-2xl">&#10003;</span>
                <p className="text-sm text-green-700 font-medium mt-1">No errors</p>
                <p className="text-xs text-gray-400 mt-1">All recent builds succeeded</p>
              </div>
            )}

            {/* Content validation tips */}
            <div className="border-t border-gray-100 pt-3 mt-3">
              <span className="text-xs font-semibold text-gray-700">Troubleshooting Guide</span>
              <div className="mt-2 space-y-2 text-[11px] text-gray-500">
                <div className="bg-gray-50 rounded p-2">
                  <span className="font-medium text-gray-700">Build failed?</span>
                  <p>YAML/JSON 문법 오류 또는 스키마 불일치. 최근 수정한 콘텐츠를 확인하세요.</p>
                </div>
                <div className="bg-gray-50 rounded p-2">
                  <span className="font-medium text-gray-700">Page not updating?</span>
                  <p>콘텐츠 저장 후 Deploy 버튼을 눌러 사이트를 다시 빌드하세요.</p>
                </div>
                <div className="bg-gray-50 rounded p-2">
                  <span className="font-medium text-gray-700">i18n Messages?</span>
                  <p>JSON 최상위에 nav, footer, home, publications, Director, team, research, contact, news, join 키가 모두 있어야 합니다.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Site Info Tab ──────────────────────────────────────── */}
        {tab === "info" && (
          <div className="p-4 space-y-3">
            <InfoRow label="Live Build" value={activeBuild?.replace("build-", "") ?? "-"} mono />
            <InfoRow
              label="Site URL"
              value={SITE_URL || "http://localhost"}
              href={SITE_URL || "http://localhost"}
            />
            <InfoRow
              label="Preview URL"
              value={PREVIEW_URL || "http://localhost:9980"}
              href={PREVIEW_URL || "http://localhost:9980"}
            />

            <div className="border-t border-gray-100 pt-3 mt-3">
              <span className="text-xs text-gray-500 font-medium">Build Stats</span>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <StatCard label="Total" value={builds.length} />
                <StatCard label="Success" value={successCount} color="green" />
                <StatCard label="Failed" value={failedCount} color="red" />
              </div>
              {builds.length > 0 && (
                <div className="mt-2 w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
                  {successCount > 0 && (
                    <div
                      className="h-full bg-green-400"
                      style={{ width: `${(successCount / builds.length) * 100}%` }}
                    />
                  )}
                  {failedCount > 0 && (
                    <div
                      className="h-full bg-red-400"
                      style={{ width: `${(failedCount / builds.length) * 100}%` }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────

function StatusDot({ status }: { status: string }) {
  const color =
    status === "success" ? "bg-green-500" :
    status === "failed" ? "bg-red-500" :
    "bg-yellow-400 animate-pulse";
  return <span className={`w-2 h-2 rounded-full ${color}`} />;
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    success: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    building: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${styles[status] ?? "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}

function InfoRow({ label, value, href, mono }: { label: string; value: string; href?: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-500">{label}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline truncate max-w-[200px]"
        >
          {value}
        </a>
      ) : (
        <span className={`text-xs text-gray-800 ${mono ? "font-mono" : ""}`}>{value}</span>
      )}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color?: string }) {
  const textColor = color === "green" ? "text-green-700" : color === "red" ? "text-red-700" : "text-gray-800";
  return (
    <div className="bg-gray-50 rounded-lg p-2 text-center">
      <div className={`text-lg font-bold ${textColor}`}>{value}</div>
      <div className="text-[10px] text-gray-500">{label}</div>
    </div>
  );
}
