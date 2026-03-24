import { execSync } from "node:child_process";
import http from "node:http";

let building = false;
let lastBuild = null;
let lastError = null;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "POST" && req.url === "/api/build") {
    if (building) {
      res.writeHead(409);
      res.end(JSON.stringify({ error: "Build already in progress" }));
      return;
    }

    building = true;
    lastError = null;
    res.writeHead(202);
    res.end(JSON.stringify({ status: "started" }));

    setImmediate(() => {
      try {
        execSync("bash /app/services/builder/build.sh", {
          stdio: "inherit",
          timeout: 300_000,
        });
        lastBuild = new Date().toISOString();
        lastError = null;
        console.log(`[builder] Build completed at ${lastBuild}`);
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
        console.error(`[builder] Build failed: ${lastError}`);
      } finally {
        building = false;
      }
    });
    return;
  }

  if (req.method === "GET" && req.url === "/api/status") {
    res.writeHead(200);
    res.end(JSON.stringify({ building, lastBuild, lastError }));
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not found" }));
});

const PORT = Number(process.env.PORT) || 4000;
server.listen(PORT, () => {
  console.log(`[builder] Listening on port ${PORT}`);
});
