"use client";

import { useEffect, useState, useTransition } from "react";
import { useToast } from "@/components/toast-provider";

interface BuildRecord {
  id: string;
  startedAt: string;
  completedAt: string | null;
  status: "building" | "success" | "failed";
  error: string | null;
  durationMs: number;
}

export function DeployHistory() {
  const [builds, setBuilds] = useState<BuildRecord[]>([]);
  const [activeBuild, setActiveBuild] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/build/history");
      const data = await res.json();
      setBuilds(data.builds ?? []);
      setActiveBuild(data.activeBuild ?? null);
    } catch {
      // Builder unreachable
    }
  };

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRollback = (buildId: string) => {
    if (!confirm(`Rollback to ${buildId}?`)) return;
    startTransition(async () => {
      const res = await fetch("/api/build/rollback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buildId }),
      });
      if (res.ok) {
        toast("Rolled back successfully", "success");
        fetchHistory();
      } else {
        toast("Rollback failed", "error");
      }
    });
  };

  const handleDeploy = () => {
    startTransition(async () => {
      await fetch("/api/build", { method: "POST" });
      toast("Deploy triggered", "info");
      setTimeout(fetchHistory, 1000);
    });
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      success: "bg-green-100 text-green-700",
      failed: "bg-red-100 text-red-700",
      building: "bg-yellow-100 text-yellow-700",
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] ?? "bg-gray-100 text-gray-700"}`}>
        {status}
      </span>
    );
  };

  const isBuilding = builds.some((b) => b.status === "building");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Deploy History</h2>
        <button
          onClick={handleDeploy}
          disabled={isPending || isBuilding}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {isBuilding ? "Building..." : "New Deploy"}
        </button>
      </div>

      {builds.length === 0 ? (
        <p className="text-gray-400 text-sm">No builds yet. Click &quot;New Deploy&quot; to start.</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Build ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Time</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Duration</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {builds.map((b) => (
                <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs">
                    {b.id}
                    {b.id === activeBuild && (
                      <span className="ml-2 text-xs text-green-600 font-medium">LIVE</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {b.startedAt ? new Date(b.startedAt).toLocaleString() : "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {b.durationMs ? `${(b.durationMs / 1000).toFixed(1)}s` : "-"}
                  </td>
                  <td className="px-4 py-3">
                    {statusBadge(b.status)}
                    {b.error && (
                      <p className="text-xs text-red-500 mt-1 max-w-xs truncate" title={b.error}>
                        {b.error}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {b.status === "success" && b.id !== activeBuild && (
                      <button
                        onClick={() => handleRollback(b.id)}
                        disabled={isPending}
                        className="text-blue-600 hover:underline text-xs disabled:opacity-50"
                      >
                        Rollback
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
