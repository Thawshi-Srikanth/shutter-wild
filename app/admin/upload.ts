"use server";

import { getSession } from "@/lib/auth";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

// Initialize Cloudflare R2 S3-Compatible Client
const r2Client = new S3Client({
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
  region: "auto",
});

export async function uploadImageAction(formData: FormData) {
  // Enforce session check
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized access." };
  }

  const file = formData.get("file") as File;
  if (!file) {
    return { success: false, error: "No file selected." };
  }

  // 1. Strict validation (Types and size limits to prevent injection/DoS)
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedMimeTypes.includes(file.type)) {
    return {
      success: false,
      error: "Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed.",
    };
  }

  if (file.size > 10 * 1024 * 1024) {
    // 10MB limit
    return { success: false, error: "File exceeds 10MB size limit." };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 2. Generate a secure, unpredictable unique filename
    const fileExtension = file.name.split(".").pop() || "webp";
    const secureFileName = `${crypto.randomUUID()}.${fileExtension}`;

    // 3. Upload command execution
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || "",
      Key: secureFileName,
      Body: buffer,
      ContentType: file.type,
    });

    await r2Client.send(command);

    // 4. Return the public CDN URL
    const publicUrlBase = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "";
    // Clean trailing slashes to build clean asset path
    const sanitizedUrlBase = publicUrlBase.replace(/\/+$/, "");
    const publicUrl = sanitizedUrlBase.startsWith("http") 
      ? `${sanitizedUrlBase}/${secureFileName}`
      : `https://${sanitizedUrlBase}/${secureFileName}`;

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error("Cloudflare R2 Upload error:", error);
    return { success: false, error: "Failed to upload image to Cloudflare R2." };
  }
}

export async function deleteImageAction(imageUrl: string) {
  // Enforce session check
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized access." };
  }

  if (!imageUrl) {
    return { success: false, error: "No image URL provided." };
  }

  try {
    // Only delete if it belongs to our R2 bucket CDN URL
    const publicUrlBase = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "";
    const sanitizedUrlBase = publicUrlBase.replace(/\/+$/, "").replace(/^https?:\/\//, "");
    const cleanImageUrl = imageUrl.replace(/^https?:\/\//, "");

    if (!cleanImageUrl.includes(sanitizedUrlBase)) {
      // If it's a local fallback path (/captures/...) or external URL, skip deletion from R2
      return { success: true, message: "Skipping R2 deletion for non-R2 asset." };
    }

    // Extract the filename (Key) from the URL path
    const secureFileName = imageUrl.split("/").pop();
    if (!secureFileName) {
      return { success: false, error: "Could not parse filename from URL." };
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || "",
      Key: secureFileName,
    });

    await r2Client.send(command);
    return { success: true };
  } catch (error) {
    console.error("Cloudflare R2 Delete error:", error);
    return { success: false, error: "Failed to remove image from Cloudflare R2." };
  }
}
