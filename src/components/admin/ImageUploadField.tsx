"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, Loader2, X, AlertTriangle } from "lucide-react";
import { uploadImageToBackend } from "@/lib/api";

interface ImageUploadFieldProps {
  label?: string;
  value?: string;
  onChange?: (url: string) => void;
  token?: string;
  placeholder?: string;
}

export default function ImageUploadField({
  label = "Image",
  value = "",
  onChange,
  token,
  placeholder = "Upload an image or paste URL",
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(value);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validations
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a valid image file (JPEG, PNG, WebP, GIF, SVG).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      return;
    }

    setError("");
    // Show immediate local preview
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setUploading(true);

    try {
      const res = await uploadImageToBackend(file, token);

      if (res.success && res.data?.url) {
        setPreview(res.data.url);
        onChange?.(res.data.url);
      } else {
        setError(res.message || "Image upload failed. Verify ImageBB API key in backend.");
      }
    } catch (err: any) {
      console.error("[ImageUploadField] Upload error:", err);
      setError(err.message || "Failed to connect to backend for image upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setPreview("");
    onChange?.("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300">
        {label}
      </label>

      {/* Main Container */}
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* Preview Box */}
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#120824] flex items-center justify-center shadow-inner">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon size={32} className="text-gray-500" />
          )}

          {uploading && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-1">
              <Loader2 size={20} className="animate-spin text-purple-400" />
              <span className="text-[10px] text-purple-200">Uploading...</span>
            </div>
          )}

          {preview && !uploading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/70 text-gray-300 hover:text-white flex items-center justify-center transition"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Input & Upload Controls */}
        <div className="flex-1 w-full space-y-2.5">
          <div className="flex gap-2">
            <input
              type="text"
              value={value || ""}
              onChange={(e) => {
                onChange?.(e.target.value);
                setPreview(e.target.value);
              }}
              placeholder={placeholder}
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition focus:border-purple-400 focus:bg-purple-950/20"
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 shrink-0 rounded-xl border border-purple-500/40 bg-purple-950/40 px-3.5 py-2.5 text-xs font-semibold text-purple-200 transition hover:bg-purple-600/20 hover:text-white disabled:opacity-50"
            >
              <UploadCloud size={15} className="text-purple-400" />
              <span>Upload to ImageBB</span>
            </button>
          </div>

          <p className="text-[11px] text-gray-400 leading-normal">
            Supported: JPEG, PNG, WebP, GIF, SVG (up to 10MB). Uploads directly to ImageBB and stores hosted URL.
          </p>

          {error && (
            <div className="flex items-center gap-1.5 text-xs text-red-400">
              <AlertTriangle size={13} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
