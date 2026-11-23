import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { getSession } from "@/lib/auth";

const ALLOWED_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

/**
 * Generates client-upload tokens for Vercel Blob, bypassing Vercel's 4.5MB
 * serverless request body limit while enforcing admin session auth.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const session = await getSession();
        if (!session) {
          throw new Error("Unauthorized access.");
        }

        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_UPLOAD_SIZE_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // URL is returned directly to the client upload() call.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message = (error as Error).message;
    const status = message === "Unauthorized access." ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
