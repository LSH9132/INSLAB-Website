"use client";

import { useRef, useState, useTransition } from "react";
import { useToast } from "@/components/toast-provider";

const DEVICES = [
  { label: "Desktop", width: "100%" },
  { label: "Tablet", width: "768px" },
  { label: "Mobile", width: "375px" },
] as const;

const PAGES = [
  { label: "Home", path: "/" },
  { label: "Team", path: "/team" },
  { label: "Publications", path: "/publications" },
  { label: "Research", path: "/research" },
  { label: "News", path: "/news" },
  { label: "Director", path: "/director" },
  { label: "Contact", path: "/contact" },
  { label: "Join", path: "/join" },
];

export function PreviewFrame({
  siteUrl,
  previewUrl,
}: {
  siteUrl: string;
  previewUrl: string;
}) {
  const [locale, setLocale] = useState<"ko" | "en">("ko");
  const [device, setDevice] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [pagePath, setPagePath] = useState("/");
  const [urlInput, setUrlInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const baseUrl = previewMode ? previewUrl : siteUrl;
  const fullPath = `/${locale}${pagePath === "/" ? "/" : pagePath + "/"}`;
  const iframeSrc = `${baseUrl}${fullPath}`;

  const handlePreviewBuild = () => {
    startTransition(async () => {
      const res = await fetch("/api/build/preview", { method: "POST" });
      if (res.ok) {
        toast("Preview build triggered", "info");
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

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = urlInput.trim().replace(/^\//, "").replace(/\/$/, "");
    // Parse: "ko/team" → locale=ko, path=/team
    const parts = trimmed.split("/");
    if (parts[0] === "ko" || parts[0] === "en") {
      setLocale(parts[0] as "ko" | "en");
      setPagePath("/" + parts.slice(1).join("/") || "/");
    } else {
      setPagePath("/" + trimmed || "/");
    }
  };

  const handlePageSelect = (path: string) => {
    setPagePath(path);
    setUrlInput("");
  };

  const refresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeSrc;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Toolbar */}
      <div className="flex items-center gap-3 pb-3 border-b border-gray-200 flex-wrap">
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
            className={`px-3 py-1.5 ${previewMode ? "bg-amber-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
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

      {/* URL Bar */}
      <div className="flex items-center gap-2 py-2 border-b border-gray-100">
        <span className={`text-xs px-2 py-0.5 rounded font-medium ${previewMode ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
          {previewMode ? "PREVIEW" : "LIVE"}
        </span>

        <select
          value={pagePath}
          onChange={(e) => handlePageSelect(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-xs"
        >
          {PAGES.map((p) => (
            <option key={p.path} value={p.path}>{p.label}</option>
          ))}
        </select>

        <form onSubmit={handleUrlSubmit} className="flex-1 flex gap-1">
          <input
            type="text"
            value={urlInput || fullPath}
            onChange={(e) => setUrlInput(e.target.value)}
            onFocus={() => setUrlInput(fullPath)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-xs font-mono bg-gray-50"
            placeholder="/ko/team"
          />
          <button type="submit" className="text-xs text-blue-600 hover:underline px-1">
            Go
          </button>
        </form>

        <button onClick={refresh} className="text-xs text-gray-500 hover:text-gray-700 px-1" title="Refresh">
          &#x21BB;
        </button>
      </div>

      {/* iframe */}
      <div className="flex-1 flex justify-center pt-4 bg-gray-100 rounded-lg mt-2 overflow-hidden">
        <div
          style={{ width: DEVICES[device].width, maxWidth: "100%" }}
          className="h-full bg-white shadow-lg rounded-t-lg overflow-hidden transition-all duration-300"
        >
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            className="w-full h-full border-0"
            title="Site Preview"
          />
        </div>
      </div>
    </div>
  );
}
