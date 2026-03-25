import { NextResponse } from "next/server";
import { getBuildHistory } from "@/lib/build-trigger";

export async function GET() {
  try {
    const data = await getBuildHistory();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ builds: [], activeBuild: null }, { status: 503 });
  }
}
