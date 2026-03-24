import { NextResponse } from "next/server";
import { triggerPreviewBuild } from "@/lib/build-trigger";

export async function POST() {
  try {
    const data = await triggerPreviewBuild();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Builder unreachable" }, { status: 503 });
  }
}
