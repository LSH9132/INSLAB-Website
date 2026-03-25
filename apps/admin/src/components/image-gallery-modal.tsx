"use client";

import { useEffect, useState } from "react";

interface ImageInfo {
  name: string;
  path: string;
  size: number;
}

export function ImageGalleryModal({
  subdir,
  onSelect,
  onClose,
}: {
  subdir: string;
  onSelect: (path: string) => void;
  onClose: () => void;
}) {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/images?subdir=${encodeURIComponent(subdir)}`)
      .then((r) => r.json())
      .then((data) => setImages(data.images ?? []))
      .finally(() => setLoading(false));
  }, [subdir]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium text-gray-900">Select Image ({subdir})</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {loading && <p className="text-gray-400 text-sm">Loading...</p>}
          {!loading && images.length === 0 && (
            <p className="text-gray-400 text-sm">No images in this directory.</p>
          )}
          <div className="grid grid-cols-4 gap-3">
            {images.map((img) => (
              <button
                key={img.name}
                onClick={() => {
                  onSelect(img.path);
                  onClose();
                }}
                className="group relative aspect-square border border-gray-200 rounded-lg overflow-hidden hover:border-blue-400 hover:ring-2 hover:ring-blue-200"
              >
                <img
                  src={img.path}
                  alt={img.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-xs p-1 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="truncate">{img.name}</span>
                  <a
                    href={img.path}
                    download={img.name}
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 ml-1 hover:text-blue-300"
                    title="Download"
                  >
                    &#x2B07;
                  </a>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
