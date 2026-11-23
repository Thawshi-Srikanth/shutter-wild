"use server";

import { getSession } from "@/lib/auth";
import { put, del } from "@vercel/blob";
import crypto from "crypto";
import path from "path";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const MAX_SERVER_ACTION_SIZE_BYTES = 4 * 1024 * 1024; // 4MB (Vercel Server Action limit is 4.5MB)

/**
 * Server-side image upload to Vercel Blob (for files up to 4MB).
 * Larger files should use the client upload route (/api/upload).
 */
export async function uploadImageAction(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized access." };
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return { success: false, error: "No file selected." };
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      success: false,
      error: "Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed.",
    };
  }

  if (file.size > MAX_SERVER_ACTION_SIZE_BYTES) {
    return {
      success: false,
      error: "File exceeds 4MB server action limit.",
    };
  }

  try {
    const ext = path.extname(path.basename(file.name)) || ".webp";
    const secureFileName = `${crypto.randomUUID()}${ext}`;

    const blob = await put(secureFileName, file, {
      access: "public",
      contentType: file.type,
    });

    return { success: true, url: blob.url };
  } catch (error) {
    console.error("Vercel Blob Upload error:", error);
    return { success: false, error: "Failed to upload image to Vercel Blob." };
  }
}

/**
 * Deletes an image from Vercel Blob if the URL belongs to Vercel Blob storage.
 */
export async function deleteImageAction(imageUrl: string) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized access." };
  }

  if (!imageUrl) {
    return { success: false, error: "No image URL provided." };
  }

  try {
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(imageUrl);
    } catch {
      return { success: true, message: "Skipping deletion for non-URL asset." };
    }

    if (!parsedUrl.hostname.endsWith(".public.blob.vercel-storage.com")) {
      return { success: true, message: "Skipping deletion for non-Vercel Blob asset." };
    }

    await del(imageUrl);
    return { success: true };
  } catch (error) {
    console.error("Vercel Blob Delete error:", error);
    return { success: false, error: "Failed to remove image from Vercel Blob." };
  }
}
