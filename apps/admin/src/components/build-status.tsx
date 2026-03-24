"use client";

import { useEffect, useState, useTransition } from "react";

interface Status {
  building: boolean;
  lastBuild: string | null;
  lastError: string | null;
}

export function BuildStatus() {
  const [status, setStatus] = useState<Status | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/build");
      setStatus(await res.json());
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBuild = () => {
    startTransition(async () => {
      await fetch("/api/build", { method: "POST" });
      setTimeout(fetchStatus, 1000);
    });
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleBuild}
        disabled={isPending || status?.building}
        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status?.building ? "Building..." : "Deploy"}
      </button>
      {status?.lastBuild && (
        <span className="text-xs text-gray-500">
          Last build: {new Date(status.lastBuild).toLocaleString()}
        </span>
      )}
      {status?.lastError && (
        <span className="text-xs text-red-600">Error: {status.lastError}</span>
      )}
    </div>
  );
}
