"use client";

import { useState, useTransition } from "react";
import { useToast } from "@/components/toast-provider";

const DEVICES = [
  { label: "Desktop", width: "100%" },
  { label: "Tablet", width: "768px" },
  { label: "Mobile", width: "375px" },
] as const;

export function PreviewFrame({ siteUrl }: { siteUrl: string }) {
  const [locale, setLocale] = useState<"ko" | "en">("ko");
  const [device, setDevice] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const basePath = previewMode ? "/preview" : "";
  const iframeSrc = `${siteUrl}${basePath}/${locale}/`;

  const handlePreviewBuild = () => {
    startTransition(async () => {
      const res = await fetch("/api/build/preview", { method: "POST" });
      if (res.ok) {
        toast("Preview build triggered — refresh in a moment", "info");
        setPreviewMode(true);
      } else {
        toast("Preview build failed", "error");
      }
    });
  };

  const handleDeploy = () => {
    startTransition(async () => {
      await fetch("/api/build", { method: "POST" });
      toast("Deploy triggered", "info");
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Toolbar */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200 flex-wrap">
        <div className="flex rounded-md border border-gray-300 overflow-hidden text-xs">
          <button
            onClick={() => setLocale("ko")}
            className={`px-3 py-1.5 ${locale === "ko" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
          >
            KO
          </button>
          <button
            onClick={() => setLocale("en")}
            className={`px-3 py-1.5 ${locale === "en" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
          >
            EN
          </button>
        </div>

        <div className="flex rounded-md border border-gray-300 overflow-hidden text-xs">
          {DEVICES.map((d, i) => (
            <button
              key={d.label}
              onClick={() => setDevice(i)}
              className={`px-3 py-1.5 ${device === i ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="flex rounded-md border border-gray-300 overflow-hidden text-xs">
          <button
            onClick={() => setPreviewMode(false)}
            className={`px-3 py-1.5 ${!previewMode ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
          >
            Live
          </button>
          <button
            onClick={() => setPreviewMode(true)}
            className={`px-3 py-1.5 ${previewMode ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
          >
            Preview
          </button>
        </div>

        <button
          onClick={handlePreviewBuild}
          disabled={isPending}
          className="px-3 py-1.5 bg-amber-500 text-white rounded-md text-xs font-medium hover:bg-amber-600 disabled:opacity-50"
        >
          {isPending ? "Building..." : "Build Preview"}
        </button>

        <button
          onClick={handleDeploy}
          disabled={isPending}
          className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          Deploy
        </button>

        <a
          href={iframeSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-blue-600 ml-auto"
        >
          Open in new tab
        </a>
      </div>

      {/* iframe */}
      <div className="flex-1 flex justify-center pt-4 bg-gray-100 rounded-lg mt-4 overflow-hidden">
        <div
          style={{ width: DEVICES[device].width, maxWidth: "100%" }}
          className="h-full bg-white shadow-lg rounded-t-lg overflow-hidden transition-all duration-300"
        >
          <iframe
            src={iframeSrc}
            className="w-full h-full border-0"
            title="Site Preview"
          />
        </div>
      </div>
    </div>
  );
}
