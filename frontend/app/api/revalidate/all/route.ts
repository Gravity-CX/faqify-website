import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_CACHE_TAG } from "@/sanity/lib/fetch";

export async function GET() {
  if (process.env.NODE_ENV === "development") {
    revalidatePath("/", "layout");
    return Response.json({ message: "Layout revalidated" });
  }

  return Response.json({
    message:
      "Revalidation in production runs via POST with a valid secret (e.g. Sanity webhook).",
  });
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "SANITY_REVALIDATE_SECRET is not set" },
      { status: 500 }
    );
  }

  try {
    const { body, isValidSignature } = await parseBody<{ _type?: string } | null>(
      req,
      secret
    );

    if (isValidSignature === false) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    revalidateTag(SANITY_CACHE_TAG, "max");
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      body: body ?? undefined,
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Revalidation failed" },
      { status: 500 }
    );
  }
}
