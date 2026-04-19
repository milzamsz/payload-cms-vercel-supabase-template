import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import process from "node:process";

const DEV_SERVER_ACTIONS_ENCRYPTION_KEY =
  "a2VidW5rdW1hcmEtbmV4dC1kZXYtYWN0aW9ucy1rZXk=";

const mode = process.argv[2];
if (!mode || (mode !== "dev" && mode !== "start")) {
  console.error("Usage: node scripts/next-runner.mjs <dev|start> [next args...]");
  process.exit(1);
}

const passthroughArgs = process.argv.slice(3);
const hasPortFlag = passthroughArgs.some(
  (arg) => arg === "--port" || arg === "-p" || arg.startsWith("--port="),
);
const hasEnvPort = Boolean(process.env.PORT);

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();

    server.on("error", () => resolve(false));
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
  });
}

async function findAvailablePort(fromPort, toPort) {
  for (let port = fromPort; port <= toPort; port += 1) {
    // Try a small fixed window so we stay predictable in local development.
    // If all are occupied, Next should fail loudly instead of picking a random high port.
    // eslint-disable-next-line no-await-in-loop
    if (await isPortAvailable(port)) {
      return port;
    }
  }

  throw new Error(`No available port found between ${fromPort}-${toPort}`);
}

const selectedPort =
  hasEnvPort || hasPortFlag ? null : String(await findAvailablePort(3000, 3010));

if (selectedPort) {
  console.log(`[next-runner] ${mode} on port ${selectedPort}`);
}

function getNormalizedLocalServerURL(value, port) {
  if (!port) {
    return value;
  }

  if (!value) {
    return `http://localhost:${port}`;
  }

  try {
    const parsed = new URL(value);

    if (
      parsed.protocol === "http:" &&
      parsed.hostname === "localhost" &&
      parsed.port !== port
    ) {
      return `http://localhost:${port}`;
    }
  } catch {
    // Preserve non-URL values and let Next/Payload report them if needed.
  }

  return value;
}

const runtimePort = selectedPort ?? process.env.PORT ?? "3000";
const childEnv = { ...process.env };

if (mode === "dev") {
  const normalizedServerURL = getNormalizedLocalServerURL(
    process.env.NEXT_PUBLIC_SERVER_URL,
    runtimePort,
  );

  if (normalizedServerURL !== process.env.NEXT_PUBLIC_SERVER_URL) {
    console.log(
      `[next-runner] using NEXT_PUBLIC_SERVER_URL=${normalizedServerURL}`,
    );
  }

  childEnv.NEXT_PUBLIC_SERVER_URL = normalizedServerURL;
  childEnv.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY =
    process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY ??
    DEV_SERVER_ACTIONS_ENCRYPTION_KEY;
}

const nextCliPath = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const nextArgs = [nextCliPath, mode];

if (selectedPort) {
  nextArgs.push("--port", selectedPort);
}

nextArgs.push(...passthroughArgs);

const child = spawn(process.execPath, nextArgs, {
  stdio: "inherit",
  env: selectedPort ? { ...childEnv, PORT: selectedPort } : childEnv,
});

child.on("error", (error) => {
  console.error(`[next-runner] Failed to start Next.js: ${error.message}`);
  process.exit(1);
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
