"use server";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { put, del, list } from "@vercel/blob";
import crypto from "crypto";
import path from "path";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

const MAX_SERVER_ACTION_SIZE_BYTES = 4 * 1024 * 1024; // 4MB (Vercel Server Action limit is 4.5MB)

export type BlobImageItem = {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
};

/**
 * Lists existing images stored in Vercel Blob for the admin media library.
 */
export async function listBlobImagesAction(): Promise<{
  success: boolean;
  blobs?: BlobImageItem[];
  error?: string;
}> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized access." };
  }

  try {
    const items: BlobImageItem[] = [];
    let cursor: string | undefined;

    do {
      const page = await list({ limit: 250, cursor });
      for (const blob of page.blobs) {
        const ext = path.extname(blob.pathname).toLowerCase();
        if (IMAGE_EXTENSIONS.has(ext)) {
          items.push({
            url: blob.url,
            pathname: blob.pathname,
            size: blob.size,
            uploadedAt: blob.uploadedAt.toISOString(),
          });
        }
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor && items.length < 1000);

    items.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
    );

    return { success: true, blobs: items };
  } catch (error) {
    console.error("Vercel Blob List error:", error);
    return {
      success: false,
      error: "Failed to load media library from Vercel Blob.",
    };
  }
}

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
 * Deletes an image from Vercel Blob only if it is hosted on Vercel Blob,
 * is not a protected site/ UI asset, and is not still referenced by another tour.
 */
export async function deleteImageAction(
  imageUrl: string,
  excludeTourId?: string,
) {
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
      return {
        success: true,
        message: "Skipping deletion for non-Vercel Blob asset.",
      };
    }

    // Never delete static homepage/site UI assets
    if (parsedUrl.pathname.startsWith("/site/")) {
      return {
        success: true,
        message: "Skipping deletion for protected site asset.",
      };
    }

    // Skip deletion if another tour still references this image
    const refCount = await prisma.tour.count({
      where: {
        ...(excludeTourId ? { id: { not: excludeTourId } } : {}),
        OR: [{ image: imageUrl }, { gallery: { has: imageUrl } }],
      },
    });

    if (refCount > 0) {
      return {
        success: true,
        message: "Image is still used by another expedition; kept in library.",
      };
    }

    await del(imageUrl);
    return { success: true };
  } catch (error) {
    console.error("Vercel Blob Delete error:", error);
    return {
      success: false,
      error: "Failed to remove image from Vercel Blob.",
    };
  }
}
