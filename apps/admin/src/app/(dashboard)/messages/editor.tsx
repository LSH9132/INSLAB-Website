"use client";

import { useState, useTransition } from "react";
import { saveMessages } from "./actions";

interface Props {
  enMessages: Record<string, unknown>;
  koMessages: Record<string, unknown>;
}

export function MessageEditor({ enMessages, koMessages }: Props) {
  const [locale, setLocale] = useState<"en" | "ko">("ko");
  const [content, setContent] = useState({
    en: JSON.stringify(enMessages, null, 2),
    ko: JSON.stringify(koMessages, null, 2),
  });
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    setError(null);
    try {
      JSON.parse(content[locale]);
    } catch {
      setError("Invalid JSON");
      return;
    }

    const formData = new FormData();
    formData.set("locale", locale);
    formData.set("content", content[locale]);
    startTransition(() => saveMessages(formData));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setLocale("ko")}
          className={`px-3 py-1.5 rounded-md text-sm ${locale === "ko" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Korean
        </button>
        <button
          onClick={() => setLocale("en")}
          className={`px-3 py-1.5 rounded-md text-sm ${locale === "en" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          English
        </button>
      </div>

      <textarea
        value={content[locale]}
        onChange={(e) => setContent({ ...content, [locale]: e.target.value })}
        rows={30}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-mono"
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        onClick={handleSave}
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Saving..." : `Save ${locale.toUpperCase()}`}
      </button>
    </div>
  );
}
