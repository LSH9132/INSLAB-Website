"use client";

import { useEffect, useState, useTransition } from "react";
import { useToast } from "@/components/toast-provider";
import Link from "next/link";

interface Status {
  building: boolean;
  lastBuild: string | null;
  lastError: string | null;
}

export function DashboardBuildCard() {
  const [status, setStatus] = useState<Status | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/build");
        if (res.ok) setStatus(await res.json());
      } catch { /* ignore */ }
    };
    fetch_();
    const interval = setInterval(fetch_, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDeploy = () => {
    startTransition(async () => {
      await fetch("/api/build", { method: "POST" });
      toast("Deploy triggered", "info");
    });
  };

  const dot = status?.building
    ? "bg-yellow-400 animate-pulse"
    : status?.lastError
      ? "bg-red-400"
      : "bg-green-400";

  const label = status?.building
    ? "Building..."
    : status?.lastError
      ? "Last build failed"
      : status?.lastBuild
        ? "Idle"
        : "No builds yet";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className={`w-3 h-3 rounded-full ${dot}`} />
        <div>
          <p className="text-sm font-medium text-gray-900">{label}</p>
          {status?.lastBuild && (
            <p className="text-xs text-gray-500">
              Last deploy: {new Date(status.lastBuild).toLocaleString()}
            </p>
          )}
          {status?.lastError && (
            <p className="text-xs text-red-500 mt-0.5 truncate max-w-md">
              {status.lastError}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/deploys" className="text-xs text-gray-500 hover:text-blue-600">
          View history
        </Link>
        <button
          onClick={handleDeploy}
          disabled={isPending || status?.building}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          Deploy Now
        </button>
      </div>
    </div>
  );
}
