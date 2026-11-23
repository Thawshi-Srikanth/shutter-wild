"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Check, Images, RefreshCw, Search, X } from "lucide-react";
import { listBlobImagesAction, type BlobImageItem } from "../../upload";

interface MediaLibraryModalProps {
  open: boolean;
  mode: "single" | "multiple";
  alreadySelected?: string[];
  onClose: () => void;
  onSelect: (urls: string[]) => void;
}

export default function MediaLibraryModal({
  open,
  mode,
  alreadySelected = [],
  onClose,
  onSelect,
}: MediaLibraryModalProps) {
  const [blobs, setBlobs] = useState<BlobImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "tours" | "site">("all");
  const [selected, setSelected] = useState<string[]>([]);

  const loadImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listBlobImagesAction();
      if (res.success && res.blobs) {
        setBlobs(res.blobs);
      } else {
        setError(res.error || "Failed to load media library.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred while loading images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setSelected([]);
      setSearch("");
      loadImages();
    }
  }, [open]);

  const filteredBlobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return blobs.filter((blob) => {
      const isSite = blob.pathname.startsWith("site/");
      if (filter === "site" && !isSite) return false;
      if (filter === "tours" && isSite) return false;
      if (q && !blob.pathname.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [blobs, filter, search]);

  if (!open) return null;

  const toggleSelection = (url: string) => {
    if (mode === "single") {
      setSelected([url]);
      return;
    }
    setSelected((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url],
    );
  };

  const handleConfirm = () => {
    if (selected.length === 0) return;
    onSelect(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-5xl max-h-[85vh] rounded-sm shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#F4F4F0]">
          <div className="flex items-center gap-2.5">
            <Images size={18} className="text-[#1E2E22]" />
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Media Library
              </h3>
              <p className="text-[11px] text-gray-500">
                {mode === "single"
                  ? "Select an existing image for the cover banner"
                  : "Select one or more existing images to add to the gallery"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close media library"
            className="p-1.5 text-gray-500 hover:text-black rounded-sm hover:bg-gray-200/70 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-2">
            {(
              [
                { id: "all", label: "All" },
                { id: "tours", label: "Expeditions" },
                { id: "site", label: "Site UI" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer ${
                  filter === tab.id
                    ? "bg-[#1E2E22] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-xs justify-end">
            <div className="relative flex-1">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by filename..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-sm focus:outline-none focus:border-[#1E2E22]"
              />
            </div>
            <button
              type="button"
              onClick={loadImages}
              disabled={loading}
              title="Refresh library"
              className="p-2 border border-gray-200 rounded-sm text-gray-600 hover:text-black hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-500">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-[#1E2E22] rounded-full animate-spin" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Loading images from Vercel Blob...
              </span>
            </div>
          ) : filteredBlobs.length === 0 ? (
            <div className="text-center py-20 text-xs text-gray-400 italic">
              No matching images found in your media library.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredBlobs.map((blob) => {
                const isSelected = selected.includes(blob.url);
                const isAlreadyUsed = alreadySelected.includes(blob.url);
                return (
                  <button
                    key={blob.url}
                    type="button"
                    onClick={() => toggleSelection(blob.url)}
                    onDoubleClick={() => {
                      if (mode === "single") {
                        onSelect([blob.url]);
                        onClose();
                      }
                    }}
                    className={`group relative aspect-[4/3] rounded-sm overflow-hidden border-2 text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#1E2E22] ring-2 ring-[#1E2E22]/30"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={blob.url}
                      alt={blob.pathname}
                      width={320}
                      height={240}
                      unoptimized
                      className="object-cover w-full h-full"
                    />

                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-[#1E2E22] text-white flex items-center justify-center shadow-md">
                        <Check size={14} />
                      </div>
                    )}

                    {isAlreadyUsed && !isSelected && (
                      <div className="absolute top-1.5 left-1.5 bg-black/75 text-white px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-xs">
                        In Use
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[10px] text-white truncate">
                        {blob.pathname}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-[#F4F4F0]">
          <span className="text-xs text-gray-500">
            {filteredBlobs.length} image{filteredBlobs.length === 1 ? "" : "s"}{" "}
            available
            {selected.length > 0 && (
              <strong className="text-[#1E2E22] ml-2">
                ({selected.length} selected)
              </strong>
            )}
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-black cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={selected.length === 0}
              className="px-5 py-2 bg-[#1E2E22] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#152218] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {mode === "single"
                ? "Use Selected Image"
                : `Add Selected (${selected.length})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
