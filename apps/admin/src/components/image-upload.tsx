"use client";

import { useCallback, useRef, useState } from "react";
import { ImageGalleryModal } from "./image-gallery-modal";

interface ImageUploadProps {
  name: string;
  subdir: string;
  defaultValue?: string;
}

export function ImageUpload({ name, subdir, defaultValue = "" }: ImageUploadProps) {
  const [path, setPath] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.set("file", file);
        formData.set("subdir", subdir);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (!res.ok) {
          const err = await res.json();
          alert(err.error || "Upload failed");
          return;
        }
        const data = await res.json();
        setPath(data.path);
      } finally {
        setUploading(false);
      }
    },
    [subdir],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) upload(file);
    },
    [upload],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) upload(file);
    },
    [upload],
  );

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
      <input type="hidden" name={name} value={path} />

      <div className="flex gap-4 items-start">
        {/* Preview */}
        {path ? (
          <div className="w-24 h-24 rounded-lg border border-gray-200 overflow-hidden shrink-0 bg-gray-50">
            <img src={path} alt="Preview" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-lg border border-dashed border-gray-300 flex items-center justify-center shrink-0 bg-gray-50">
            <span className="text-gray-400 text-xs">No image</span>
          </div>
        )}

        {/* Upload area */}
        <div className="flex-1 space-y-2">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
              dragOver
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {uploading ? (
              <p className="text-sm text-blue-600">Uploading...</p>
            ) : (
              <p className="text-sm text-gray-500">
                Drop image here or click to upload
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowGallery(true)}
              className="text-xs text-blue-600 hover:underline"
            >
              Browse existing images
            </button>
            {path && (
              <a
                href={path}
                download
                className="text-xs text-gray-500 hover:underline"
              >
                Download
              </a>
            )}
            {path && (
              <button
                type="button"
                onClick={() => setPath("")}
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            )}
          </div>

          {path && (
            <p className="text-xs text-gray-400 truncate">{path}</p>
          )}
        </div>
      </div>

      {showGallery && (
        <ImageGalleryModal
          subdir={subdir}
          onSelect={setPath}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
}
