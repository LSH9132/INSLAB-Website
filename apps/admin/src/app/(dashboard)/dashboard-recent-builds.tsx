"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BuildRecord {
  id: string;
  startedAt: string;
  completedAt: string | null;
  status: string;
  error: string | null;
  durationMs: number;
}

const statusColors: Record<string, string> = {
  success: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  building: "bg-yellow-100 text-yellow-700",
};

export function DashboardRecentBuilds() {
  const [builds, setBuilds] = useState<BuildRecord[]>([]);

  useEffect(() => {
    fetch("/api/build/history")
      .then((r) => r.json())
      .then((data) => setBuilds((data.builds ?? []).slice(0, 3)))
      .catch(() => {});
  }, []);

  if (builds.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">Recent Builds</h3>
        <Link href="/deploys" className="text-xs text-blue-600 hover:underline">
          View all
        </Link>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
        {builds.map((b) => (
          <div key={b.id} className="px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-gray-600">{b.id}</p>
              <p className="text-xs text-gray-400">
                {b.startedAt ? new Date(b.startedAt).toLocaleString() : "-"}
                {b.durationMs ? ` (${(b.durationMs / 1000).toFixed(1)}s)` : ""}
              </p>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[b.status] ?? "bg-gray-100 text-gray-700"}`}>
              {b.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
