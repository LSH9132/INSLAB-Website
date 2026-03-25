import { NextRequest, NextResponse } from "next/server";
import { listImages, deleteImage, imagesDir } from "@/lib/content-io";
import { statSync } from "node:fs";
import { join } from "node:path";

export async function GET(req: NextRequest) {
  const subdir = req.nextUrl.searchParams.get("subdir") ?? "";
  if (/\.\./.test(subdir)) {
    return NextResponse.json({ error: "Invalid subdir" }, { status: 400 });
  }
  const files = listImages(subdir);
  const baseDir = join(imagesDir(), subdir);

  const images = files.map((name) => {
    try {
      const stat = statSync(join(baseDir, name));
      return {
        name,
        path: `/images/${subdir}/${name}`,
        size: stat.size,
        modified: stat.mtime.toISOString(),
      };
    } catch {
      return { name, path: `/images/${subdir}/${name}`, size: 0, modified: "" };
    }
  });

  return NextResponse.json({ images });
}

export async function DELETE(req: NextRequest) {
  const subdir = req.nextUrl.searchParams.get("subdir") ?? "";
  const filename = req.nextUrl.searchParams.get("filename") ?? "";

  if (/\.\./.test(subdir) || /\.\./.test(filename)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  if (!filename) {
    return NextResponse.json({ error: "filename required" }, { status: 400 });
  }

  try {
    deleteImage(subdir, filename);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
