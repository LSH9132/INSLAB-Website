import { NextResponse } from "next/server";
import { triggerBuild, getBuildStatus } from "@/lib/build-trigger";

export async function GET() {
  try {
    const status = await getBuildStatus();
    return NextResponse.json(status);
  } catch {
    return NextResponse.json(
      { building: false, lastBuild: null, lastError: "Builder unreachable" },
      { status: 503 },
    );
  }
}

export async function POST() {
  try {
    const result = await triggerBuild();
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Builder unreachable" }, { status: 503 });
  }
}
