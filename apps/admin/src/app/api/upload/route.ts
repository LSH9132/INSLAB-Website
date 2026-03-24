import { NextRequest, NextResponse } from "next/server";
import { saveImage } from "@/lib/content-io";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const subdir = (formData.get("subdir") as string) || "";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!/\.(jpe?g|png|webp|svg)$/i.test(file.name)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  // Sanitize filename
  const filename = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const buffer = Buffer.from(await file.arrayBuffer());
  saveImage(subdir, filename, buffer);

  return NextResponse.json({ path: `/images/${subdir}/${filename}` });
}
