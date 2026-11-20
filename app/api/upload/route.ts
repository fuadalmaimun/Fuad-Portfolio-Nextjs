import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 1. Verify admin session
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return Response.json(
        { success: false, message: "Unauthorized. Admin credentials required." },
        { status: 401 }
      );
    }

    if (session.user?.role !== "admin") {
      return Response.json(
        { success: false, message: "Forbidden. Admin privileges required." },
        { status: 403 }
      );
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey || apiKey.trim() === "") {
      return Response.json(
        {
          success: false,
          message: "ImageBB API key is not configured. Please set IMGBB_API_KEY in .env",
        },
        { status: 503 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    if (!file) {
      return Response.json(
        { success: false, message: "No image file provided (field: 'image')." },
        { status: 400 }
      );
    }

    // Forward to ImgBB
    const imgbbForm = new FormData();
    imgbbForm.append("image", file, file.name || "image.png");

    const imgbbRes = await fetch(
      `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey.trim())}`,
      {
        method: "POST",
        body: imgbbForm,
      }
    );

    const result = await imgbbRes.json();
    if (result.success && result.data?.url) {
      return Response.json({
        success: true,
        message: "Image uploaded successfully to ImageBB",
        data: {
          url: result.data.url,
          display_url: result.data.display_url || result.data.url,
          thumb_url: result.data.thumb?.url || result.data.url,
          delete_url: result.data.delete_url,
          size: result.data.size,
          width: result.data.width,
          height: result.data.height,
        },
      });
    }

    return Response.json(
      {
        success: false,
        message: result.error?.message || "ImageBB rejected the upload.",
      },
      { status: 502 }
    );
  } catch (error: any) {
    console.error("[upload-route] Error uploading image:", error);
    return Response.json(
      { success: false, message: error.message || "Failed to upload image." },
      { status: 500 }
    );
  }
}
