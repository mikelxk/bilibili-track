#!/usr/bin/env -S deno run --allow-run
const p = Deno.run({
  cmd: [
    "deno",
    "compile",
    "--unstable",
    "--lite",
    "--allow-net",
    "--output",
    `bili-track`,
    "--import-map=import_map.json",
    "mod.ts",
  ],
});
await p.status();
