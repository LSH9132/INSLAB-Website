import { NextRequest, NextResponse } from "next/server";
import { rollbackBuild } from "@/lib/build-trigger";

export async function POST(req: NextRequest) {
  try {
    const { buildId } = await req.json();
    const data = await rollbackBuild(buildId);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Builder unreachable" }, { status: 503 });
  }
}
