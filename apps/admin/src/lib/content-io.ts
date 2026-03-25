import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { parse, stringify } from "yaml";
import type { ZodSchema } from "zod";

const DATA_DIR = process.env.DATA_DIR || "/data";

export function contentPath(relativePath: string) {
  return join(DATA_DIR, "content", relativePath);
}

export function messagesPath(locale: string) {
  return join(DATA_DIR, "messages", `${locale}.json`);
}

export function imagesDir() {
  return join(DATA_DIR, "images");
}

// ── YAML read/write ─────────────────────────────────────────────────

export function readYaml<T>(relativePath: string, schema: ZodSchema<T>): T {
  const raw = readFileSync(contentPath(relativePath), "utf-8");
  return schema.parse(parse(raw));
}

export function writeYaml(relativePath: string, data: unknown): void {
  const fullPath = contentPath(relativePath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, stringify(data, { lineWidth: 120 }));
}

// ── JSON read/write (for i18n messages) ─────────────────────────────

export function readMessages(locale: string): Record<string, unknown> {
  const raw = readFileSync(messagesPath(locale), "utf-8");
  return JSON.parse(raw);
}

export function writeMessages(locale: string, data: Record<string, unknown>): void {
  writeFileSync(messagesPath(locale), JSON.stringify(data, null, 2) + "\n");
}

// ── Image helpers ───────────────────────────────────────────────────

export function listImages(subdir: string): string[] {
  const dir = join(imagesDir(), subdir);
  try {
    return readdirSync(dir).filter((f) => /\.(jpe?g|png|webp|svg)$/i.test(f));
  } catch {
    return [];
  }
}

export function saveImage(subdir: string, filename: string, buffer: Buffer): void {
  const dir = join(imagesDir(), subdir);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, filename), buffer);
}

export function deleteImage(subdir: string, filename: string): void {
  unlinkSync(join(imagesDir(), subdir, filename));
}
