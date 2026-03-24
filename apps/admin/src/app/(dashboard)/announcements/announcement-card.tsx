"use client";

import { useState, useTransition } from "react";
import { useToast } from "@/components/toast-provider";

interface Announcement {
  ko: string;
  en: string;
  href?: string;
}

export function AnnouncementCard({
  item,
  index,
  saveAction,
  deleteAction,
}: {
  item: Announcement;
  index: number;
  saveAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  if (editing) {
    return (
      <form
        className="bg-white border border-blue-300 rounded-lg p-4 space-y-3"
        action={(formData) => {
          startTransition(async () => {
            await saveAction(formData);
            setEditing(false);
            toast("Saved successfully", "success");
          });
        }}
      >
        <input type="hidden" name="index" value={index} />
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Korean</label>
          <input
            name="ko"
            defaultValue={item.ko}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">English</label>
          <input
            name="en"
            defaultValue={item.en}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Link</label>
          <input
            name="href"
            defaultValue={item.href ?? ""}
            className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start justify-between gap-4">
      <div className="flex-1 text-sm">
        <p className="font-medium">{item.ko}</p>
        <p className="text-gray-500">{item.en}</p>
        {item.href && <p className="text-blue-600 text-xs mt-1">{item.href}</p>}
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => setEditing(true)}
          className="text-blue-600 hover:underline text-xs"
        >
          Edit
        </button>
        <form
          action={(formData) => {
            startTransition(async () => {
              await deleteAction(formData);
              toast("Deleted successfully", "success");
            });
          }}
        >
          <input type="hidden" name="index" value={index} />
          <button
            type="submit"
            disabled={isPending}
            onClick={(e) => {
              if (!confirm("Delete?")) e.preventDefault();
            }}
            className="text-red-600 hover:underline text-xs disabled:opacity-50"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
