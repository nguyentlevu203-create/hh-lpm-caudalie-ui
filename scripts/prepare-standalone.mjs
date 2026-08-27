#!/usr/bin/env node
/**
 * Prepares `.next/standalone/` to actually run as a production server.
 *
 * `next build` with `output: "standalone"` produces `.next/standalone/server.js`
 * plus a pruned `node_modules`, but deliberately does NOT copy `public/` or
 * `.next/static/` into that folder — Next.js expects the deployer to do that
 * copy step itself (see the Next.js docs for `output: "standalone"`). Without
 * it, the standalone server runs but serves 404s for every static asset,
 * font, and client JS chunk. `next start` doesn't have this problem, but
 * doesn't work with `output: "standalone"` either (it warns and serves from
 * the wrong directory) — this script is the fix for both: run
 * `node .next/standalone/server.js` against a directory that actually has
 * its static assets.
 *
 * Uses only `fs/promises` (`cp`/`rm`, both native recursive copy/remove since
 * Node 16+) — no shell `cp`/`rm` calls, so this runs identically on macOS,
 * Linux, and Windows CI.
 */

import { access, cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const standaloneDir = path.join(rootDir, ".next", "standalone");
const standaloneServer = path.join(standaloneDir, "server.js");

const copies = [
  {
    label: "public/",
    src: path.join(rootDir, "public"),
    dest: path.join(standaloneDir, "public"),
  },
  {
    label: ".next/static/",
    src: path.join(rootDir, ".next", "static"),
    dest: path.join(standaloneDir, ".next", "static"),
  },
];

async function main() {
  if (!existsSync(standaloneServer)) {
    console.error(
      [
        "\n[prepare-standalone] .next/standalone/server.js not found.",
        "",
        "Run `npm run build` first — this script only prepares an existing",
        "standalone build's static assets, it does not build the app.",
        "",
      ].join("\n")
    );
    process.exitCode = 1;
    return;
  }

  for (const { label, src, dest } of copies) {
    try {
      await access(src);
    } catch {
      console.error(`\n[prepare-standalone] Expected source not found: ${src} (${label}).`);
      process.exitCode = 1;
      return;
    }

    // Remove the destination first so a previous build's stale/deleted
    // files (e.g. a renamed image, an old JS chunk hash) never survive a
    // later copy — `cp`'s default merge behavior would otherwise leave them.
    await rm(dest, { recursive: true, force: true });
    await cp(src, dest, { recursive: true });
    console.log(`[prepare-standalone] Copied ${label} -> ${path.relative(rootDir, dest)}`);
  }

  console.log("[prepare-standalone] Done. .next/standalone/ is ready to serve.");
}

main();
