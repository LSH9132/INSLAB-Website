import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, readdirSync } from "node:fs";
import http from "node:http";
import { join } from "node:path";

const DATA_DIR = process.env.DATA_DIR || "/data";
const OUT_DIR = process.env.OUT_DIR || "/out";
const BUILDER_DIR = process.env.BUILDER_DIR || "/builder";
const HISTORY_FILE = join(BUILDER_DIR, "build-history.json");
const BUILDS_DIR = join(BUILDER_DIR, "builds");
const MAX_HISTORY = 20;
const MAX_ARCHIVES = 5;

// ── Persistent build history ────────────────────────────────────
let history = [];
try {
  history = JSON.parse(readFileSync(HISTORY_FILE, "utf-8"));
  // Trim to prevent unbounded growth after restarts
  if (history.length > MAX_HISTORY) {
    history = history.slice(0, MAX_HISTORY);
    writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
  }
} catch {
  // No history file yet
}

let building = false;
const lastState = () => {
  const last = history.find((h) => h.status === "success");
  const lastFailed = history.find((h) => h.status === "failed");
  return {
    building,
    lastBuild: last?.completedAt ?? null,
    lastError: lastFailed && (!last || lastFailed.startedAt > last.completedAt)
      ? lastFailed.error
      : null,
    currentBuildId: history[0]?.status === "building" ? history[0].id : null,
  };
};

function saveHistory() {
  try {
    writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
  } catch (err) {
    console.error("[builder] Failed to save history:", err.message);
  }
}

function archiveBuild(buildId) {
  try {
    mkdirSync(BUILDS_DIR, { recursive: true });
    const archiveDir = join(BUILDS_DIR, buildId);
    cpSync(OUT_DIR, archiveDir, { recursive: true });

    // Keep only last N archives
    const dirs = readdirSync(BUILDS_DIR).sort().reverse();
    for (const dir of dirs.slice(MAX_ARCHIVES)) {
      rmSync(join(BUILDS_DIR, dir), { recursive: true, force: true });
    }
    console.log(`[builder] Archived build ${buildId}`);
  } catch (err) {
    console.error("[builder] Archive failed:", err.message);
  }
}

function rollback(buildId) {
  const archiveDir = join(BUILDS_DIR, buildId);
  try {
    execSync(`rsync -a --delete "${archiveDir}/" "${OUT_DIR}/"`, { stdio: "inherit" });
    console.log(`[builder] Rolled back to ${buildId}`);
    return true;
  } catch (err) {
    console.error(`[builder] Rollback failed: ${err.message}`);
    return false;
  }
}

// ── HTTP Server ─────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  // Trigger build
  if (req.method === "POST" && req.url === "/api/build") {
    if (building) {
      res.writeHead(409);
      res.end(JSON.stringify({ error: "Build already in progress" }));
      return;
    }

    const buildId = `build-${new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19)}`;
    building = true;

    const record = {
      id: buildId,
      startedAt: new Date().toISOString(),
      completedAt: null,
      status: "building",
      error: null,
      durationMs: 0,
    };
    history.unshift(record);
    if (history.length > MAX_HISTORY) history.pop();
    saveHistory();

    res.writeHead(202);
    res.end(JSON.stringify({ status: "started", buildId }));

    setImmediate(() => {
      const start = Date.now();
      try {
        execSync("bash /app/services/builder/build.sh", {
          stdio: "inherit",
          timeout: 300_000,
        });
        record.status = "success";
        record.completedAt = new Date().toISOString();
        record.durationMs = Date.now() - start;
        console.log(`[builder] Build ${buildId} completed in ${record.durationMs}ms`);
        archiveBuild(buildId);
      } catch (err) {
        record.status = "failed";
        record.completedAt = new Date().toISOString();
        record.durationMs = Date.now() - start;
        record.error = err instanceof Error ? err.message : String(err);
        console.error(`[builder] Build ${buildId} failed: ${record.error}`);
      } finally {
        building = false;
        saveHistory();
      }
    });
    return;
  }

  // Build status
  if (req.method === "GET" && req.url === "/api/status") {
    res.writeHead(200);
    res.end(JSON.stringify(lastState()));
    return;
  }

  // Build history
  if (req.method === "GET" && req.url === "/api/history") {
    res.writeHead(200);
    res.end(JSON.stringify({ builds: history, activeBuild: history[0]?.status === "success" ? history[0].id : null }));
    return;
  }

  // Rollback
  if (req.method === "POST" && req.url === "/api/rollback") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const { buildId } = JSON.parse(body);
        if (!buildId) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: "buildId required" }));
          return;
        }
        if (building) {
          res.writeHead(409);
          res.end(JSON.stringify({ error: "Build in progress" }));
          return;
        }
        const ok = rollback(buildId);
        if (ok) {
          res.writeHead(200);
          res.end(JSON.stringify({ status: "rolled back", buildId }));
        } else {
          res.writeHead(500);
          res.end(JSON.stringify({ error: "Rollback failed" }));
        }
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  // Preview build
  if (req.method === "POST" && req.url === "/api/preview-build") {
    if (building) {
      res.writeHead(409);
      res.end(JSON.stringify({ error: "Build already in progress" }));
      return;
    }

    building = true;
    res.writeHead(202);
    res.end(JSON.stringify({ status: "preview started" }));

    setImmediate(() => {
      try {
        execSync("PREVIEW=1 bash /app/services/builder/build.sh", {
          stdio: "inherit",
          timeout: 300_000,
        });
        console.log("[builder] Preview build completed");
      } catch (err) {
        console.error(`[builder] Preview build failed: ${err instanceof Error ? err.message : err}`);
      } finally {
        building = false;
      }
    });
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not found" }));
});

const PORT = Number(process.env.PORT) || 4000;
server.listen(PORT, () => {
  console.log(`[builder] Listening on port ${PORT}`);
});
