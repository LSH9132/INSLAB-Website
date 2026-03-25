"use client";

import { useEffect, useState, useTransition } from "react";
import { useToast } from "@/components/toast-provider";
import Link from "next/link";

interface Status {
  building: boolean;
  lastBuild: string | null;
  lastError: string | null;
}

export function BuildStatus() {
  const [status, setStatus] = useState<Status | null>(null);
  const [prevBuilding, setPrevBuilding] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/build");
      const data = await res.json();
      setStatus(data);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  // Toast when build completes
  useEffect(() => {
    if (prevBuilding && status && !status.building) {
      if (status.lastError) {
        toast("Build failed", "error");
      } else {
        toast("Build completed", "success");
      }
    }
    setPrevBuilding(status?.building ?? false);
  }, [status?.building]);

  const handleBuild = () => {
    startTransition(async () => {
      await fetch("/api/build", { method: "POST" });
      toast("Deploy triggered", "info");
      setTimeout(fetchStatus, 1000);
    });
  };

  return (
    <div className="flex items-center gap-4">
      <Link href="/preview" className="text-xs text-gray-500 hover:text-blue-600">
        Preview
      </Link>
      <button
        onClick={handleBuild}
        disabled={isPending || status?.building}
        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {status?.building && (
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        )}
        {status?.building ? "Building..." : "Deploy"}
      </button>
      {status?.lastBuild && (
        <Link href="/deploys" className="text-xs text-gray-500 hover:text-blue-600">
          Last: {new Date(status.lastBuild).toLocaleString()}
        </Link>
      )}
      {status?.lastError && (
        <span className="text-xs text-red-600">Error: {status.lastError}</span>
      )}
    </div>
  );
}
