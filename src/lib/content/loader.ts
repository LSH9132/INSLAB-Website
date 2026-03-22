import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";
import type { ZodSchema } from "zod";
import { ZodError } from "zod";

const CONTENT_DIR = join(process.cwd(), "content");
const cache = new Map<string, unknown>();

export function loadContent<T>(relativePath: string, schema: ZodSchema<T>): T {
  if (cache.has(relativePath)) return cache.get(relativePath) as T;

  const fullPath = join(CONTENT_DIR, relativePath);
  const raw = readFileSync(fullPath, "utf-8");
  const parsed = parseYaml(raw);

  try {
    const result = schema.parse(parsed);
    cache.set(relativePath, result);
    return result;
  } catch (error) {
    if (error instanceof ZodError) {
      const formatted = error.issues
        .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
        .join("\n");
      throw new Error(
        `Content validation failed for ${relativePath}:\n${formatted}`,
      );
    }
    throw error;
  }
}
